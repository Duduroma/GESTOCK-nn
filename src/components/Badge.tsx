interface BadgeProps {
    children: React.ReactNode;
    variant?: 'active' | 'inactive' | 'pending' | 'critical' | 'medium' | 'completed' | 'in-transit' | 'expired' | 'adequate' | 'below';
}

function Badge({ children, variant = 'active' }: BadgeProps): React.ReactElement {
    const variants = {
        active: { bg: '#dbeafe', color: '#2563eb' },
        inactive: { bg: '#f3f4f6', color: '#6b7280' },
        pending: { bg: '#fef3c7', color: '#d97706' },
        critical: { bg: '#fee2e2', color: '#dc2626' },
        medium: { bg: '#e5e7eb', color: '#4b5563' },
        completed: { bg: '#dbeafe', color: '#2563eb' },
        'in-transit': { bg: '#f3f4f6', color: '#6b7280' },
        expired: { bg: '#fee2e2', color: '#dc2626' },
        adequate: { bg: '#d1fae5', color: '#059669' },
        below: { bg: '#fee2e2', color: '#dc2626' }
    };

    const style = variants[variant] || variants.active;

    return (
        <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '12px',
            fontWeight: '500',
            backgroundColor: style.bg,
            color: style.color
        }}>
            {children}
        </span>
    );
}

export default Badge;

