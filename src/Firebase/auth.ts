import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User as FirebaseUser, updateProfile } from "firebase/auth";
import { User } from "@/src/Models/User";
import * as database from "@/src/Firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function createUser (email: string, password: string, username?: string): Promise<FirebaseUser | null> {
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
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
}

export async function logout (): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
}

export function getCurrentUser (): FirebaseUser | null {
  return auth.currentUser;
}

export { onAuthStateChanged };
