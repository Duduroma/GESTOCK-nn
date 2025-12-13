import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarFornecedorModal from '../../components/Modals/CadastrarFornecedorModal';
import useTablePage from '../../hooks/useTablePage';
import { Fornecedor } from '../../types/entities';

const fornecedoresMockados: Fornecedor[] = [
    {
        id: '1',
        nome: 'Distribuidora ABC Ltda',
        cnpj: '12.345.678/0001-90',
        contato: 'contato@abc.com.br',
        leadTimeMedio: { dias: 7 },
        ativo: true
    },
    {
        id: '2',
        nome: 'Fornecedor XYZ S.A.',
        cnpj: '98.765.432/0001-10',
        contato: 'vendas@xyz.com.br',
        leadTimeMedio: { dias: 14 },
        ativo: true
    },
    {
        id: '3',
        nome: 'Comercial Delta',
        cnpj: '11.222.333/0001-44',
        contato: 'comercial@delta.com.br',
        leadTimeMedio: { dias: 5 },
        ativo: false
    },
    {
        id: '4',
        nome: 'Importadora Global',
        cnpj: '55.666.777/0001-88',
        contato: 'import@global.com.br',
        leadTimeMedio: { dias: 21 },
        ativo: true
    },
    {
        id: '5',
        nome: 'Atacadista Premium',
        cnpj: '33.444.555/0001-66',
        contato: 'atacado@premium.com.br',
        leadTimeMedio: { dias: 10 },
        ativo: true
    }
];

function Fornecedores(): React.ReactElement {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarFornecedores = async () => {
            setLoading(true);
            setError(null);
            
            await new Promise(resolve => setTimeout(resolve, 500));
            
            setFornecedores([...fornecedoresMockados]);
            setLoading(false);
        };

        carregarFornecedores();
    }, []);

    const { isModalOpen, itemEditando: fornecedorEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Fornecedor>({
        onView: () => navigate('/cotacoes')
    });

    const handleDeletar = async (fornecedorId: string) => {
        setFornecedores(prev => 
            prev.map(f => 
                f.id === fornecedorId ? { ...f, ativo: false } : f
            )
        );
    };


    const handleConfirm = async (data: {
        nome: string;
        cnpj: string;
        contato: string;
        leadTimeMedio: number;
        ativo: boolean;
    }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (fornecedorEditando) {
            setFornecedores(prev =>
                prev.map(f =>
                    f.id === fornecedorEditando.id
                        ? {
                              ...f,
                              nome: data.nome,
                              contato: data.contato,
                              leadTimeMedio: { dias: data.leadTimeMedio }
                          }
                        : f
                )
            );
            setItemEditando(null);
        } else {
            const novoFornecedor: Fornecedor = {
                id: String(Date.now()),
                nome: data.nome,
                cnpj: data.cnpj,
                contato: data.contato,
                leadTimeMedio: { dias: data.leadTimeMedio },
                ativo: data.ativo
            };
            setFornecedores(prev => [...prev, novoFornecedor]);
        }
    };


    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Fornecedores"
                subtitle="Gerencie os fornecedores e suas cotações"
                actionButton={{
                    label: "Cadastrar Fornecedor",
                    onClick: openModal,
                    icon: '+'
                }}
            />

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando fornecedores...
                </div>
            )}

            {error && (
                <div style={{ 
                    padding: '16px', 
                    backgroundColor: '#fee2e2', 
                    border: '1px solid #fca5a5', 
                    borderRadius: '6px', 
                    color: '#991b1b',
                    marginBottom: '24px'
                }}>
                    {error}
                </div>
            )}

            {!loading && !error && (
                <Table headers={['Nome', 'CNPJ', 'Contato', 'Lead Time (dias)', 'Status', 'Ações']}>
                    {fornecedores.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={6} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum fornecedor encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        fornecedores.map((fornecedor) => (
                    <TableRow key={fornecedor.id}>
                        <TableCell>{fornecedor.nome}</TableCell>
                        <TableCell>{fornecedor.cnpj}</TableCell>
                        <TableCell>{fornecedor.contato}</TableCell>
                        <TableCell>{fornecedor.leadTimeMedio.dias}</TableCell>
                        <TableCell>
                            <Badge variant={fornecedor.ativo ? 'approved' : 'expired'}>
                                {fornecedor.ativo ? 'Ativo' : 'Inativo'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}>
                                <ActionButton
                                    label="Ver Cotações"
                                    icon="$"
                                    onClick={handleView}
                                />
                                <IconButton
                                    icon="✏️"
                                    onClick={() => handleEditar(fornecedor.id, fornecedores)}
                                    ariaLabel="Editar fornecedor"
                                />
                                <IconButton
                                    icon="🗑️"
                                    onClick={() => handleDeletar(fornecedor.id)}
                                    ariaLabel="Deletar fornecedor"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                        ))
                    )}
                </Table>
            )}

            <CadastrarFornecedorModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={fornecedorEditando ? {
                    nome: fornecedorEditando.nome,
                    cnpj: fornecedorEditando.cnpj,
                    contato: fornecedorEditando.contato,
                    leadTimeMedio: fornecedorEditando.leadTimeMedio.dias,
                    ativo: fornecedorEditando.ativo
                } : null}
            />
        </MainLayout>
    );
}

export default Fornecedores;

