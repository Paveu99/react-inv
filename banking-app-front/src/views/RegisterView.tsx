import { FormEvent, useState } from "react";
import { useAuth } from "../AuthContext"
import { UserRegister } from "../types";

export const RegisterView = () => {

    const { register } = useAuth();

    const [form, setForm] = useState<UserRegister>({ username: '', password: '', balance: 0 });
    const [inputType, setInputType] = useState<string>('password');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const showPassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('text');
    };

    const hidePassword = (e: FormEvent) => {
        e.preventDefault();
        setInputType('password');
    };

    const clear = () => {
        setForm({ username: '', password: '', balance: 0 })
    }

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
                const res = await register(form.username, form.password, form.balance);
                if (res) {
                    setSuccessMessage(res)
                    setTimeout(() => {
                        setSuccessMessage(null);
                    }, 3000)
                    clear();
                }
            } catch (error) {
                setErrorMessage(error as string);
            }
        } else {
            setErrorMessage('Please fill the input fields');
            setTimeout(() => {
                setErrorMessage(null);
            }, 3000)
        }
    };

    return (
        <div className='LogReg'>
            <h2>Registration form</h2>
            <form autoComplete='off' className="form-logreg" onSubmit={checkInput}>
                {errorMessage && (
                    <p className="checkAnswer" style={{ backgroundColor: 'red' }}>
                        {errorMessage}
                    </p>
                )}
                {successMessage && (
                    <p className="checkAnswer" style={{ backgroundColor: 'green' }}>
                        {successMessage}
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
                <div className="container-input">
                    <label>
                        <p>Balance:</p>
                        <div className="password-container">
                            <input
                                type="number"
                                name="balance"
                                className="input"
                                value={form.balance}
                                onChange={e => change('balance', e.target.value)}
                            />
                        </div>
                    </label>
                </div>
                <button type="submit" className="download2">Register</button>
            </form>
        </div>
    );
}