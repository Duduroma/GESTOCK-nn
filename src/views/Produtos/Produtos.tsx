import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import CadastrarProdutoModal from '../../components/Modals/CadastrarProdutoModal';

function Produtos(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = (data: {
        codigo: string;
        nome: string;
        descricao: string;
        embalagem: string;
        unidadeMedida: string;
        estoqueVinculado: string;
        status: string;
    }) => {
        console.log('Cadastrar produto:', data);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Produtos"
                subtitle="Gerencie os produtos cadastrados no sistema"
                actionButton={{
                    label: "Cadastrar Produto",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <Table headers={['Código', 'Nome', 'Descrição', 'Saldo', 'Estoque', 'Status', 'Fornecedor']} children={undefined}>
            </Table>

            <CadastrarProdutoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Produtos;

