import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface ProdutoData {
    codigo: string;
    nome: string;
    descricao: string;
    embalagem: string;
    unidadeMedida: string;
    estoqueVinculado: string;
    status: string;
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
    const [descricao, setDescricao] = useState('');
    const [embalagem, setEmbalagem] = useState('');
    const [unidadeMedida, setUnidadeMedida] = useState('');
    const [estoqueVinculado, setEstoqueVinculado] = useState('');
    const [status, setStatus] = useState('Ativo');

    useEffect(() => {
        if (initialData) {
            setCodigo(initialData.codigo);
            setNome(initialData.nome);
            setDescricao(initialData.descricao);
            setEmbalagem(initialData.embalagem);
            setUnidadeMedida(initialData.unidadeMedida);
            setEstoqueVinculado(initialData.estoqueVinculado);
            setStatus(initialData.status);
        } else {
            setCodigo('');
            setNome('');
            setDescricao('');
            setEmbalagem('');
            setUnidadeMedida('');
            setEstoqueVinculado('');
            setStatus('Ativo');
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
            descricao,
            embalagem,
            unidadeMedida,
            estoqueVinculado,
            status
        });
        if (!initialData) {
            setCodigo('');
            setNome('');
            setDescricao('');
            setEmbalagem('');
            setUnidadeMedida('');
            setEstoqueVinculado('');
            setStatus('Ativo');
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
                label="Descrição"
                type="textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
            />
            <ModalFormField
                label="Embalagem"
                type="text"
                value={embalagem}
                onChange={(e) => setEmbalagem(e.target.value)}
            />
            <ModalFormField
                label="Unidade de Medida"
                type="select"
                placeholder="Selecione"
                value={unidadeMedida}
                onChange={(e) => setUnidadeMedida(e.target.value)}
                options={[
                    { value: 'unidade', label: 'Unidade' },
                    { value: 'litro', label: 'Litros' },
                    { value: 'metro', label: 'Metros' },
                    { value: 'kg', label: 'Quilogramas' }
                ]}
            />

            <ModalFormField
                label="Estoque Vinculado"
                type="select"
                placeholder="Selecione"
                value={estoqueVinculado}
                onChange={(e) => setEstoqueVinculado(e.target.value)}
            />
            <ModalFormField
                label="Status"
                type="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                options={[
                    { value: 'Ativo', label: 'Ativo' },
                    { value: 'Inativo', label: 'Inativo' }
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

