import { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface FornecedorData {
    nome: string;
    cnpj: string;
    contato: string;
    leadTimeMedio: number;
    ativo: boolean;
}

interface CadastrarFornecedorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: FornecedorData) => void;
    initialData?: FornecedorData | null;
}

function CadastrarFornecedorModal({ isOpen, onClose, onConfirm, initialData }: CadastrarFornecedorModalProps): React.ReactElement {
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [contato, setContato] = useState('');
    const [leadTimeMedio, setLeadTimeMedio] = useState<number>(7);
    const [ativo, setAtivo] = useState(true);

    useEffect(() => {
        if (initialData) {
            setNome(initialData.nome);
            setCnpj(initialData.cnpj);
            setContato(initialData.contato);
            setLeadTimeMedio(initialData.leadTimeMedio);
            setAtivo(initialData.ativo);
        } else {
            setNome('');
            setCnpj('');
            setContato('');
            setLeadTimeMedio(7);
            setAtivo(true);
        }
    }, [initialData, isOpen]);

    const handleConfirm = () => {
        const form = document.getElementById('form-cadastrar-fornecedor') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({ nome, cnpj, contato, leadTimeMedio, ativo });
        if (!initialData) {
            setNome('');
            setCnpj('');
            setContato('');
            setLeadTimeMedio(7);
            setAtivo(true);
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
                label="CNPJ"
                type="text"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                placeholder="00.000.000/0000-00"
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
                label="Lead Time Médio (dias)"
                type="number"
                value={leadTimeMedio.toString()}
                onChange={(e) => setLeadTimeMedio(parseInt(e.target.value) || 7)}
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
                message="Alterar o Lead Time recalcula automaticamente o Ponto de Ressuprimento (ROP) dos produtos associados."
                variant="blue"
            />
        </Modal>
    );
}

export default CadastrarFornecedorModal;

