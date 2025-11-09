import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export async function uploadFile(file: File, path: string): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function uploadFileWithProgress(file: File, path: string, onProgress?: (progress: number) => void): Promise<string> {
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);
  
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export async function getFileURL(path: string): Promise<string> {
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
}
