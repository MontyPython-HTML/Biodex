"use client";

import { getFirestore, Firestore, addDoc, collection, doc, deleteDoc, getDocs, getDoc, updateDoc, query, where } from "firebase/firestore";
import { User } from "@/src/Models/User";
import { getFirebaseApp } from "./config";

let databaseInstance: Firestore | null = null;

/**
 * Get Firestore instance with build guard rails
 * Returns null during build/server-side to prevent crashes
 */
function getDatabase(): Firestore | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!databaseInstance) {
    const app = getFirebaseApp();
    if (!app) {
      return null;
    }
    databaseInstance = getFirestore(app);
  }
  return databaseInstance;
}

export async function addToFirebase (object: User, table: string) {
  const db = getDatabase();
  if (!db) {
    console.error("Firebase Database is not available. Check your environment variables.");
    return;
  }
  await addDoc(collection(db, table), object)
    .catch(error => { console.error(error); });
}

export async function deleteFromFirebase (docId: string, table: string) {
  const db = getDatabase();
  if (!db) {
    console.error("Firebase Database is not available. Check your environment variables.");
    return;
  }
  await deleteDoc(doc(db, table, docId))
    .catch(error => { console.error(error); });
}

export async function updateDocInFirebase (docId: string, table: string, updates: Partial<User>) {
  const db = getDatabase();
  if (!db) {
    console.error("Firebase Database is not available. Check your environment variables.");
    return;
  }
  const reference = doc(db, table, docId);
  await updateDoc(reference, updates as any)
    .catch(error => { console.error(error); });
}

export async function getAllDocsFromFirebase (table: string) {
  const db = getDatabase();
  if (!db) {
    throw new Error("Firebase Database is not available. Check your environment variables.");
  }
  const references = collection(db, table);
  return await getDocs(references);
}

export async function getDocFromFirebase (docId: string, table: string) {
  const db = getDatabase();
  if (!db) {
    throw new Error("Firebase Database is not available. Check your environment variables.");
  }
  const docSnap = await getDoc(doc(db, table, docId));

  if (docSnap.exists()) {
    return ({
      id: docId,
      data: docSnap.data()
    });
  }
  return null;
}

export async function getUserByUid (uid: string): Promise<(User & { docId: string }) | null> {
  const db = getDatabase();
  if (!db) {
    console.error("Firebase Database is not available. Check your environment variables.");
    return null;
  }
  const q = query(collection(db, "users"), where("id", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    return { ...docSnapshot.data(), docId: docSnapshot.id } as User & { docId: string };
  }
  return null;
}
