import { useState } from 'react';
import Modal from '../Modal/Modal';
import ModalFormField from '../Modal/ModalFormField';
import ModalActions from '../Modal/ModalActions';
import { ItemPedido, ClienteId, FornecedorId, EstoqueId } from '../../types/entities';

interface CriarPedidoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: {
        clienteId: string;
        fornecedorId: string;
        estoqueId?: string;
        itens: ItemPedido[];
        dataPrevistaEntrega: string;
    }) => void;
}

function CriarPedidoModal({ isOpen, onClose, onConfirm }: CriarPedidoModalProps): React.ReactElement {
    const [clienteId, setClienteId] = useState('');
    const [fornecedorId, setFornecedorId] = useState('');
    const [estoqueId, setEstoqueId] = useState('');
    const [itens, setItens] = useState<ItemPedido[]>([{ produtoId: '', quantidade: 0, precoUnitario: 0 }]);
    const [dataPrevistaEntrega, setDataPrevistaEntrega] = useState('');

    const fornecedores: Array<{ id: string; leadTimeMedio: number }> = [
        { id: '1', leadTimeMedio: 7 },
        { id: '2', leadTimeMedio: 14 },
        { id: '3', leadTimeMedio: 5 }
    ];

    const cotacoes: Array<{ produtoId: string; fornecedorId: string; validadeAtiva: boolean }> = [
        { produtoId: '1', fornecedorId: '1', validadeAtiva: true },
        { produtoId: '1', fornecedorId: '2', validadeAtiva: true },
        { produtoId: '2', fornecedorId: '3', validadeAtiva: true },
        { produtoId: '3', fornecedorId: '1', validadeAtiva: false }
    ];

    const calcularDataPrevista = (leadTimeDias: number) => {
        const hoje = new Date();
        const dataPrevista = new Date(hoje);
        dataPrevista.setDate(hoje.getDate() + leadTimeDias);
        return dataPrevista.toISOString().split('T')[0];
    };

    const validarCotacao = (produtoId: string, fornecedorId: string): boolean => {
        const cotacao = cotacoes.find(c => 
            c.produtoId === produtoId && 
            c.fornecedorId === fornecedorId && 
            c.validadeAtiva
        );
        return !!cotacao;
    };

    const handleConfirm = () => {
        const form = document.getElementById('form-criar-pedido') as HTMLFormElement;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const itensValidos = itens.filter(item => item.produtoId && item.quantidade > 0);
        if (itensValidos.length === 0) {
            alert('Adicione pelo menos um item ao pedido');
            return;
        }

        if (!fornecedorId) {
            alert('Selecione um fornecedor');
            return;
        }

        for (const item of itensValidos) {
            if (!validarCotacao(item.produtoId, fornecedorId)) {
                alert(`Não existe cotação válida para o Produto ${item.produtoId} com o fornecedor selecionado`);
                return;
            }
        }

        const fornecedor = fornecedores.find(f => f.id === fornecedorId);
        const dataCalculada = fornecedor ? calcularDataPrevista(fornecedor.leadTimeMedio) : dataPrevistaEntrega;

        onConfirm({ 
            clienteId, 
            fornecedorId, 
            estoqueId: estoqueId || undefined, 
            itens: itensValidos, 
            dataPrevistaEntrega: dataPrevistaEntrega || dataCalculada
        });
        setClienteId('');
        setFornecedorId('');
        setEstoqueId('');
        setItens([{ produtoId: '', quantidade: 0, precoUnitario: 0 }]);
        setDataPrevistaEntrega('');
        onClose();
    };

    const adicionarItem = () => {
        setItens([...itens, { produtoId: '', quantidade: 0, precoUnitario: 0 }]);
    };

    const removerItem = (index: number) => {
        setItens(itens.filter((_, i) => i !== index));
    };

    const atualizarItem = (index: number, campo: keyof ItemPedido, valor: string | number) => {
        const novosItens = [...itens];
        novosItens[index] = { ...novosItens[index], [campo]: valor };
        setItens(novosItens);
    };

    const handleFornecedorChange = (fornecedorId: string) => {
        setFornecedorId(fornecedorId);
        const fornecedor = fornecedores.find(f => f.id === fornecedorId);
        if (fornecedor && !dataPrevistaEntrega) {
            const dataCalculada = calcularDataPrevista(fornecedor.leadTimeMedio);
            setDataPrevistaEntrega(dataCalculada);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Criar Pedido"
            subtitle="Preencha os dados do pedido"
            formId="form-criar-pedido"
            footer={
                <ModalActions
                    onCancel={onClose}
                    onConfirm={handleConfirm}
                />
            }
        >
            <ModalFormField
                label="Cliente"
                type="select"
                placeholder="Selecione o cliente"
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
                options={[
                    { value: '1', label: 'Cliente 1' },
                    { value: '2', label: 'Cliente 2' }
                ]}
                required
            />
            <ModalFormField
                label="Fornecedor"
                type="select"
                placeholder="Selecione o fornecedor"
                value={fornecedorId}
                onChange={(e) => handleFornecedorChange(e.target.value)}
                options={[
                    { value: '1', label: 'Fornecedor 1' },
                    { value: '2', label: 'Fornecedor 2' },
                    { value: '3', label: 'Fornecedor 3' }
                ]}
                required
            />
            <ModalFormField
                label="Estoque (Opcional)"
                type="select"
                placeholder="Selecione o estoque"
                value={estoqueId}
                onChange={(e) => setEstoqueId(e.target.value)}
                options={[
                    { value: '1', label: 'Estoque 1' },
                    { value: '2', label: 'Estoque 2' }
                ]}
            />
            <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>
                    Itens do Pedido
                </label>
                {itens.map((item, index) => (
                    <div key={index} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr 1fr auto', 
                        gap: '8px', 
                        marginBottom: '8px',
                        alignItems: 'end'
                    }}>
                        <ModalFormField
                            label="Produto"
                            type="select"
                            placeholder="Produto"
                            value={item.produtoId}
                            onChange={(e) => atualizarItem(index, 'produtoId', e.target.value)}
                            options={[
                                { value: '1', label: 'Produto 1' },
                                { value: '2', label: 'Produto 2' },
                                { value: '3', label: 'Produto 3' }
                            ]}
                            required
                        />
                        <ModalFormField
                            label="Quantidade"
                            type="number"
                            value={item.quantidade.toString()}
                            onChange={(e) => atualizarItem(index, 'quantidade', parseInt(e.target.value) || 0)}
                            required
                        />
                        <ModalFormField
                            label="Preço Unitário"
                            type="number"
                            step="0.01"
                            value={item.precoUnitario.toString()}
                            onChange={(e) => atualizarItem(index, 'precoUnitario', parseFloat(e.target.value) || 0)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => removerItem(index)}
                            disabled={itens.length === 1}
                            style={{
                                padding: '8px 12px',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: itens.length === 1 ? 'not-allowed' : 'pointer',
                                opacity: itens.length === 1 ? 0.5 : 1
                            }}
                        >
                            ✕
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={adicionarItem}
                    style={{
                        padding: '8px 12px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    + Adicionar Item
                </button>
            </div>
            <ModalFormField
                label="Data Prevista de Entrega"
                type="date"
                value={dataPrevistaEntrega}
                onChange={(e) => setDataPrevistaEntrega(e.target.value)}
                required
            />
            {fornecedorId && (
                <div style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '-8px',
                    marginBottom: '8px'
                }}>
                    Data calculada automaticamente baseada no Lead Time do fornecedor. Você pode editar se necessário.
                </div>
            )}
        </Modal>
    );
}

export default CriarPedidoModal;

