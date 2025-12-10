import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarEstoqueModal from '../../components/Modals/CadastrarEstoqueModal';
import useTablePage from '../../hooks/useTablePage';
import { Estoque, EstoqueId, ClienteId } from '../../types/entities';

function Estoques(): React.ReactElement {
    const navigate = useNavigate();
    const { isModalOpen, itemEditando: estoqueEditando, openModal, closeModal, handleEditar, handleDeletar, handleView, setItemEditando } = useTablePage<Estoque>({
        onView: () => navigate('/produtos')
    });

    const [estoques, setEstoques] = useState<Estoque[]>([
        {
            id: '1',
            clienteId: '1',
            nome: 'Estoque Central',
            endereco: 'Rua A, 100 - São Paulo',
            capacidade: 10000,
            ativo: true
        },
        {
            id: '2',
            clienteId: '1',
            nome: 'Estoque Filial Norte',
            endereco: 'Av. B, 200 - Guarulhos',
            capacidade: 5000,
            ativo: true
        },
        {
            id: '3',
            clienteId: '2',
            nome: 'Estoque Temporário',
            endereco: 'Rua C, 300 - Osasco',
            capacidade: 2000,
            ativo: false
        }
    ]);

    const handleConfirm = (data: {
        clienteId: string;
        nome: string;
        endereco: string;
        capacidade: number;
        ativo: boolean;
    }) => {
        if (estoqueEditando) {
            setEstoques(estoques.map(estoque => 
                estoque.id === estoqueEditando.id
                    ? { 
                        ...estoque, 
                        clienteId: data.clienteId,
                        nome: data.nome,
                        endereco: data.endereco,
                        capacidade: data.capacidade,
                        ativo: data.ativo
                    }
                    : estoque
            ));
            setItemEditando(null);
            console.log('Estoque editado:', data);
        } else {
            console.log('Cadastrar estoque:', data);
        }
    };


    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Estoques"
                subtitle="Gerencie os estoques do sistema"
                actionButton={{
                    label: "Cadastrar Estoque",
                    onClick: openModal,
                    icon: '+'
                }}
            />

            <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']}>
                {estoques.map((estoque) => (
                    <TableRow key={estoque.id}>
                        <TableCell>{estoque.nome}</TableCell>
                        <TableCell>{estoque.endereco}</TableCell>
                        <TableCell>{estoque.capacidade.toLocaleString('pt-BR')}</TableCell>
                        <TableCell>
                            <Badge variant={estoque.ativo ? 'approved' : 'expired'}>
                                {estoque.ativo ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <ActionButton
                                    label="Visualizar Produtos"
                                    icon="👁️"
                                    onClick={handleView}
                                />
                                <IconButton
                                    icon="✏️"
                                    onClick={() => handleEditar(estoque.id, estoques)}
                                    ariaLabel="Editar estoque"
                                />
                                <IconButton
                                    icon="🗑️"
                                    onClick={() => handleDeletar(estoque.id)}
                                    ariaLabel="Deletar estoque"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>

            <CadastrarEstoqueModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={estoqueEditando ? {
                    clienteId: estoqueEditando.clienteId,
                    nome: estoqueEditando.nome,
                    endereco: estoqueEditando.endereco,
                    capacidade: estoqueEditando.capacidade,
                    ativo: estoqueEditando.ativo
                } : null}
            />
        </MainLayout>
    );
}

export default Estoques;

