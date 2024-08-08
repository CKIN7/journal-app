import { types } from '../types/types';

export const login = (uid, displayName) => ({
    types: types.login,
    payload: {
        uid,
        displayName,
    },
});
