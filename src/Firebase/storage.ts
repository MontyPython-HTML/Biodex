import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  projectId: process.env.PROJECT_ID,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export async function addImageToStorage(img: String) {
  const storageRef = ref(storage, img);

  uploadBytes(storageRef, file)
    .catch((error) => {
      console.error(error);
    })
}

