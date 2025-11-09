import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { FirebaseStorage } from "firebase/storage";
import { getFirebaseApp } from "./config";

let storageInstance: FirebaseStorage | null = null;

/**
 * Get Firebase Storage instance with build guard rails
 * Returns null during build/server-side to prevent crashes
 */
function getStorageInstance(): FirebaseStorage | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!storageInstance) {
    const app = getFirebaseApp();
    if (!app) {
      return null;
    }
    storageInstance = getStorage(app);
  }
  return storageInstance;
}

export async function uploadFile (file: File, path: string): Promise<string> {
  const storage = getStorageInstance();
  if (!storage) {
    throw new Error("Firebase Storage is not available. Check your environment variables.");
  }
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return await getDownloadURL(storageRef);
}

export async function uploadFileWithProgress (file: File, path: string, onProgress?: (progress: number) => void): Promise<string> {
  const storage = getStorageInstance();
  if (!storage) {
    throw new Error("Firebase Storage is not available. Check your environment variables.");
  }
  const storageRef = ref(storage, path);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(progress);
      },
      error => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
}

export async function getFileURL (path: string): Promise<string> {
  const storage = getStorageInstance();
  if (!storage) {
    throw new Error("Firebase Storage is not available. Check your environment variables.");
  }
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
}
