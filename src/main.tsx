import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './views/Login/Login';
import Cadastro from './views/Cadastro/Cadastro';
import Estoques from './views/Estoques/Estoques';
import Produtos from './views/Produtos/Produtos';
import Fornecedores from './views/Fornecedores/Fornecedores';
import Cotacoes from './views/Cotacoes/Cotacoes';
import Pedidos from './views/Pedidos/Pedidos';
import PontoRessuprimento from './views/PontoRessuprimento/PontoRessuprimento';
import Alertas from './views/Alertas/Alertas';
import Movimentacoes from './views/Movimentacoes/Movimentacoes';
import Transferencias from './views/Transferencias/Transferencias';
import Reservas from './views/Reservas/Reservas';
import ProtectedRoute from './components/ProtectedRoute';
import authService from './services/auth';

function App(): React.ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas públicas */}
                <Route 
                    path="/login" 
                    element={
                        authService.isAuthenticated() ? (
                            <Navigate to="/estoques" replace />
                        ) : (
                            <Login />
                        )
                    } 
                />
                <Route path="/cadastro" element={<Cadastro />} />
                
                {/* Rotas protegidas */}
                <Route path="/" element={<Navigate to="/estoques" replace />} />
                <Route path="/estoques" element={<ProtectedRoute><Estoques /></ProtectedRoute>} />
                <Route path="/produtos" element={<ProtectedRoute><Produtos /></ProtectedRoute>} />
                <Route path="/fornecedores" element={<ProtectedRoute><Fornecedores /></ProtectedRoute>} />
                <Route path="/cotacoes" element={<ProtectedRoute><Cotacoes /></ProtectedRoute>} />
                <Route path="/pedidos" element={<ProtectedRoute><Pedidos /></ProtectedRoute>} />
                <Route path="/ponto-ressuprimento" element={<ProtectedRoute><PontoRessuprimento /></ProtectedRoute>} />
                <Route path="/alertas" element={<ProtectedRoute><Alertas /></ProtectedRoute>} />
                <Route path="/movimentacoes" element={<ProtectedRoute><Movimentacoes /></ProtectedRoute>} />
                <Route path="/transferencias" element={<ProtectedRoute><Transferencias /></ProtectedRoute>} />
                <Route path="/reservas" element={<ProtectedRoute><Reservas /></ProtectedRoute>} />
            </Routes>
        </BrowserRouter>
    );
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
