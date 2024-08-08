import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

// import { counterSlice } from '../slices/counterSlice';
import { authSlice } from '../slices/authSlice';
import { uiSlice } from '../slices/uiSlice';
import { notesSlice } from '../slices/notesSlice';

// const reducers = combineReducers({
//     auth: authReducer,
// });

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        notes: notesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
