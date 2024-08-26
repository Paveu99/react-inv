import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useState } from "react";

export const LogoutForm: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    const handleLogout = async () => {
        try {
            const res = await axios.get('/logout');
            const data = res.data.message;
            if (data === 'Logged out successfully') {
                logout();
                navigate('/user/login');
                setErrorMessage(false);
            } else {
                setErrorMessage(true);
            }
        } catch (error) {
            setErrorMessage(true);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
            <h2>Are you sure about that?</h2>
            <form style={{ display: 'flex', gap: "10px", justifyContent: "center", width: "max-content" }}>
                <button className='download' onClick={handleLogout}>Yes</button>
                <hr />
                <NavLink to="/">
                    <button className='download3'>No</button>
                </NavLink>
            </form>
            {errorMessage && <p>Error while logging out, please try again!</p>}
        </div>
    );
};
