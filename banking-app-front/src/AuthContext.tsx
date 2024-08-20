import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { Investment, TransferResponse } from './types';

interface User {
    id: string;
    username: string;
    balance: number;
}

interface AuthContextType {
    user: User | null;
    history: Investment[] | null;
    otherUsers: User[] | null;
    loggedIn: boolean;
    fetchUser: () => Promise<void>;
    fetchTransfers: () => Promise<void>;
    fetchOtherUsers: () => Promise<void>
    login: (username: string, password: string) => Promise<void>;
    register: (username: string, password: string, balance: number) => Promise<string>;
    logout: () => void;
    transferMoney: (amount: number, recipient: string) => Promise<TransferResponse>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [otherUsers, setOtherUsers] = useState<User[] | null>(null);
    const [history, setHistory] = useState<Investment[] | null>(null);
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const fetchUser = async () => {
        try {
            const response = await axios.get('/api/user/me');

            setUser(response.data);
            setLoggedIn(true);
        } catch (error) {
            await logout();
        }
    };

    const fetchTransfers = async () => {
        try {
            const response = await axios.get('/api/transactions');
            setHistory(response.data);
        } catch (error) {
            setHistory(null);
            throw error
        }
    };

    const fetchOtherUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setOtherUsers(response.data);
        } catch (error) {
            setOtherUsers(null);
            throw error
        }
    };

    const transferMoney = async (amount: number, recipient: string) => {
        try {
            const response = await axios.post('/transfer', { amount, recipient });
            const data = response.data;
            setHistory((prev) => [...(prev || []), data.newTransaction])
            await fetchUser()
            return data as TransferResponse
        } catch (error) {
            let errorMessage = 'Failed to transfer money due to an unknown error';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw errorMessage;
        }
    }

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('/login', { username, password }, { withCredentials: true });
            setUser(response.data.user);
            setLoggedIn(true);
        } catch (error) {
            setLoggedIn(false);
            throw error;
        }
    };

    const register = async (username: string, password: string, balance: number) => {
        try {
            const response = await axios.post('/register', { username, password, balance }, { withCredentials: true });
            return response.data.message;
        } catch (error) {
            let errorMessage = 'Failed to register due to an unknown error';
            if (axios.isAxiosError(error)) {
                errorMessage = error.response?.data?.message || errorMessage;
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }
            throw errorMessage;
        }
    }

    const logout = () => {
        try {
            axios.get('/logout').then(() => {
                setLoggedIn(false);
                setUser(null);
                setHistory(null);
                setOtherUsers(null)
            });
        } catch (error) {
            throw error
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, history, otherUsers, loggedIn, fetchUser, login, logout, register, fetchTransfers, fetchOtherUsers, transferMoney }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
