import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarProdutoModal from '../../components/Modals/CadastrarProdutoModal';
import useTablePage from '../../hooks/useTablePage';
import { Produto } from '../../types/entities';
import { produtosService } from '../../services/produtos';

function Produtos(): React.ReactElement {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarProdutos = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await produtosService.listar();
                const produtosData = Array.isArray(response) ? response : (response.content || []);
                setProdutos(produtosData);
            } catch (err) {
                setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
            }
        };

        carregarProdutos();
    }, []);

    const { isModalOpen, itemEditando: produtoEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Produto>({
        onView: () => navigate('/cotacoes')
    });

    const recarregarProdutos = async () => {
        try {
            setLoading(true);
            const response = await produtosService.listar();
            const produtosData = Array.isArray(response) ? response : (response.content || []);
            setProdutos(produtosData);
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (data: {
        codigo: string;
        nome: string;
        unidadePeso: string;
        peso: number;
        perecivel: boolean;
        ativo: boolean;
        estoquesVinculados: string[];
    }) => {
        try {
            if (produtoEditando) {
                await produtosService.atualizar(produtoEditando.id, {
                    codigo: data.codigo,
                    nome: data.nome,
                    unidadePeso: data.unidadePeso,
                    peso: data.peso,
                    perecivel: data.perecivel,
                    ativo: data.ativo
                });
                await recarregarProdutos();
                setItemEditando(null);
            } else {
                await produtosService.criar({
                    codigo: data.codigo,
                    nome: data.nome,
                    unidadePeso: data.unidadePeso,
                    peso: data.peso,
                    perecivel: data.perecivel,
                    ativo: data.ativo
                });
                await recarregarProdutos();
            }
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao salvar produto. Tente novamente.';
            alert(errorMessage);
        }
    };

    const handleDeletarProduto = async (produtoId: string) => {
        if (!confirm('Tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.')) {
            return;
        }
        
        try {
            await produtosService.inativar(produtoId);
            await recarregarProdutos();
        } catch (err: any) {
            const errorMessage = err?.response?.data?.message || err?.message || 'Erro ao deletar produto. Tente novamente.';
            alert(errorMessage);
        }
    };

    return (
        <MainLayout>
            <PageHeader
                title="Gerenciar Produtos"
                subtitle="Gerencie os produtos cadastrados no sistema"
                actionButton={{
                    label: "Cadastrar Produto",
                    onClick: openModal,
                    icon: '+'
                }}
            />

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando produtos...
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
                <Table headers={['Código', 'Nome', 'Unidade Peso', 'Peso', 'Perecível', 'Status', 'Ações']}>
                    {produtos.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum produto encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        produtos.map((produto) => (
                    <TableRow key={produto.id}>
                        <TableCell>{produto.codigo}</TableCell>
                        <TableCell>{produto.nome}</TableCell>
                        <TableCell>{produto.unidadePeso}</TableCell>
                        <TableCell>{produto.peso} {produto.unidadePeso}</TableCell>
                        <TableCell>
                            <Badge variant={produto.perecivel ? 'critical' : 'adequate'}>
                                {produto.perecivel ? 'Sim' : 'Não'}
                            </Badge>
                        </TableCell>
                        <TableCell>
                            <Badge variant={produto.ativo ? 'approved' : 'expired'}>
                                {produto.ativo ? 'Ativo' : 'Inativo'}
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
                                    onClick={() => handleEditar(produto.id, produtos)}
                                    ariaLabel="Editar produto"
                                />
                                <IconButton
                                    icon="🗑️"
                                    onClick={() => handleDeletarProduto(produto.id)}
                                    ariaLabel="Deletar produto"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                        ))
                    )}
                </Table>
            )}

            <CadastrarProdutoModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={produtoEditando ? {
                    codigo: produtoEditando.codigo,
                    nome: produtoEditando.nome,
                    unidadePeso: produtoEditando.unidadePeso,
                    peso: produtoEditando.peso,
                    perecivel: produtoEditando.perecivel,
                    ativo: produtoEditando.ativo,
                    estoquesVinculados: []
                } : null}
            />
        </MainLayout>
    );
}

export default Produtos;

