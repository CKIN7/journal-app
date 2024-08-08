import { get, ref } from 'firebase/database';
import { dbe } from '../firebase/firebase-config';
import { getDocs, collection } from 'firebase/firestore';

export const loadNotes = async (uid) => {
    const notesRef = collection(dbe, `${uid}/journal/notes`);
    const querySnapshot = await getDocs(notesRef);
    const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    return notes;
};
