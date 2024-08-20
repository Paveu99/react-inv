import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

type Props = {
    element: ReactNode
}

export const ProtectedRoute: React.FC<Props> = ({ element }) => {
    const { loggedIn } = useAuth();

    return loggedIn ? element : <Navigate to="/user/login" />;
};
