interface LogoProps {
    title?: string;
    subtitle?: string;
    showSubtitle?: boolean;
    size?: 'small' | 'medium' | 'large';
}

function Logo({ 
    title,
    subtitle,
    showSubtitle = false,
    size = 'medium'
}: LogoProps): React.ReactElement {
    const sizes = {
        small: { icon: 60, title: '20px', subtitle: '12px' },
        medium: { icon: 80, title: '24px', subtitle: '14px' },
        large: { icon: 100, title: '28px', subtitle: '16px' }
    };

    const currentSize = sizes[size];

    return (
        <div style={{
            textAlign: 'center',
            marginBottom: '40px'
        }}>
            <div style={{
                width: `${currentSize.icon}px`,
                height: `${currentSize.icon}px`,
                borderRadius: '50%',
                backgroundColor: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    width: `${currentSize.icon * 0.5}px`,
                    height: `${currentSize.icon * 0.5}px`,
                    border: '3px solid white',
                    borderRadius: '4px',
                    transform: 'rotate(45deg)'
                }} />
            </div>
            
            {title && (
                <h1 style={{
                    color: '#2563eb',
                    fontSize: currentSize.title,
                    fontWeight: '600',
                    margin: '0 0 8px 0'
                }}>
                    {title}
                </h1>
            )}
            
            {showSubtitle && subtitle && (
                <p style={{
                    color: '#6b7280',
                    fontSize: currentSize.subtitle,
                    margin: 0
                }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default Logo;

