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
import { Fornecedor, LeadTime } from '../../types/entities';
import { fornecedoresService } from '../../services/fornecedores';

function Fornecedores(): React.ReactElement {
    const navigate = useNavigate();
    const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const carregarFornecedores = async () => {
            try {
                console.log('🔄 [Fornecedores] ========== INICIANDO CARREGAMENTO ==========');
                setLoading(true);
                setError(null);
                console.log('📡 [Fornecedores] Chamando fornecedoresService.listar()');
                const response = await fornecedoresService.listar();
                console.log('✅ [Fornecedores] Resposta bruta recebida:', response);
                console.log('📊 [Fornecedores] Tipo da resposta:', Array.isArray(response) ? 'Array' : typeof response);
                console.log('📊 [Fornecedores] É array?', Array.isArray(response));
                
                const fornecedoresData = Array.isArray(response) ? response : (response.content || []);
                console.log('📦 [Fornecedores] Fornecedores processados:', fornecedoresData.length, 'itens');
                
                if (fornecedoresData.length > 0) {
                    console.log('📋 [Fornecedores] Primeiro fornecedor:', fornecedoresData[0]);
                    console.log('📋 [Fornecedores] Estrutura do primeiro fornecedor:', {
                        id: fornecedoresData[0].id,
                        nome: fornecedoresData[0].nome,
                        leadTimeMedio: fornecedoresData[0].leadTimeMedio,
                        tipoLeadTime: typeof fornecedoresData[0].leadTimeMedio
                    });
                }
                
                setFornecedores(fornecedoresData);
                console.log('✅ [Fornecedores] Estado atualizado com', fornecedoresData.length, 'fornecedores');
            } catch (err: any) {
                console.error('❌ [Fornecedores] Erro ao carregar fornecedores:', err);
                console.error('❌ [Fornecedores] Detalhes do erro:', {
                    message: err?.message,
                    status: err?.response?.status,
                    data: err?.response?.data,
                    stack: err?.stack
                });
                setError('Erro ao carregar fornecedores. Verifique se o backend está rodando.');
            } finally {
                setLoading(false);
                console.log('🏁 [Fornecedores] ========== CARREGAMENTO FINALIZADO ==========');
            }
        };

        carregarFornecedores();
    }, []);

    const { isModalOpen, itemEditando: fornecedorEditando, openModal, closeModal, handleEditar, handleView, setItemEditando } = useTablePage<Fornecedor>({
        onView: () => navigate('/cotacoes')
    });

    const handleDeletar = async (fornecedorId: string) => {
        try {
            console.log('🗑️ [Fornecedores] ========== INATIVANDO FORNECEDOR ==========');
            console.log('🗑️ [Fornecedores] ID do fornecedor:', fornecedorId);
            await fornecedoresService.inativar(fornecedorId);
            console.log('✅ [Fornecedores] Fornecedor inativado com sucesso');
            await recarregarFornecedores();
        } catch (err: any) {
            console.error('❌ [Fornecedores] Erro ao inativar fornecedor:', err);
            console.error('❌ [Fornecedores] Detalhes:', {
                message: err?.message,
                status: err?.response?.status,
                data: err?.response?.data
            });
            alert('Erro ao deletar fornecedor. Tente novamente.');
        }
    };

    const recarregarFornecedores = async () => {
        try {
            console.log('🔄 [Fornecedores] ========== RECARREGANDO LISTA ==========');
            setLoading(true);
            const response = await fornecedoresService.listar();
            console.log('✅ [Fornecedores] Resposta do recarregamento:', response);
            const fornecedoresData = Array.isArray(response) ? response : (response.content || []);
            console.log('📦 [Fornecedores] Fornecedores recarregados:', fornecedoresData.length, 'itens');
            setFornecedores(fornecedoresData);
            console.log('✅ [Fornecedores] Estado atualizado com', fornecedoresData.length, 'fornecedores');
        } catch (err: any) {
            console.error('❌ [Fornecedores] Erro ao recarregar fornecedores:', err);
            console.error('❌ [Fornecedores] Detalhes:', {
                message: err?.message,
                status: err?.response?.status,
                data: err?.response?.data
            });
        } finally {
            setLoading(false);
            console.log('🏁 [Fornecedores] Recarregamento finalizado');
        }
    };

    const handleConfirm = async (data: {
        nome: string;
        cnpj: string;
        contato: string;
        leadTimeMedio: number;
        ativo: boolean;
    }) => {
        try {
            if (fornecedorEditando) {
                console.log('✏️ [Fornecedores] ========== EDITANDO FORNECEDOR ==========');
                console.log('✏️ [Fornecedores] ID do fornecedor:', fornecedorEditando.id);
                console.log('📝 [Fornecedores] Dados recebidos do modal:', data);
                console.log('📝 [Fornecedores] Dados para atualizar:', { 
                    nome: data.nome, 
                    contato: data.contato,
                    leadTimeMedio: data.leadTimeMedio
                });
                
                const updateData = {
                    nome: data.nome,
                    contato: data.contato,
                    leadTimeMedio: { dias: data.leadTimeMedio } as LeadTime
                };
                console.log('📤 [Fornecedores] Enviando para API:', JSON.stringify(updateData, null, 2));
                
                const response = await fornecedoresService.atualizar(fornecedorEditando.id, updateData);
                console.log('✅ [Fornecedores] Resposta da atualização:', response);
                console.log('✅ [Fornecedores] Fornecedor atualizado com sucesso');
                
                await recarregarFornecedores();
                setItemEditando(null);
            } else {
                console.log('➕ [Fornecedores] ========== CRIANDO FORNECEDOR ==========');
                console.log('📝 [Fornecedores] Dados recebidos do modal:', data);
                
                const createData = {
                    nome: data.nome,
                    cnpj: data.cnpj,
                    contato: data.contato,
                    leadTimeMedio: { dias: data.leadTimeMedio } as LeadTime,
                    ativo: data.ativo
                };
                console.log('📤 [Fornecedores] Dados formatados para envio:', JSON.stringify(createData, null, 2));
                console.log('📤 [Fornecedores] Estrutura leadTimeMedio:', createData.leadTimeMedio);
                
                const response = await fornecedoresService.criar(createData);
                console.log('✅ [Fornecedores] Resposta da criação:', response);
                console.log('✅ [Fornecedores] Fornecedor criado com sucesso');
                
                await recarregarFornecedores();
            }
        } catch (err: any) {
            console.error('❌ [Fornecedores] ========== ERRO AO SALVAR ==========');
            console.error('❌ [Fornecedores] Erro completo:', err);
            console.error('❌ [Fornecedores] Detalhes do erro:', {
                message: err?.message,
                status: err?.response?.status,
                statusText: err?.response?.statusText,
                data: err?.response?.data,
                url: err?.config?.url,
                method: err?.config?.method
            });
            alert('Erro ao salvar fornecedor. Tente novamente.');
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

