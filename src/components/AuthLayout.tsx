interface AuthLayoutProps {
    children: React.ReactNode;
}

function AuthLayout({ children }: AuthLayoutProps): React.ReactElement {
    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f0f2f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {children}
            
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#374151',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
                <span style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 'bold'
                }}>
                    ?
                </span>
            </div>
        </div>
    );
}

export default AuthLayout;

