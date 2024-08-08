import { createSlice } from '@reduxjs/toolkit';

// export const setError = (err) => {
//     return uiSetError(err);
// };

// export const removeError = () => {
//     return uiRemoveError();
// };

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        loading: false,
        msgError: null,
    },
    reducers: {
        uiSetError: (state, action) => {
            state.msgError = action.payload;
        },
        uiRemoveError: (state, action) => {
            state.msgError = null;
        },
        uiStartLoading: (state) => {
            state.loading = true;
        },
        uiFinishingLoading: (state) => {
            state.loading = false;
        },
    },
});

export const { uiSetError, uiRemoveError, uiStartLoading, uiFinishingLoading } =
    uiSlice.actions;
