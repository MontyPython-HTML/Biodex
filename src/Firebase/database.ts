import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, deleteDoc, updateDoc, getDocs, getDoc, getFirestore } from "firebase/firestore";
import { User } from "@/src/Models/User";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  projectId: process.env.PROJECT_ID,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID
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

export async function upsertToFirebase (objectId: string, table: string, newObject: User) {
  const reference = doc(database, table, objectId);
  await updateDoc(reference, newObject)
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
}
