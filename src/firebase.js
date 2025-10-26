// Importeer de functies die je nodig hebt
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Lees de configuratie uit de .env.local variabelen
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialiseer Firebase
const app = initializeApp(firebaseConfig);

// Exporteer de services die je in je app wilt gebruiken
// We initialiseren ze hier, zodat we ze later kunnen importeren
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;