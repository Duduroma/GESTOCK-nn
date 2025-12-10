import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import ApproveButton from './ApproveButton';
import InfoBox from '../../components/InfoBox';
import { Cotacao, CotacaoId, ProdutoId } from '../../types/entities';

function Cotacoes(): React.ReactElement {
    const [cotacoes, setCotacoes] = useState<Cotacao[]>([
        {
            id: '1',
            produtoId: '1',
            preco: 0.50,
            prazoDias: 7,
            validadeAtiva: true
        },
        {
            id: '2',
            produtoId: '1',
            preco: 0.45,
            prazoDias: 5,
            validadeAtiva: true
        },
        {
            id: '3',
            produtoId: '2',
            preco: 85.00,
            prazoDias: 10,
            validadeAtiva: true
        },
        {
            id: '4',
            produtoId: '3',
            preco: 12.50,
            prazoDias: 7,
            validadeAtiva: false
        }
    ]);

    const isMostAdvantageous = (cotacao: Cotacao) => {
        const cotacoesDoProduto = cotacoes.filter(c => c.produtoId === cotacao.produtoId && c.validadeAtiva);
        if (cotacoesDoProduto.length === 0) return false;
        const melhorPreco = Math.min(...cotacoesDoProduto.map(c => c.preco));
        return cotacao.preco === melhorPreco && cotacao.validadeAtiva;
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Cotações"
                subtitle="Visualize e aprove cotações de produtos"
            />

            <InfoBox
                title="Critérios de Seleção Automática"
                items={[
                    'Prioridade 1: Menor preço entre fornecedores ativos',
                    'Prioridade 2: Em caso de empate no preço, menor Lead Time',
                    'Cotações expiradas não são consideradas'
                ]}
                variant="blue"
            />

            <Table headers={['Produto', 'Preço', 'Prazo (dias)', 'Validade', 'Ações']}>
                {cotacoes.map((cotacao) => {
                    const isAdvantageous = isMostAdvantageous(cotacao);
                    return (
                        <TableRow key={cotacao.id} highlighted={isAdvantageous}>
                            <TableCell>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    Produto {cotacao.produtoId}
                                    {isAdvantageous && (
                                        <Badge variant="adequate">
                                            Mais Vantajosa
                                        </Badge>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>R$ {cotacao.preco.toFixed(2)}</TableCell>
                            <TableCell>{cotacao.prazoDias}</TableCell>
                            <TableCell>
                                <Badge variant={cotacao.validadeAtiva ? 'approved' : 'expired'}>
                                    {cotacao.validadeAtiva ? 'Ativa' : 'Expirada'}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <ApproveButton
                                    onClick={() => console.log('Usar cotação:', cotacao.id)}
                                    disabled={!cotacao.validadeAtiva}
                                    isMostAdvantageous={isAdvantageous}
                                />
                            </TableCell>
                        </TableRow>
                    );
                })}
            </Table>
        </MainLayout>
    );
}

export default Cotacoes;

