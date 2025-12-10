import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ActionButton from '../../components/ActionButton';
import InfoBox from '../../components/InfoBox';
import CriarPedidoModal from '../../components/Modals/CriarPedidoModal';
import { Pedido, PedidoId, StatusPedido, ItemPedido, ClienteId, FornecedorId, EstoqueId } from '../../types/entities';

function Pedidos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pedidos, setPedidos] = useState<Pedido[]>([
        {
            id: '1',
            clienteId: '1',
            fornecedorId: '2',
            dataCriacao: '2025-10-15',
            dataPrevistaEntrega: '2025-10-21',
            estoqueId: '1',
            itens: [
                { produtoId: '1', quantidade: 10000, precoUnitario: 0.50 }
            ],
            status: StatusPedido.RECEBIDO
        },
        {
            id: '2',
            clienteId: '1',
            fornecedorId: '3',
            dataCriacao: '2025-10-20',
            dataPrevistaEntrega: '2025-10-26',
            estoqueId: '1',
            itens: [
                { produtoId: '2', quantidade: 50, precoUnitario: 85.00 }
            ],
            status: StatusPedido.ENVIADO
        },
        {
            id: '3',
            clienteId: '1',
            fornecedorId: '1',
            dataCriacao: '2025-10-18',
            dataPrevistaEntrega: '2025-10-23',
            estoqueId: '2',
            itens: [
                { produtoId: '1', quantidade: 5000, precoUnitario: 0.45 }
            ],
            status: StatusPedido.CRIADO
        }
    ]);

    const handleConfirm = (data: {
        clienteId: string;
        fornecedorId: string;
        estoqueId?: string;
        itens: ItemPedido[];
        dataPrevistaEntrega: string;
    }) => {
        console.log('Criar pedido:', data);
    };

    const handleConfirmRecebimento = (pedidoId: PedidoId) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === pedidoId
                ? { ...pedido, status: StatusPedido.RECEBIDO }
                : pedido
        ));
    };

    const handleCancelar = (pedidoId: PedidoId) => {
        setPedidos(pedidos.map(pedido => 
            pedido.id === pedidoId
                ? { ...pedido, status: StatusPedido.CANCELADO }
                : pedido
        ));
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Pedidos"
                subtitle="Crie e acompanhe pedidos de compra"
                actionButton={{
                    label: "Criar Pedido",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <Table headers={['ID', 'Itens', 'Fornecedor', 'Data Criação', 'Data Prevista', 'Status', 'Ações']}>
                {pedidos.map((pedido) => (
                    <TableRow key={pedido.id}>
                        <TableCell>#{pedido.id}</TableCell>
                        <TableCell>
                            {pedido.itens.map((item, idx) => (
                                <div key={idx}>
                                    Produto {item.produtoId}: {item.quantidade.toLocaleString('pt-BR')} un. (R$ {item.precoUnitario.toFixed(2)})
                                </div>
                            ))}
                        </TableCell>
                        <TableCell>Fornecedor {pedido.fornecedorId}</TableCell>
                        <TableCell>{new Date(pedido.dataCriacao).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{new Date(pedido.dataPrevistaEntrega).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge variant={
                                pedido.status === StatusPedido.RECEBIDO ? 'approved' : 
                                pedido.status === StatusPedido.CANCELADO ? 'expired' : 
                                'pending'
                            }>
                                {pedido.status}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <ActionButton
                                    label="Confirmar Recebimento"
                                    icon="✓"
                                    onClick={() => handleConfirmRecebimento(pedido.id)}
                                    disabled={pedido.status === StatusPedido.RECEBIDO || pedido.status === StatusPedido.CANCELADO}
                                />
                                <ActionButton
                                    label="Cancelar"
                                    icon="✕"
                                    onClick={() => handleCancelar(pedido.id)}
                                    disabled={pedido.status === StatusPedido.RECEBIDO || pedido.status === StatusPedido.CANCELADO}
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <InfoBox
                title="Ações Automáticas"
                items={[
                    'Ao criar pedido → Reserva de estoque é gerada automaticamente',
                    'Ao confirmar recebimento → Movimentação de entrada é registrada',
                    'Ao cancelar pedido → Reserva de estoque é liberada'
                ]}
                variant="yellow"
            />

            <CriarPedidoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Pedidos;

