import { getAuth, Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, updateProfile } from "firebase/auth";
import { User } from "@/src/Models/User";
import * as database from "@/src/Firebase/database";
import { getFirebaseApp } from "./config";

let authInstance: Auth | null = null;

/**
 * Get Firebase Auth instance with build guard rails
 * Returns null during build/server-side to prevent crashes
 */
function getAuthInstance(): Auth | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!authInstance) {
    const app = getFirebaseApp();
    if (!app) {
      return null;
    }
    authInstance = getAuth(app);
  }
  return authInstance;
}

// Export auth for backward compatibility (will be null during build)
export const auth = typeof window !== 'undefined' ? getAuthInstance() : null as any;

export async function createUser (email: string, password: string, username?: string): Promise<FirebaseUser | null> {
  const auth = getAuthInstance();
  if (!auth) {
    throw new Error("Firebase Auth is not available. Check your environment variables.");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (username && userCredential.user) {
      await updateProfile(userCredential.user, { displayName: username });
    }

    const newUser: User = {
      id: userCredential.user.uid,
      username: username || null,
      level: 1,
      pet: { health: 100, input: 10 },
      plants: [],
      dexId: null
    };

    await database.addToFirebase(newUser, "users");
    return userCredential.user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function signIn (email: string, password: string): Promise<FirebaseUser | null> {
  const auth = getAuthInstance();
  if (!auth) {
    throw new Error("Firebase Auth is not available. Check your environment variables.");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function logout (): Promise<void> {
  const auth = getAuthInstance();
  if (!auth) {
    throw new Error("Firebase Auth is not available. Check your environment variables.");
  }

  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export function getCurrentUser (): FirebaseUser | null {
  const auth = getAuthInstance();
  return auth?.currentUser || null;
}

export { onAuthStateChanged };
