import { useNavigate } from 'react-router-dom';

export const SessionExpired = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/user/login');
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Session Expired</h1>
            <p>Your session has expired. Please log in again to continue.</p>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};
