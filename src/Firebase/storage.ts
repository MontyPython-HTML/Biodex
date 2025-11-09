import { initializeApp } from "firebase/app";
import { getStorage, FirebaseStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

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


function createTempFile(content: string, extension: string = 'txt'): string {
    const tempDir = "../Friebase";
    const tempFilePath = path.join(tempDir, `tempFile_${uniqueId}.${extension}`);

    fs.writeFileSync(tempFilePath, content);
    return tempFilePath;
}

const myTempFile = createTempFile('Hello, temporary file!', 'log');
console.log(`Created temporary file: ${myTempFile}`);

// To clean up later:
// fs.unlinkSync(myTempFile);
// console.log(`Deleted temporary file: ${myTempFile}`);