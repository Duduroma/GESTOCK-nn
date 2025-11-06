// Componente global de Card (container branco)
interface CardProps {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
}

function Card({ children, title, subtitle }: CardProps): React.ReactElement {
    return (
        <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '32px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            {title && (
                <>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        color: '#1f2937',
                        margin: '0 0 8px 0'
                    }}>
                        {title}
                    </h2>
                    
                    {subtitle && (
                        <p style={{
                            fontSize: '14px',
                            color: '#6b7280',
                            margin: '0 0 24px 0'
                        }}>
                            {subtitle}
                        </p>
                    )}
                </>
            )}
            {children}
        </div>
    );
}

export default Card;

