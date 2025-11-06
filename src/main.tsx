// Os tipos já estão definidos globalmente em src/types/global.d.ts

function App(): JSX.Element {
    return <h1>Olá Mundo</h1>;
}

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<App />);
}
