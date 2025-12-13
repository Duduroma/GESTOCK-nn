import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';
import { estoquesService } from '../../services/estoques';
import { Estoque } from '../../types/entities';

interface ProdutoData {
    codigo: string;
    nome: string;
    unidadePeso: string;
    peso: number;
    perecivel: boolean;
    ativo: boolean;
    estoquesVinculados: string[];
}

interface CadastrarProdutoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: ProdutoData) => void;
    initialData?: ProdutoData | null;
}

function CadastrarProdutoModal({ isOpen, onClose, onConfirm, initialData }: CadastrarProdutoModalProps): React.ReactElement {
    const [codigo, setCodigo] = useState('');
    const [nome, setNome] = useState('');
    const [unidadePeso, setUnidadePeso] = useState('g');
    const [peso, setPeso] = useState<number>(0);
    const [perecivel, setPerecivel] = useState(false);
    const [ativo, setAtivo] = useState(true);
    const [estoquesVinculados, setEstoquesVinculados] = useState<string[]>([]);
    const [estoques, setEstoques] = useState<Estoque[]>([]);
    const [carregandoEstoques, setCarregandoEstoques] = useState(false);

    useEffect(() => {
        if (initialData) {
            setCodigo(initialData.codigo);
            setNome(initialData.nome);
            setUnidadePeso(initialData.unidadePeso);
            setPeso(initialData.peso);
            setPerecivel(initialData.perecivel);
            setAtivo(initialData.ativo);
            setEstoquesVinculados(initialData.estoquesVinculados || []);
        } else {
            setCodigo('');
            setNome('');
            setUnidadePeso('g');
            setPeso(0);
            setPerecivel(false);
            setAtivo(true);
            setEstoquesVinculados([]);
        }
    }, [initialData, isOpen]);

    useEffect(() => {
        if (isOpen) {
            const carregarEstoques = async () => {
                try {
                    console.log('🔄 [CadastrarProdutoModal] Carregando estoques...');
                    setCarregandoEstoques(true);
                    const response = await estoquesService.listar();
                    console.log('✅ [CadastrarProdutoModal] Resposta de estoques:', response);
                    const estoquesData = Array.isArray(response) ? response : (response.content || []);
                    const estoquesValidos = estoquesData.filter((estoque: Estoque) => estoque != null && estoque.id != null);
                    const estoquesAtivos = estoquesValidos.filter((e: Estoque) => e.ativo);
                    setEstoques(estoquesAtivos);
                    console.log('📋 [CadastrarProdutoModal] Estoques carregados:', estoquesAtivos.length, 'itens');
                } catch (error) {
                    console.error('❌ [CadastrarProdutoModal] Erro ao carregar estoques:', error);
                } finally {
                    setCarregandoEstoques(false);
                }
            };
            carregarEstoques();
        }
    }, [isOpen]);

    const handleConfirm = () => {
        const form = document.getElementById('form-cadastrar-produto') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Validação de estoques vinculados removida temporariamente
        // TODO: Implementar quando o backend suportar vinculação de estoques

        onConfirm({
            codigo,
            nome,
            unidadePeso,
            peso,
            perecivel,
            ativo,
            estoquesVinculados
        });
        if (!initialData) {
            setCodigo('');
            setNome('');
            setUnidadePeso('g');
            setPeso(0);
            setPerecivel(false);
            setAtivo(true);
            setEstoquesVinculados([]);
        }
        onClose();
    };

    const toggleEstoque = (estoqueId: string) => {
        if (estoquesVinculados.includes(estoqueId)) {
            setEstoquesVinculados(estoquesVinculados.filter(id => id !== estoqueId));
        } else {
            setEstoquesVinculados([...estoquesVinculados, estoqueId]);
        }
    };

    const isEditMode = !!initialData;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Editar Produto" : "Cadastrar Produto"}
            subtitle={isEditMode ? "Atualize os dados do produto" : "Preencha os dados do produto"}
            formId="form-cadastrar-produto"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={handleConfirm}
                />
            }
        >
            <ModalFormField
                label="Código"
                type="text"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
            />
            <ModalFormField
                label="Nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <ModalFormField
                label="Unidade de Peso"
                type="select"
                placeholder="Selecione"
                value={unidadePeso}
                onChange={(e) => setUnidadePeso(e.target.value)}
                options={[
                    { value: 'g', label: 'Gramas (g)' },
                    { value: 'kg', label: 'Quilogramas (kg)' },
                    { value: 'L', label: 'Litros (L)' },
                    { value: 'mL', label: 'Mililitros (mL)' }
                ]}
                required
            />
            <ModalFormField
                label="Peso"
                type="number"
                value={peso.toString()}
                onChange={(e) => setPeso(parseFloat(e.target.value) || 0)}
                required
            />
            <ModalFormField
                label="Perecível"
                type="select"
                value={perecivel ? 'true' : 'false'}
                onChange={(e) => setPerecivel(e.target.value === 'true')}
                options={[
                    { value: 'false', label: 'Não' },
                    { value: 'true', label: 'Sim' }
                ]}
                required
            />
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px', color: '#374151' }}>
                    Estoques Vinculados <span style={{ color: '#dc2626' }}>*</span>
                </label>
                {carregandoEstoques ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: '#6b7280', fontSize: '14px' }}>
                        Carregando estoques...
                    </div>
                ) : estoques.length === 0 ? (
                    <div style={{ padding: '12px', textAlign: 'center', color: '#dc2626', fontSize: '14px' }}>
                        Nenhum estoque ativo disponível
                    </div>
                ) : (
                    <>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {estoques.map((estoque) => (
                                <label key={estoque.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                    <input
                                        type="checkbox"
                                        checked={estoquesVinculados.includes(estoque.id.toString())}
                                        onChange={() => toggleEstoque(estoque.id.toString())}
                                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                    />
                                    <span style={{ fontSize: '14px', color: '#1f2937' }}>{estoque.nome}</span>
                                </label>
                            ))}
                        </div>
                        {estoquesVinculados.length === 0 && (
                            <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                                Selecione pelo menos um estoque ativo
                            </span>
                        )}
                    </>
                )}
            </div>
            <ModalFormField
                label="Ativo"
                type="select"
                value={ativo ? 'true' : 'false'}
                onChange={(e) => setAtivo(e.target.value === 'true')}
                options={[
                    { value: 'true', label: 'Ativo' },
                    { value: 'false', label: 'Inativo' }
                ]}
                required
            />
            <ModalInfoBox
                message="Produto não pode ser inativado se houver saldo positivo ou pedidos pendentes. Produto deve estar vinculado a pelo menos um estoque ativo."
                variant="yellow"
            />
        </Modal>
    );
}

export default CadastrarProdutoModal;

