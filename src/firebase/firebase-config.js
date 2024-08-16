import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
    authDomain: 'react-app-cursos-7cd6e.firebaseapp.com',
    projectId: 'react-app-cursos-7cd6e',
    storageBucket: 'react-app-cursos-7cd6e.appspot.com',
    messagingSenderId: '173550720406',
    appId: import.meta.env.VITE_API_ID_FIREBASE,
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const db = getDatabase(firebaseApp);
export const dbe = getFirestore(firebaseApp);

const auth = getAuth();

export { db, auth, provider };
