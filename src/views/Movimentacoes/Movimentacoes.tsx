import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import Tabs from '../../components/Tabs';
import { useState } from 'react';

function Movimentacoes(): React.ReactElement {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <MainLayout>
            <PageHeader
                title="Movimentações de Estoque"
                subtitle="Registre e acompanhe entradas e saídas"
                actionButton={{
                    label: "Registrar Movimentação",
                    onClick: () => console.log('Registrar movimentação'),
                    icon: '+'
                }}
            />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <SummaryCard
                    title="Total de Movimentações"
                    value="0"
                />
                <SummaryCard
                    title="Total de Entradas"
                    value="0"
                    variant="green"
                />
                <SummaryCard
                    title="Total de Saídas"
                    value="0"
                    variant="blue"
                />
            </div>

            <Tabs
                tabs={[
                    { label: 'Histórico (12 meses)' },
                    { label: 'Entradas' },
                    { label: 'Saídas' }
                ]}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <Table headers={['Data', 'Produto', 'Tipo', 'Quantidade', 'Motivo', 'Responsável', 'Estoque']} children={undefined}>
            </Table>
        </MainLayout>
    );
}

export default Movimentacoes;

