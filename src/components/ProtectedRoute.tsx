import { Navigate } from 'react-router-dom';
import authService from '../services/auth';
import MainLayout from './MainLayout';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps): React.ReactElement {
    const isAuth = authService.isAuthenticated();
    console.log('🔒 [ProtectedRoute] Verificando autenticação:', isAuth);
    console.log('🔑 [ProtectedRoute] Token no localStorage:', localStorage.getItem('authToken'));
    
    if (!isAuth) {
        console.log('❌ [ProtectedRoute] Não autenticado, redirecionando para /login');
        return <Navigate to="/login" replace />;
    }

    console.log('✅ [ProtectedRoute] Autenticado, renderizando conteúdo');
    return <MainLayout>{children}</MainLayout>;
}

export default ProtectedRoute;

