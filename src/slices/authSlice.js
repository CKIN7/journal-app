import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { auth, provider } from '../firebase/firebase-config';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile,
} from 'firebase/auth';
import { uiFinishingLoading, uiStartLoading } from './uiSlice';
import Swal from 'sweetalert2';
import { notesToLogout } from './notesSlice';
// import * as auth from 'firebase/auth';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(uiStartLoading());

        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                dispatch(
                    login({ uid: user.uid, displayName: user.displayName })
                );
                dispatch(uiFinishingLoading());
            })
            .catch((e) => {
                console.log(e);
                dispatch(uiFinishingLoading());
                Swal.fire('Error', e.message, 'error');
            });
    };
};

export const startRegisterWithEmailPassword = (email, password, name) => {
    return (dispatch) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                await updateProfile(user, { displayName: name });
                console.log(user);

                dispatch(
                    login({ uid: user.uid, displayName: user.displayName })
                );
            })
            .catch((e) => {
                Swal.fire('Error', e.message, 'error');
            });
    };
};

export const startLogout = () => {
    return async (dispatch) => {
        await auth.signOut();

        dispatch(logout());
        dispatch(notesToLogout());
    };
};

export const startGoogleLogin = createAsyncThunk(
    'auth/loginWithGoogle',
    async () => {
        const { user } = await signInWithPopup(auth, provider);
        return { uid: user.uid, name: user.displayName };
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        login: (state, action) => {
            state.uid = action.payload.uid;
            state.name = action.payload.displayName;
        },
        logout: (state) => {
            state = {};
        },
    },
});

export const { login, logout } = authSlice.actions;
