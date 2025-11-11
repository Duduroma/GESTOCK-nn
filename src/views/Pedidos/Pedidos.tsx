import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';

function Pedidos(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Pedidos"
                subtitle="Crie e acompanhe pedidos de compra"
                actionButton={{
                    label: "Criar Pedido",
                    onClick: () => console.log('Criar pedido'),
                    icon: '+'
                }}
            />

            <Table headers={['ID', 'Produto', 'Fornecedor', 'Quantidade', 'Data Prevista', 'Status', 'Ações']} children={undefined}>
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
        </MainLayout>
    );
}

export default Pedidos;

