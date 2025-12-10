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

    useEffect(() => {
        if (initialData) {
            setCodigo(initialData.codigo);
            setNome(initialData.nome);
            setUnidadePeso(initialData.unidadePeso);
            setPeso(initialData.peso);
            setPerecivel(initialData.perecivel);
            setAtivo(initialData.ativo);
        } else {
            setCodigo('');
            setNome('');
            setUnidadePeso('g');
            setPeso(0);
            setPerecivel(false);
            setAtivo(true);
        }
    }, [initialData, isOpen]);

    const handleConfirm = () => {
        const form = document.getElementById('form-cadastrar-produto') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({
            codigo,
            nome,
            unidadePeso,
            peso,
            perecivel,
            ativo
        });
        if (!initialData) {
            setCodigo('');
            setNome('');
            setUnidadePeso('g');
            setPeso(0);
            setPerecivel(false);
            setAtivo(true);
        }
        onClose();
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
                message="Produto não pode ser inativado se houver saldo positivo ou pedidos pendentes."
                variant="yellow"
            />
        </Modal>
    );
}

export default CadastrarProdutoModal;

