import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import Tabs from '../../components/Tabs';
import InfoBox from '../../components/InfoBox';
import { useState } from 'react';

function Reservas(): React.ReactElement {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MainLayout>
            <PageHeader
                title="Reservas de Estoque"
                subtitle="Gerencie reservas vinculadas a pedidos pendentes"
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <SummaryCard
                    title="Reservas Ativas"
                    value="0"
                    subtitle="0 unidades"
                    variant="blue"
                />
                <SummaryCard
                    title="Reservas Liberadas"
                    value="0"
                    variant="green"
                />
                <SummaryCard
                    title="Reservas Canceladas"
                    value="0"
                    variant="red"
                />
            </div>

            <Tabs
                tabs={[
                    { label: 'Ativas', count: 0 },
                    { label: 'Histórico' },
                    { label: 'Canceladas', count: 0 }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <Table headers={['Produto', 'Pedido', 'Quantidade Reservada', 'Data da Reserva', 'Status', 'Ações']} children={undefined}>
            </Table>

            <InfoBox
                title="Funcionamento das Reservas"
                items={[
                    'Criação automática: Ao gerar um pedido, uma reserva é criada automaticamente',
                    'Liberação automática ao receber: Quando o pedido é recebido, a reserva é liberada',
                    'Liberação automática ao cancelar: Quando o pedido é cancelado, a reserva é liberada',
                    'Auditoria: Todo o histórico de reservas e liberações é mantido para rastreabilidade'
                ]}
                variant="blue"
            />
        </MainLayout>
    );
}

export default Reservas;

