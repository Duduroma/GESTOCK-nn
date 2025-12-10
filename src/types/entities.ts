export type ProdutoId = string;
export type ClienteId = string;
export type EstoqueId = string;
export type FornecedorId = string;
export type PedidoId = string;
export type AlertaId = string;
export type CotacaoId = string;

export enum StatusPedido {
    CRIADO = 'CRIADO',
    ENVIADO = 'ENVIADO',
    EM_TRANSPORTE = 'EM_TRANSPORTE',
    RECEBIDO = 'RECEBIDO',
    CANCELADO = 'CANCELADO',
    CONCLUIDO = 'CONCLUIDO'
}

export enum TipoMovimentacao {
    ENTRADA = 'ENTRADA',
    SAIDA = 'SAIDA'
}

export enum TipoReservaRegistro {
    RESERVA = 'RESERVA',
    LIBERACAO = 'LIBERACAO'
}

export interface Produto {
    id: ProdutoId;
    codigo: string;
    nome: string;
    unidadePeso: string;
    peso: number;
    perecivel: boolean;
    ativo: boolean;
}

export interface Cliente {
    id: ClienteId;
    nome: string;
    documento: string;
    email: string;
    estoques?: Estoque[];
}

export interface SaldoProduto {
    fisico: number;
    reservado: number;
    disponivel: number;
}

export interface ROP {
    consumoMedio: number;
    leadTimeDias: number;
    estoqueSeguranca: number;
    valorROP: number;
}

export interface Estoque {
    id: EstoqueId;
    clienteId: ClienteId;
    nome: string;
    endereco: string;
    capacidade: number;
    ativo: boolean;
    saldos?: Record<ProdutoId, SaldoProduto>;
    rops?: Record<ProdutoId, ROP>;
    movimentacoes?: Movimentacao[];
    reservas?: ReservaRegistro[];
}

export interface LeadTime {
    dias: number;
}

export interface Cotacao {
    id: CotacaoId;
    produtoId: ProdutoId;
    preco: number;
    prazoDias: number;
    validadeAtiva: boolean;
}

export interface Fornecedor {
    id: FornecedorId;
    nome: string;
    cnpj: string;
    contato: string;
    leadTimeMedio: LeadTime;
    ativo: boolean;
    cotacoes?: Record<ProdutoId, Cotacao>;
}

export interface ItemPedido {
    produtoId: ProdutoId;
    quantidade: number;
    precoUnitario: number;
    subtotal?: number;
}

export interface CustoPedido {
    valorItens: number;
    frete: number;
    custosLogisticos: number;
    valorTotal?: number;
}

export interface Pedido {
    id: PedidoId;
    clienteId: ClienteId;
    fornecedorId: FornecedorId;
    dataCriacao: string;
    dataPrevistaEntrega: string;
    estoqueId?: EstoqueId;
    itens: ItemPedido[];
    custo?: CustoPedido;
    status: StatusPedido;
}

export interface Alerta {
    id: AlertaId;
    produtoId: ProdutoId;
    estoqueId: EstoqueId;
    dataGeracao: string;
    fornecedorSugerido?: FornecedorId;
    ativo: boolean;
}

export interface Movimentacao {
    id: number;
    tipo: TipoMovimentacao;
    produtoId: ProdutoId;
    quantidade: number;
    dataHora: string;
    responsavel: string;
    motivo: string;
    meta?: Record<string, string>;
}

export interface ReservaRegistro {
    produtoId: ProdutoId;
    quantidade: number;
    dataHora: string;
    tipo: TipoReservaRegistro;
}

export interface Transferencia {
    id: number;
    produtoId: ProdutoId;
    estoqueOrigemId: EstoqueId;
    estoqueDestinoId: EstoqueId;
    quantidade: number;
    dataHora: string;
    responsavel: string;
    motivo: string;
}

export interface LoteValidade {
    lote: string;
    validade: string;
}

export interface CodigoProduto {
    valor: string;
}

