import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/MainLayout';
import PageHeader from '../../components/PageHeader';
import { Table, TableRow, TableCell } from '../../components/Table';
import Badge from '../../components/Badge';
import IconButton from '../../components/IconButton';
import ActionButton from '../../components/ActionButton';
import CadastrarEstoqueModal from '../../components/Modals/CadastrarEstoqueModal';
import useTablePage from '../../hooks/useTablePage';
import { Estoque } from '../../types/entities';
import { estoquesService } from '../../services/estoques';

function Estoques(): React.ReactElement {
    const navigate = useNavigate();
    const [estoques, setEstoques] = useState<Estoque[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [busca, setBusca] = useState('');
    const [filtroStatus, setFiltroStatus] = useState<string>('');

    useEffect(() => {
        const carregarEstoques = async () => {
            try {
                console.log('🔄 Iniciando carregamento de estoques...');
                setLoading(true);
                setError(null);
                console.log('📡 Chamando estoquesService.listar()...');
                const params: any = {};
                if (busca) params.busca = busca;
                if (filtroStatus) params.status = filtroStatus;
                const response = await estoquesService.listar(params);
                console.log('✅ Resposta recebida da API:', response);
                console.log('📦 Tipo da resposta:', Array.isArray(response) ? 'Array' : 'Objeto');
                const estoquesData = Array.isArray(response) ? response : (response.content || []);
                const estoquesValidos = estoquesData.filter(estoque => estoque != null && estoque.id != null);
                console.log('📋 Estoques processados:', estoquesValidos);
                console.log('🔢 Quantidade de estoques válidos:', estoquesValidos.length);
                setEstoques(estoquesValidos);
            } catch (err) {
                console.error('❌ Erro ao carregar estoques:', err);
                console.error('❌ Detalhes do erro:', JSON.stringify(err, null, 2));
                setError('Erro ao carregar estoques. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 Carregamento finalizado');
            }
        };

        carregarEstoques();
    }, [busca, filtroStatus]);
    
    const handleEditarEstoque = async (itemId: string) => {
        try {
            console.log('📖 Buscando estoque atualizado do backend:', itemId);
            console.log('📡 Chamando GET /estoques/' + itemId);
            const estoqueAtualizado = await estoquesService.buscarPorId(itemId);
            console.log('✅ Estoque carregado do backend:', estoqueAtualizado);
            
            if (!estoqueAtualizado || !estoqueAtualizado.id) {
                console.error('❌ Estoque retornado é inválido:', estoqueAtualizado);
                alert('Erro: Estoque não encontrado ou dados inválidos.');
                return;
            }
            
            setItemEditando(estoqueAtualizado);
            setIsModalOpen(true);
        } catch (err) {
            console.error('❌ Erro ao buscar estoque:', err);
            console.error('❌ Detalhes do erro:', JSON.stringify(err, null, 2));
            alert('Erro ao carregar dados do estoque. Tente novamente.');
        }
    };

    const recarregarEstoques = async () => {
        try {
            console.log('🔄 [Estoques] Recarregando lista de estoques...');
            setLoading(true);
            console.log('📡 [Estoques] Chamando GET /api/estoques');
            const params: any = {};
            if (busca) params.busca = busca;
            if (filtroStatus) params.status = filtroStatus;
            const response = await estoquesService.listar(params);
            console.log('✅ [Estoques] Resposta recebida:', response);
            const estoquesData = Array.isArray(response) ? response : (response.content || []);
            console.log('📦 [Estoques] Estoques processados:', estoquesData.length, 'itens');
            const estoquesValidos = estoquesData.filter(estoque => estoque != null && estoque.id != null);
            console.log('✅ [Estoques] Estoques válidos:', estoquesValidos.length);
            setEstoques(estoquesValidos);
        } catch (err) {
            console.error('❌ [Estoques] Erro ao recarregar estoques:', err);
        } finally {
            setLoading(false);
        }
    };

    const { isModalOpen, itemEditando: estoqueEditando, openModal, closeModal, handleDeletar, handleView, setItemEditando, setIsModalOpen } = useTablePage<Estoque>({
        onView: () => navigate('/produtos'),
        onDelete: async (itemId: string) => {
            try {
                console.log('🗑️ [Estoques] Deletando estoque:', itemId);
                console.log('📡 [Estoques] Chamando DELETE /api/estoques/' + itemId);
                await estoquesService.deletar(itemId);
                console.log('✅ [Estoques] Estoque deletado com sucesso');
                await recarregarEstoques();
            } catch (err) {
                console.error('❌ [Estoques] Erro ao deletar estoque:', err);
                console.error('❌ [Estoques] Detalhes do erro:', JSON.stringify(err, null, 2));
                alert('Erro ao deletar estoque. Tente novamente.');
            }
        }
    });

    const estoquesFiltrados = useMemo(() => {
        console.log('📋 Exibindo estoques (filtros aplicados no backend):', estoques.length);
        return estoques.filter(estoque => estoque != null && estoque.id != null);
    }, [estoques]);

    const handleConfirm = async (data: {
        clienteId: string;
        nome: string;
        endereco: string;
        capacidade: number;
        ativo: boolean;
    }) => {
        try {
            if (estoqueEditando) {
                console.log('✏️ [Estoques] Editando estoque:', estoqueEditando.id);
                console.log('📡 [Estoques] Chamando PUT /api/estoques/' + estoqueEditando.id);
                console.log('📝 [Estoques] Dados para atualizar:', data);
                const estoqueAtualizado = await estoquesService.atualizar(estoqueEditando.id, {
                    nome: data.nome,
                    endereco: data.endereco,
                    capacidade: data.capacidade,
                    ativo: data.ativo
                });
                console.log('✅ [Estoques] Estoque atualizado com sucesso:', estoqueAtualizado);
                await recarregarEstoques();
                setItemEditando(null);
            } else {
                console.log('➕ [Estoques] Criando novo estoque...');
                console.log('📡 [Estoques] Chamando POST /api/estoques');
                console.log('📝 [Estoques] Dados para criar:', data);
                const novoEstoque = await estoquesService.criar({
                    clienteId: parseInt(data.clienteId) as any,
                    nome: data.nome,
                    endereco: data.endereco,
                    capacidade: data.capacidade,
                    ativo: data.ativo
                });
                console.log('✅ [Estoques] Estoque criado com sucesso:', novoEstoque);
                await recarregarEstoques();
            }
        } catch (err) {
            console.error('❌ [Estoques] Erro ao salvar estoque:', err);
            console.error('❌ [Estoques] Detalhes do erro:', JSON.stringify(err, null, 2));
            alert('Erro ao salvar estoque. Tente novamente.');
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

            <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
                flexWrap: 'wrap',
                alignItems: 'flex-end'
            }}>
                <div style={{ minWidth: '200px', flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Buscar
                    </label>
                    <input
                        type="text"
                        placeholder="Nome ou endereço..."
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>
                <div style={{ minWidth: '150px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                        Status
                    </label>
                    <select
                        value={filtroStatus}
                        onChange={(e) => setFiltroStatus(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '14px'
                        }}
                    >
                        <option value="">Todos</option>
                        <option value="ativo">Ativo</option>
                        <option value="inativo">Inativo</option>
                    </select>
                </div>
            </div>

            {loading && (
                <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                    Carregando estoques...
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
                <Table headers={['Nome do Estoque', 'Endereço', 'Capacidade', 'Status', 'Ações']}>
                    {estoquesFiltrados.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={5} style={{ textAlign: 'center', color: '#6b7280' }}>
                                Nenhum estoque encontrado
                            </TableCell>
                        </TableRow>
                    ) : (
                        estoquesFiltrados
                            .filter(estoque => estoque != null && estoque.id != null)
                            .map((estoque) => (
                            <TableRow key={estoque.id}>
                                <TableCell>{estoque.nome || '-'}</TableCell>
                                <TableCell>{estoque.endereco || '-'}</TableCell>
                                <TableCell>{estoque.capacidade ? estoque.capacidade.toLocaleString('pt-BR') : '-'}</TableCell>
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
                                            onClick={() => handleEditarEstoque(estoque.id)}
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
                        ))
                    )}
                </Table>
            )}

            <CadastrarEstoqueModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleConfirm}
                initialData={estoqueEditando && estoqueEditando.id ? {
                    clienteId: estoqueEditando.clienteId || '',
                    nome: estoqueEditando.nome || '',
                    endereco: estoqueEditando.endereco || '',
                    capacidade: estoqueEditando.capacidade || 0,
                    ativo: estoqueEditando.ativo ?? true
                } : null}
            />
        </MainLayout>
    );
}

export default Estoques;

