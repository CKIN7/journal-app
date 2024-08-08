import { Navigate, useLocation } from 'react-router-dom';

export const PrivateRoute = ({ children, isAuthenticated }) => {
    const location = useLocation();

    return isAuthenticated ? (
        location.pathname === '/' ? (
            children
        ) : (
            <Navigate
                to="/"
                replace
            />
        )
    ) : (
        <Navigate to="auth/login" />
    );
};
