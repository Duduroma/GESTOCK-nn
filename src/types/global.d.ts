// Tipos globais para React (carregado via CDN)
// Esses tipos são necessários porque React vem via CDN, não via npm

declare global {
    const React: {
        createElement: any;
        Fragment: any;
        [key: string]: any;
    };
    
    const ReactDOM: {
        createRoot: (container: HTMLElement) => {
            render: (element: any) => void;
        };
        [key: string]: any;
    };
    
    namespace React {
        type ReactNode = any;
    }
    
    namespace JSX {
        type Element = any;
        
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

export {};
