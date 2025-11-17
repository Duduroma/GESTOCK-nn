import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface FornecedorData {
    nome: string;
    contato: string;
    leadTime: string;
}

interface CadastrarFornecedorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: FornecedorData) => void;
    initialData?: FornecedorData | null;
}

function CadastrarFornecedorModal({ isOpen, onClose, onConfirm, initialData }: CadastrarFornecedorModalProps): React.ReactElement {
    const [nome, setNome] = useState('');
    const [contato, setContato] = useState('');
    const [leadTime, setLeadTime] = useState('');

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome);
            setContato(initialData.contato);
            setLeadTime(initialData.leadTime);
        } else {
            setNome('');
            setContato('');
            setLeadTime('');
        }
    }, [initialData, isOpen]);

    const handleConfirm = () => {
        const form = document.getElementById('form-cadastrar-fornecedor') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({ nome, contato, leadTime });
        if (!initialData) {
            setNome('');
            setContato('');
            setLeadTime('');
        }
        onClose();
    };

    const isEditMode = !!initialData;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Editar Fornecedor" : "Cadastrar Fornecedor"}
            subtitle={isEditMode ? "Atualize os dados do fornecedor" : "Preencha os dados do fornecedor"}
            formId="form-cadastrar-fornecedor"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={handleConfirm}
                />
            }
        >
            <ModalFormField
                label="Nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <ModalFormField
                label="Contato"
                type="tel"
                value={contato}
                onChange={(e) => setContato(e.target.value)}
                required
            />
            <ModalFormField
                label="Lead Time (dias)"
                type="number"
                value={leadTime}
                onChange={(e) => setLeadTime(e.target.value)}
                required
            />
            <ModalInfoBox
                message="Alterar o Lead Time recalcula automaticamente o Ponto de Ressuprimento (ROP) dos produtos associados."
                variant="blue"
            />
        </Modal>
    );
}

export default CadastrarFornecedorModal;

