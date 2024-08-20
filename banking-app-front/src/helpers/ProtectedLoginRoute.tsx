import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

type Props = {
    element: ReactNode
}

export const ProtectedLoginRoute: React.FC<Props> = ({ element }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? <Navigate to="/" /> : element;
};
