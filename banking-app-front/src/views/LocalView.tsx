import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export const LocalView: React.FC = () => {
    const { user, fetchUser } = useAuth();

    useEffect(() => {
        if (!user) {
            fetchUser();
        }
    }, [user, fetchUser]);

    return (
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
            <b>
                Current balance: {user?.balance}$
            </b>
            |
            <b>
                {user?.username}
            </b>
            |
            <b>
                <NavLink className="link" style={{ textDecoration: "none" }} to="/user/logout">Log out</NavLink>
            </b>
        </div>
    );
};
