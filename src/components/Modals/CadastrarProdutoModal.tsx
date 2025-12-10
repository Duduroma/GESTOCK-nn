import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

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

    const handleConfirm = () => {
        const form = document.getElementById('form-cadastrar-produto') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        if (estoquesVinculados.length === 0) {
            alert('Produto deve estar vinculado a pelo menos um estoque ativo');
            return;
        }

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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['1', '2', '3'].map((estoqueId) => (
                        <label key={estoqueId} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={estoquesVinculados.includes(estoqueId)}
                                onChange={() => toggleEstoque(estoqueId)}
                                style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                            />
                            <span style={{ fontSize: '14px', color: '#1f2937' }}>Estoque {estoqueId}</span>
                        </label>
                    ))}
                </div>
                {estoquesVinculados.length === 0 && (
                    <span style={{ fontSize: '12px', color: '#dc2626', marginTop: '4px', display: 'block' }}>
                        Selecione pelo menos um estoque ativo
                    </span>
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

