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
                console.log('🔄 [Produtos] Iniciando carregamento de produtos...');
                setLoading(true);
                setError(null);
                console.log('📡 [Produtos] Chamando GET /api/produtos');
                const response = await produtosService.listar();
                console.log('✅ [Produtos] Resposta recebida:', response);
                const produtosData = Array.isArray(response) ? response : (response.content || []);
                console.log('📦 [Produtos] Produtos processados:', produtosData.length, 'itens');
                setProdutos(produtosData);
            } catch (err) {
                console.error('❌ [Produtos] Erro ao carregar produtos:', err);
                setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 [Produtos] Carregamento finalizado');
            }
        };

        carregarProdutos();
    }, []);

    const { isModalOpen, itemEditando: produtoEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Produto>({
        onView: () => navigate('/cotacoes')
    });

    const recarregarProdutos = async () => {
        try {
            console.log('🔄 [Produtos] Recarregando lista de produtos...');
            setLoading(true);
            console.log('📡 [Produtos] Chamando GET /api/produtos');
            const response = await produtosService.listar();
            console.log('✅ [Produtos] Resposta recebida:', response);
            const produtosData = Array.isArray(response) ? response : (response.content || []);
            console.log('📦 [Produtos] Produtos recarregados:', produtosData.length, 'itens');
            setProdutos(produtosData);
        } catch (err) {
            console.error('❌ [Produtos] Erro ao recarregar produtos:', err);
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
                console.log('✏️ [Produtos] Editando produto:', produtoEditando.id);
                console.log('📡 [Produtos] Chamando PUT /api/produtos/' + produtoEditando.id);
                console.log('📝 [Produtos] Dados para atualizar:', { nome: data.nome, unidadePeso: data.unidadePeso, peso: data.peso });
                await produtosService.atualizar(produtoEditando.id, {
                    nome: data.nome,
                    unidadePeso: data.unidadePeso,
                    peso: data.peso
                });
                console.log('✅ [Produtos] Produto atualizado com sucesso');
                await recarregarProdutos();
                setItemEditando(null);
            } else {
                console.log('➕ [Produtos] Criando novo produto...');
                console.log('📡 [Produtos] Chamando POST /api/produtos');
                console.log('📝 [Produtos] Dados para criar:', data);
                await produtosService.criar({
                    codigo: data.codigo,
                    nome: data.nome,
                    unidadePeso: data.unidadePeso,
                    peso: data.peso,
                    perecivel: data.perecivel,
                    ativo: data.ativo,
                    estoquesVinculados: data.estoquesVinculados
                });
                console.log('✅ [Produtos] Produto criado com sucesso');
                await recarregarProdutos();
            }
        } catch (err) {
            console.error('❌ [Produtos] Erro ao salvar produto:', err);
            alert('Erro ao salvar produto. Tente novamente.');
        }
    };

    const handleDeletarProduto = async (produtoId: string) => {
        try {
            console.log('🗑️ [Produtos] Deletando produto:', produtoId);
            console.log('📡 [Produtos] Chamando DELETE /api/produtos/' + produtoId);
            await produtosService.inativar(produtoId);
            console.log('✅ [Produtos] Produto deletado com sucesso');
            await recarregarProdutos();
        } catch (err) {
            console.error('❌ [Produtos] Erro ao deletar produto:', err);
            alert('Erro ao deletar produto. Tente novamente.');
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

