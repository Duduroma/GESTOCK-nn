import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import InfoBox from '../../components/InfoBox';

function Transferencias(): React.ReactElement {
    return (
        <MainLayout>
            <PageHeader
                title="Transferências entre Estoques"
                subtitle="Transfira produtos entre estoques do mesmo cliente"
                actionButton={{
                    label: "Nova Transferência",
                    onClick: () => console.log('Nova transferência'),
                    icon: '+'
                }}
            />

            <Table headers={['Data', 'Produto', 'Quantidade', 'Origem', 'Destino', 'Responsável', 'Status']} children={undefined}>
            </Table>

            <InfoBox
                title="Movimentações Automáticas"
                items={[
                    'Após confirmar a transferência, o sistema registra automaticamente:',
                    'Movimentação de SAÍDA no estoque de origem',
                    'Movimentação de ENTRADA no estoque de destino'
                ]}
                variant="yellow"
            />
        </MainLayout>
    );
}

export default Transferencias;

