import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import SummaryCard from '../../components/SummaryCard';
import InfoBox from '../../components/InfoBox';

function Alertas(): React.ReactElement {
    return (
        <MainLayout>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '32px'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        color: '#1f2937',
                        margin: '0 0 8px 0'
                    }}>
                        Alertas de Estoque Baixo
                    </h1>
                    <p style={{
                        fontSize: '16px',
                        color: '#6b7280',
                        margin: 0
                    }}>
                        Monitore produtos abaixo do ponto de ressuprimento
                    </p>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#dc2626',
                    fontSize: '14px',
                    fontWeight: '500'
                }}>
                    <span>⚠️</span>
                </div>
            </div>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <SummaryCard
                    title="Crítico"
                    value="0 produtos"
                    variant="red"
                />
                <SummaryCard
                    title="Alto"
                    value="0 produtos"
                    variant="yellow"
                />
                <SummaryCard
                    title="Médio"
                    value="0 produtos"
                    variant="default"
                />
            </div>

            <Table headers={['Severidade', 'Produto', 'Estoque', 'Quantidade Atual', 'ROP', 'Déficit', 'Fornecedor Sugerido', 'Data do Alerta']} children={undefined}>
            </Table>

            <InfoBox
                title="Funcionamento dos Alertas"
                items={[
                    'Alerta gerado automaticamente quando produto fica abaixo do ROP',
                    'Fornecedor sugerido com base na melhor cotação ativa',
                    'Alerta removido automaticamente após recebimento do pedido'
                ]}
                variant="blue"
            />
        </MainLayout>
    );
}

export default Alertas;

