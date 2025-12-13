import { useNavigate, useLocation } from 'react-router-dom';
import useBadgeCounts from '../hooks/useBadgeCounts';
import authService from '../services/auth';

interface MenuItem {
    label: string;
    path: string;
    icon: string;
    badge?: number;
    badgeColor?: 'blue' | 'red';
}

interface SidebarProps {
    onLogout?: () => void;
}

function Sidebar({ onLogout }: SidebarProps): React.ReactElement {
    const navigate = useNavigate();
    const location = useLocation();
    const { pedidosPendentes, alertasAtivos } = useBadgeCounts();

    const menuItems: MenuItem[] = [
        { label: 'Estoques', path: '/estoques', icon: '📦' },
        { label: 'Produtos', path: '/produtos', icon: '🛒' },
        { label: 'Fornecedores', path: '/fornecedores', icon: '👥' },
        { label: 'Cotações', path: '/cotacoes', icon: '💰' },
        { label: 'Pedidos', path: '/pedidos', icon: '📄', badge: pedidosPendentes > 0 ? pedidosPendentes : undefined, badgeColor: 'blue' },
        { label: 'Ponto de Ressuprimento', path: '/ponto-ressuprimento', icon: '📈' },
        { label: 'Alertas', path: '/alertas', icon: '⚠️', badge: alertasAtivos > 0 ? alertasAtivos : undefined, badgeColor: 'red' },
        { label: 'Movimentações', path: '/movimentacoes', icon: '📊' },
        { label: 'Transferências', path: '/transferencias', icon: '🔄' },
        { label: 'Reservas', path: '/reservas', icon: '🔒' }
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <div style={{
            width: '280px',
            height: '100vh',
            backgroundColor: 'white',
            borderRight: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            overflowY: 'auto'
        }}>
            <div style={{
                padding: '24px',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        backgroundColor: '#2563eb',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '3px solid white',
                            borderRadius: '4px',
                            transform: 'rotate(45deg)'
                        }} />
                    </div>
                    <div>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: '700',
                            color: '#2563eb'
                        }}>
                            Gestock
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: '#6b7280'
                        }}>
                            Gestão de Estoque
                        </div>
                    </div>
                </div>
            </div>

            <nav style={{
                flex: 1,
                padding: '16px 0'
            }}>
                {menuItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        style={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 24px',
                            backgroundColor: isActive(item.path) ? '#f3f4f6' : 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '14px',
                            color: isActive(item.path) ? '#2563eb' : '#374151',
                            fontWeight: isActive(item.path) ? '600' : '500',
                            position: 'relative'
                        }}
                    >
                        <span style={{ fontSize: '18px' }}>{item.icon}</span>
                        <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                        {item.badge && (
                            <span style={{
                                backgroundColor: item.badgeColor === 'red' ? '#dc2626' : '#2563eb',
                                color: 'white',
                                borderRadius: '9999px',
                                padding: '2px 8px',
                                fontSize: '11px',
                                fontWeight: '600',
                                minWidth: '20px',
                                textAlign: 'center'
                            }}>
                                {item.badge}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            <div style={{
                padding: '24px',
                borderTop: '1px solid #e5e7eb'
            }}>
                <div style={{
                    marginBottom: '12px'
                }}>
                    <div style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#1f2937',
                        marginBottom: '4px'
                    }}>
                        {authService.getUserName() || 'Usuário'}
                    </div>
                    <div style={{
                        fontSize: '12px',
                        color: '#6b7280'
                    }}>
                        {authService.getUserEmail() || 'email@exemplo.com'}
                    </div>
                </div>
                <button
                    onClick={onLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 12px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        color: '#6b7280',
                        fontSize: '14px',
                        cursor: 'pointer',
                        borderRadius: '6px',
                        width: '100%',
                        textAlign: 'left'
                    }}
                >
                    <span>→</span>
                    <span>Sair</span>
                </button>
            </div>
        </div>
    );
}

export default Sidebar;

