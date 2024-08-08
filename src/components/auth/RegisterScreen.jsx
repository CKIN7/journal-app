import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { uiRemoveError, uiSetError } from '../../slices/uiSlice';
import { startRegisterWithEmailPassword } from '../../slices/authSlice';

export const RegisterScreen = () => {
    const { msgError } = useSelector((state) => state.ui);
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        name: 'Ulises',
        email: 'cova22@gmail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            dispatch(startRegisterWithEmailPassword(email, password, name));
        }
    };

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(uiSetError('Name is required'));
            console.log('Name is required');
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(uiSetError('Email is not valid'));
            console.log('Email is not valid');
            return false;
        } else if (password !== password2 || password < 5) {
            dispatch(
                uiSetError(
                    'Password should be at least 6 characteres and match each other'
                )
            );
            console.log(
                'Password should be at least 6 characteres and match each other'
            );
            return false;
        }
        dispatch(uiRemoveError());
        return true;
    };

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form
                onSubmit={handleRegister}
                className="animate__animated animate__fadeIn animate__faster">
                {msgError && (
                    <div className="auth__alert-error">{msgError}</div>
                )}

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5">
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link">
                    Already registered?
                </Link>
            </form>
        </>
    );
};
