import { FormEvent, useState } from "react";
import { useAuth } from "../AuthContext";
import "../styles/LogReg.css";
import { useNavigate } from "react-router-dom";
import { UserEntity } from "../types";

export const LoginView = () => {
    const { login } = useAuth();
    const [form, setForm] = useState<UserEntity>({ username: '', password: '' });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [inputType, setInputType] = useState<string>('password');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const showPassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('text');
    };

    const hidePassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('password');
    };

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }));
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault();

        if (form.password.length > 0 && form.username.length > 0) {
            try {
                await login(form.username, form.password);
                navigate('')
            } catch (error) {
                setSubmitted(true);
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } else {
            setSubmitted(true);
            setErrorMessage('Please fill the input fields');
        }
    };

    return (
        <div className='LogReg'>
            <h2>Login form</h2>
            <form autoComplete='off' className="form-logreg" onSubmit={checkInput}>
                {submitted && errorMessage && (
                    <p className="checkAnswer" style={{ backgroundColor: 'red' }}>
                        {errorMessage}
                    </p>
                )}
                <div className="container-input">
                    <label>
                        <p>Username:</p>
                        <div className="password-container">
                            <input
                                type="text"
                                name="email"
                                className="input"
                                value={form.username}
                                onChange={e => change('username', e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <div className="container-input">
                    <label>
                        <p>Password:</p>
                        <div className="password-container">
                            <input
                                type={inputType}
                                name="password"
                                className="input"
                                value={form.password}
                                onChange={e => change('password', e.target.value)}
                            />
                            <button
                                type="button"
                                className="show-password-button"
                                onMouseDown={showPassword}
                                onMouseUp={hidePassword}
                                onMouseOut={hidePassword}
                            >
                                {'👁'}
                            </button>
                        </div>
                    </label>
                </div>
                <button type="submit" className="download2">Log in</button>
            </form>
        </div>
    );
};
