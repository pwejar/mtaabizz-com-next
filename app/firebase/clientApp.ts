import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const clientCredentials = {
    apiKey: process.env.FIRE_NEXT_API_KEY,
    authDomain: process.env.FIRE_NEXT_AUTH_DOMAIN,
    databaseURL: process.env.FIRE_NEXT_DATABASE_URL,
    projectId: process.env.FIRE_NEXT_PROJECT_ID,
    storageBucket: process.env.FIRE_NEXT_STORAGE_BUCKET,
    messagingSenderId: process.env.FIRE_NEXT_MESSAGING_SENDER_ID,
    appId: process.env.FIRE_NEXT_APP_ID,
    measurementId: process.env.FIRE_NEXT_MEASUREMENT_ID
}
const app = initializeApp(clientCredentials)
const db = getFirestore(app,);
export default db