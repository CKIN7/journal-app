import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { db, dbe } from '../firebase/firebase-config';
import { get, push, ref, set } from 'firebase/database';
import {
    collection,
    deleteDoc,
    doc,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import Swal from 'sweetalert2';
import { fileUpload } from '../helpers/fileUpload';

export const startNewNote = async (dispatch, getState) => {
    try {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        };

        const notesRef = collection(dbe, `${uid}/journal/notes`);
        const newNoteRef = doc(notesRef);
        await setDoc(newNoteRef, newNote);
        const noteId = newNoteRef.id;

        dispatch(setActiveNote(noteId, newNote));
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to create new note', 'error');
    }
};

export const startSaveNote = async (dispatch, getState, note) => {
    try {
        const { uid } = getState().auth;
        const noteRef = doc(dbe, `${uid}/journal/notes/${note.id}`);

        console.log(note);

        await updateDoc(noteRef, note);
        dispatch(refreshNote(note));
        Swal.fire('Saved', note.title, 'success');
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to save note', 'error');
    }
};

export const startUploading = async (dispatch, getState, file) => {
    try {
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
        };

        dispatch(startSaveNote(updatedActive));
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to upload file', 'error');
    } finally {
        Swal.close();
    }
};

export const startDeleting = async (dispatch, getState, id) => {
    try {
        const { uid } = getState().auth;

        await deleteDoc(doc(dbe, `${uid}/journal/notes/${id}`));

        dispatch(deleteNote(id));
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'Failed to delete note', 'error');
    }
};

export const notesSlice2 = createSlice({
    name: 'notes',
    initialState: {
        notes: [],
        active: null,
    },
    reducers: {
        setActiveNote(state, action) {
            state.active = {
                id: action.payload.id,
                ...action.payload.note,
            };
        },
        setNotes(state, action) {
            state.notes = action.payload;
        },
        refreshNote(state, action) {
            const index = state.notes.findIndex(
                (note) => note.id === action.payload.id
            );
            if (index !== -1) {
                state.notes[index] = action.payload;
            }
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
    setNotes,
    refreshNote,
    deleteNote,
    notesToLogout,
} = notesSlice2.actions;
