// Os tipos já estão definidos globalmente em src/types/global.d.ts

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

function Button({ children, onClick, type = 'button' }: ButtonProps): JSX.Element {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
}

export default Button;
