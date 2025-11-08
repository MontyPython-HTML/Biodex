import { initializeApp } from "firebase/app"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { User } from "@/src/Models/User"
import { Pet } from "@/src/Models/Pet"
import * as database from "@/src/Firebase/database"

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
const auth = getAuth(app);

export async function createUser (email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      let newUser = {
        id: userCredential.user.uid,
        username: userCredential.user.displayName,
        level: 1,
        pet: { health: 100, input: 10 }, 
      }
      database.addToFirebase(newUser, "users")
    })
    .catch(error => { console.error(error) })
}

export async function signIn (email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .catch(error => { console.error(error) })
}

