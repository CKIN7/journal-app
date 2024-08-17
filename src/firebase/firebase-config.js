import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: 'AIzaSyBgdE6t3trd_I5MU37TJ7tXCcdQeo30rvs',
    authDomain: 'react-app-cursos-7cd6e.firebaseapp.com',
    projectId: 'react-app-cursos-7cd6e',
    storageBucket: 'react-app-cursos-7cd6e.appspot.com',
    messagingSenderId: '173550720406',
    appId: '1:173550720406:web:11d2a87a4249ea4475b9b7',
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const db = getDatabase(firebaseApp);
export const dbe = getFirestore(firebaseApp);

const auth = getAuth();

export { db, auth, provider };
