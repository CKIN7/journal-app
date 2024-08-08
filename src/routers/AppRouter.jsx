import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { loadNotes } from '../helpers/loadNotes';
import { setNotes } from '../slices/notesSlice';

export const AppRouter = () => {
    const [checked, setChecked] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch(
                    login({ uid: user.uid, displayName: user.displayName })
                );
                setIsLoggedIn(true);
                const notes = await loadNotes(user.uid);
                dispatch(setNotes(notes));
            } else {
                setIsLoggedIn(false);
            }
            setChecked(false);
        });
    }, [dispatch, setChecked, setIsLoggedIn]);

    if (checked) {
        return <h1>Please wait...</h1>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/auth/login"
                    element={
                        <PublicRoute isAuthenticated={isLoggedIn}>
                            <LoginScreen />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/register"
                    element={
                        <PublicRoute isAuthenticated={isLoggedIn}>
                            <RegisterScreen />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/auth/*"
                    element={
                        <PublicRoute isAuthenticated={isLoggedIn}>
                            <RegisterScreen />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/*"
                    element={
                        <PrivateRoute isAuthenticated={isLoggedIn}>
                            <JournalScreen />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
