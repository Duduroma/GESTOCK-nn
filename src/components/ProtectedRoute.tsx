import { Navigate } from 'react-router-dom';
import authService from '../services/auth';
import MainLayout from './MainLayout';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): React.ReactElement {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <MainLayout>{children}</MainLayout>;
}

export default ProtectedRoute;

