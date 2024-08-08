import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, dbe } from '../firebase/firebase-config';

import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        // const docRef = db. // Agrega un nuevo documento
        // await set(ref(db, `${uid}/journal/notes`), newNote); // Establece los datos del documento
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };
        const notesRef = collection(dbe, `${uid}/journal/notes`);
        const newNoteRef = doc(notesRef); // Genera un ID único para la nueva nota
        await setDoc(newNoteRef, newNote); // Establece los datos de la nueva nota
        const noteId = newNoteRef.id; // Obtiene el ID de la nota recién creada // Obtiene el ID de la nota recién creada desde la base de datos
        newNote.id = noteId;
        dispatch(setActiveNote(newNote));
        dispatch(addNewNote(newNote));
        console.log(noteId, newNote);
    };
};

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const noteRef = doc(dbe, `${uid}/journal/notes/${note.id}`);

        // Crea un objeto con solo los campos que deseas actualizar

        console.log(note);
        const updates = {
            id: note.id,
            title: note.title,
            body: note.body,
            date: note.date,
            url: note.url,
        };

        if (!updates.url) {
            delete updates.url;
        }
        console.log(updates);

        // Update the note in Firestore
        await updateDoc(noteRef, updates);
        await dispatch(refreshNote(updates));
        Swal.fire('Saved', note.title, 'success');
    };
};
export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        });

        const fileUrl = await fileUpload(file);

        const updatedActive = {
            ...active,
            url: fileUrl,
            // noteId: { ...active.noteId, url: fileUrl },
        };

        console.log(updatedActive.url);
        console.log(updatedActive);

        dispatch(startSaveNote(updatedActive));

        Swal.close();
    };
};

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        await deleteDoc(doc(dbe, `${uid}/journal/notes/${id}`));

        // Actualiza el estado de la aplicación
        dispatch(deleteNote(id));
        console.log(id);
    };
};

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        active: null,
    },
    reducers: {
        setActiveNote(state, action) {
            return {
                active: action.payload,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
            };
        },
        addNewNote(state, action) {
            return {
                ...state,
                notes: [action.payload, ...state.notes],
            };
        },
        setNotes(state, action) {
            state.notes = action.payload;
        },
        refreshNote(state, action) {
            return {
                ...state,
                notes: state.notes.map((note) =>
                    note.id === action.payload.id ? action.payload : note
                ),
            };
        },

        deleteNote(state, action) {
            return {
                ...state,
                active: null,
                notes: state.notes.filter((note) => note.id !== action.payload),
            };
        },
        notesToLogout(state) {
            return {
                ...state,
                active: null,
                notes: [],
            };
        },
    },
});

export const {
    setActiveNote,
    addNewNote,
    setNotes,
    refreshNote,
    deleteNote,
    notesToLogout,
} = notesSlice.actions;
