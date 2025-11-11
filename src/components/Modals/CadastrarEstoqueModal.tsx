import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface CadastrarEstoqueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        nome: string;
        endereco: string;
        capacidade: string;
        status: string;
    }) => void;
}

function CadastrarEstoqueModal({ isOpen, onClose, onConfirm }: CadastrarEstoqueModalProps): React.ReactElement {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [capacidade, setCapacidade] = useState('');
    const [status, setStatus] = useState('Ativo');

    const handleConfirm = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        
        const form = document.getElementById('form-cadastrar-estoque') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({ nome, endereco, capacidade, status });
        setNome('');
        setEndereco('');
        setCapacidade('');
        setStatus('Ativo');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Cadastrar Estoque"
            subtitle="Preencha os dados do estoque"
            formId="form-cadastrar-estoque"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={() => handleConfirm()}
                />
            }
        >
            <ModalFormField
                label="Nome do Estoque"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
            />
            <ModalFormField
                label="Endereço"
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                required
            />
            <ModalFormField
                label="Capacidade Máxima"
                type="text"
                value={capacidade}
                onChange={(e) => setCapacidade(e.target.value)}
                required
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
                title="Regras de negócio:"
                items={[
                    'Cada estoque pertence a um único cliente',
                    'Não pode haver dois estoques com mesmo nome',
                    'Estoques com produtos ou pedidos não podem ser removidos'
                ]}
                variant="blue"
            />
        </Modal>
    );
}

export default CadastrarEstoqueModal;

