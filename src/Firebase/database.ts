import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, deleteDoc, getDocs, getDoc, getFirestore, updateDoc, query, where } from "firebase/firestore";
import { User } from "@/src/Models/User";

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
const database = getFirestore(app);

export async function addToFirebase (object: User, table: string) {
  await addDoc(collection(database, table), object)
    .catch(error => { console.error(error); });
}

export async function deleteFromFirebase (docId: string, table: string) {
  await deleteDoc(doc(database, table, docId))
    .catch(error => { console.error(error); });
}

export async function updateDocInFirebase (docId: string, table: string, updates: Partial<User>) {
  const reference = doc(database, table, docId);
  await updateDoc(reference, updates as any)
    .catch(error => { console.error(error); });
}

export async function getAllDocsFromFirebase (table: string) {
  const references = collection(database, table);
  return await getDocs(references);
}

export async function getDocFromFirebase (docId: string, table: string) {
  const docSnap = await getDoc(doc(database, table, docId));

  if (docSnap.exists()) {
    return ({
      id: docId,
      data: docSnap.data()
    });
  }
  return null;
}

export async function getUserByUid (uid: string): Promise<(User & { docId: string }) | null> {
  const q = query(collection(database, "users"), where("id", "==", uid));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    return { ...docSnapshot.data(), docId: docSnapshot.id } as User & { docId: string };
  }
  return null;
}
