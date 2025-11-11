interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

function Button({ children, onClick, type = 'button' }: ButtonProps): React.ReactElement {
    return (
        <button 
            type={type} 
            onClick={onClick}
            style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer'
            }}
        >
            {children}
        </button>
    );
}

export default Button;
