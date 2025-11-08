import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_KEY,
  projectId: process.env.PROJECT_ID,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)


export function print() {
  console.log(auth)
}

export async function createUser(auth, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user)
    })
    .catch((error) => { console.error(error) })
}

export async function signIn(auth, email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .catch((error) => { console.error(error) })
}


