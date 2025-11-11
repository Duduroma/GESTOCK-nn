import { useState } from 'react';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import CadastrarEstoqueModal from '../../components/Modals/CadastrarEstoqueModal';

function Estoques(): React.ReactElement {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleConfirm = (data: {
        nome: string;
        endereco: string;
        capacidade: string;
        status: string;
    }) => {
        console.log('Cadastrar estoque:', data);
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Estoques"
                subtitle="Gerencie os estoques do sistema"
                actionButton={{
                    label: "Cadastrar Estoque",
                    onClick: () => setIsModalOpen(true),
                    icon: '+'
                }}
            />

            <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']} children={undefined}>
            </Table>

            <CadastrarEstoqueModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirm}
            />
        </MainLayout>
    );
}

export default Estoques;

