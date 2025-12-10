import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import ModalInfoBox from '../Modal/ModalInfoBox';

interface NovaTransferenciaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        produtoId: string;
        estoqueOrigemId: string;
        estoqueDestinoId: string;
        quantidade: number;
        responsavel: string;
        motivo: string;
    }) => void;
}

function NovaTransferenciaModal({ isOpen, onClose, onConfirm }: NovaTransferenciaModalProps): React.ReactElement {
    const [produtoId, setProdutoId] = useState('');
    const [estoqueOrigemId, setEstoqueOrigemId] = useState('');
    const [estoqueDestinoId, setEstoqueDestinoId] = useState('');
    const [quantidade, setQuantidade] = useState<number>(0);
    const [responsavel, setResponsavel] = useState('');
    const [motivo, setMotivo] = useState('');

    const handleConfirm = () => {
        const form = document.getElementById('form-nova-transferencia') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({ produtoId, estoqueOrigemId, estoqueDestinoId, quantidade, responsavel, motivo });
        setProdutoId('');
        setEstoqueOrigemId('');
        setEstoqueDestinoId('');
        setQuantidade(0);
        setResponsavel('');
        setMotivo('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Nova Transferência"
            subtitle="Preencha os dados da transferência"
            formId="form-nova-transferencia"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={handleConfirm}
                />
            }
        >
            {/* listagem de produtos */}
            <ModalFormField
                label="Produto"
                type="select"
                placeholder="Selecione o produto"
                value={produtoId}
                onChange={(e) => setProdutoId(e.target.value)}
                required
            />
            <ModalFormField
                label="Estoque de Origem"
                type="select"
                placeholder="Selecione o estoque de origem"
                value={estoqueOrigemId}
                onChange={(e) => setEstoqueOrigemId(e.target.value)}
                required
            />
            <ModalFormField
                label="Estoque de Destino"
                type="select"
                placeholder="Selecione o estoque de destino"
                value={estoqueDestinoId}
                onChange={(e) => setEstoqueDestinoId(e.target.value)}
                required
            />
            <ModalFormField
                label="Quantidade"
                type="number"
                value={quantidade.toString()}
                onChange={(e) => setQuantidade(parseInt(e.target.value) || 0)}
                required
            />
            <ModalFormField
                label="Responsável"
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
            />
            <ModalFormField
                label="Motivo"
                type="textarea"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                rows={3}
                required
            />
            <ModalInfoBox
                message="A transferência só pode ocorrer entre estoques do mesmo cliente. O sistema verifica se há quantidade suficiente no estoque de origem."
                variant="blue"
            />
        </Modal>
    );
}

export default NovaTransferenciaModal;

