import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import { authSlice } from '../slices/authSlice';
import { uiSlice } from '../slices/uiSlice';
import { notesSlice } from '../slices/notesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        notes: notesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
