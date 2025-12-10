import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';

import { TipoMovimentacao } from '../../types/entities';

interface RegistrarMovimentacaoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        produtoId: string;
        tipo: TipoMovimentacao;
        quantidade: number;
        dataHora: string;
        motivo: string;
        responsavel: string;
        meta?: Record<string, string>;
    }) => void;
}

function RegistrarMovimentacaoModal({ isOpen, onClose, onConfirm }: RegistrarMovimentacaoModalProps): React.ReactElement {
    const [produtoId, setProdutoId] = useState('');
    const [tipo, setTipo] = useState<TipoMovimentacao>(TipoMovimentacao.ENTRADA);
    const [quantidade, setQuantidade] = useState<number>(0);
    const [dataHora, setDataHora] = useState(new Date().toISOString().slice(0, 16));
    const [motivo, setMotivo] = useState('');
    const [responsavel, setResponsavel] = useState('');

    const handleConfirm = () => {
        const form = document.getElementById('form-registrar-movimentacao') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        onConfirm({ 
            produtoId, 
            tipo, 
            quantidade, 
            dataHora, 
            motivo, 
            responsavel 
        });
        setProdutoId('');
        setTipo(TipoMovimentacao.ENTRADA);
        setQuantidade(0);
        setDataHora(new Date().toISOString().slice(0, 16));
        setMotivo('');
        setResponsavel('');
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Registrar Movimentação"
            subtitle="Preencha os dados da movimentação"
            formId="form-registrar-movimentacao"
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
                label="Tipo"
                type="select"
                value={tipo}
                onChange={(e) => setTipo(e.target.value as TipoMovimentacao)}
                options={[
                    { value: TipoMovimentacao.ENTRADA, label: 'Entrada' },
                    { value: TipoMovimentacao.SAIDA, label: 'Saída' }
                ]}
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
                label="Data/Hora"
                type="datetime-local"
                value={dataHora}
                onChange={(e) => setDataHora(e.target.value)}
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
            <ModalFormField
                label="Responsável"
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
                required
            />
        </Modal>
    );
}

export default RegistrarMovimentacaoModal;

