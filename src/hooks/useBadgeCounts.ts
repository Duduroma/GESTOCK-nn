import { useMemo } from 'react';

const mockPedidos = [
    { id: '1', status: 'received' },
    { id: '2', status: 'pending' },
    { id: '3', status: 'pending' }
];

const mockAlertas = [
    { id: '1', severidade: 'critical' },
    { id: '2', severidade: 'high' },
    { id: '3', severidade: 'medium' }
];

function useBadgeCounts() {
    const pedidosPendentes = useMemo(() => {
        return mockPedidos.filter(p => p.status === 'pending').length;
    }, []);

    const alertasAtivos = useMemo(() => {
        return mockAlertas.length;
    }, []);

    return {
        pedidosPendentes,
        alertasAtivos
    };
}

export default useBadgeCounts;

