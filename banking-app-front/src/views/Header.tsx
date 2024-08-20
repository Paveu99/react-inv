import React from 'react';
import { NavLink } from 'react-router-dom';
import { LocalView } from './LocalView';
import { useAuth } from '../AuthContext';

export const Header: React.FC = () => {
    const { loggedIn } = useAuth();

    const styleOfLink = ({ isActive }: {
        isActive: boolean
    }
    ) => (
        {
            color: isActive ? "#a61b19" : '',
            backgroundColor: isActive ? "#fff" : '',
            padding: isActive ? "5px 150px" : "5px 100px",
            borderRadius: isActive ? '15px' : ""
        }
    )

    const login = (
        <div style={{ display: "flex", gap: "10px" }}>
            <NavLink style={{ textDecoration: "none" }} to="/user/login">Log in</NavLink>
            |
            <NavLink style={{ textDecoration: "none" }} to="/user/register">Register</NavLink>
        </div>
    );

    const user = <LocalView />;

    return (
        <header>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>Transaction App</h1>
                <div>
                    {loggedIn ? user : login}
                </div>
            </div>
            <hr />
            <div>
                <NavLink style={styleOfLink} to="/">Transfer App</NavLink>
                {loggedIn && <NavLink style={styleOfLink} to="/transfer/history">Transfers History</NavLink>}
                {loggedIn && <NavLink style={styleOfLink} to="/transfer/add">Transfer Money</NavLink>}
            </div>
            <hr />
        </header>
    );
};
