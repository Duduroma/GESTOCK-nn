import {
    Estoque,
    Produto,
    Fornecedor,
    Pedido,
    Cotacao,
    Alerta,
    Movimentacao,
    Transferencia,
    ReservaRegistro,
    StatusPedido,
    TipoMovimentacao,
    TipoReservaRegistro,
    Cliente
} from '../types/entities';

export const mockClientes: Cliente[] = [
    {
        id: '1',
        nome: 'Empresa ABC Ltda',
        documento: '12.345.678/0001-90',
        email: 'contato@empresaabc.com.br'
    },
    {
        id: '2',
        nome: 'Comércio XYZ S.A.',
        documento: '98.765.432/0001-10',
        email: 'contato@comercioxyz.com.br'
    },
    {
        id: '3',
        nome: 'Distribuidora Norte Sul',
        documento: '11.222.333/0001-44',
        email: 'contato@nortesul.com.br'
    }
];

export const mockEstoques: Estoque[] = [
    {
        id: '1',
        clienteId: '1',
        nome: 'Estoque Central',
        endereco: 'Rua das Flores, 100 - São Paulo, SP',
        capacidade: 10000,
        ativo: true,
        saldos: {
            '1': { fisico: 5000, reservado: 1500, disponivel: 3500 },
            '2': { fisico: 2500, reservado: 0, disponivel: 2500 },
            '3': { fisico: 1800, reservado: 800, disponivel: 1000 },
            '4': { fisico: 3200, reservado: 0, disponivel: 3200 }
        },
        rops: {
            '1': {
                consumoMedio: 150,
                leadTimeDias: 7,
                estoqueSeguranca: 300,
                valorROP: 1350
            },
            '2': {
                consumoMedio: 5,
                leadTimeDias: 10,
                estoqueSeguranca: 20,
                valorROP: 70
            },
            '3': {
                consumoMedio: 25,
                leadTimeDias: 5,
                estoqueSeguranca: 50,
                valorROP: 175
            }
        }
    },
    {
        id: '2',
        clienteId: '1',
        nome: 'Estoque Filial Norte',
        endereco: 'Av. Paulista, 200 - Guarulhos, SP',
        capacidade: 5000,
        ativo: true,
        saldos: {
            '1': { fisico: 2000, reservado: 0, disponivel: 2000 },
            '2': { fisico: 800, reservado: 200, disponivel: 600 }
        },
        rops: {
            '1': {
                consumoMedio: 80,
                leadTimeDias: 7,
                estoqueSeguranca: 200,
                valorROP: 760
            }
        }
    },
    {
        id: '3',
        clienteId: '2',
        nome: 'Estoque Temporário',
        endereco: 'Rua Comercial, 300 - Osasco, SP',
        capacidade: 2000,
        ativo: false,
        saldos: {},
        rops: {}
    },
    {
        id: '4',
        clienteId: '1',
        nome: 'Estoque Filial Sul',
        endereco: 'Rua Industrial, 450 - Campinas, SP',
        capacidade: 8000,
        ativo: true,
        saldos: {
            '1': { fisico: 3500, reservado: 500, disponivel: 3000 },
            '4': { fisico: 1200, reservado: 0, disponivel: 1200 }
        },
        rops: {
            '1': {
                consumoMedio: 120,
                leadTimeDias: 7,
                estoqueSeguranca: 250,
                valorROP: 1090
            }
        }
    }
];

export const mockProdutos: Produto[] = [
    {
        id: '1',
        codigo: 'PROD001',
        nome: 'Parafuso M6 x 20mm',
        unidadePeso: 'g',
        peso: 5.2,
        perecivel: false,
        ativo: true
    },
    {
        id: '2',
        codigo: 'PROD002',
        nome: 'Tinta Acrílica Branca',
        unidadePeso: 'kg',
        peso: 18.0,
        perecivel: false,
        ativo: true
    },
    {
        id: '3',
        codigo: 'PROD003',
        nome: 'Cabo Elétrico 2.5mm²',
        unidadePeso: 'kg',
        peso: 0.5,
        perecivel: false,
        ativo: true
    },
    {
        id: '4',
        codigo: 'PROD004',
        nome: 'Tinta Esmalte Vermelho',
        unidadePeso: 'kg',
        peso: 3.5,
        perecivel: false,
        ativo: true
    },
    {
        id: '5',
        codigo: 'PROD005',
        nome: 'Parafuso M8 x 30mm',
        unidadePeso: 'g',
        peso: 8.5,
        perecivel: false,
        ativo: true
    },
    {
        id: '6',
        codigo: 'PROD006',
        nome: 'Porca M6',
        unidadePeso: 'g',
        peso: 2.1,
        perecivel: false,
        ativo: true
    },
    {
        id: '7',
        codigo: 'PROD007',
        nome: 'Arruela Plana M6',
        unidadePeso: 'g',
        peso: 0.8,
        perecivel: false,
        ativo: false
    }
];

export const mockFornecedores: Fornecedor[] = [
    {
        id: '1',
        nome: 'Fornecedor ABC Materiais',
        cnpj: '12.345.678/0001-90',
        contato: '(11) 99999-9999',
        leadTimeMedio: { dias: 7 },
        ativo: true,
        cotacoes: {
            '1': {
                id: '1',
                produtoId: '1',
                preco: 0.50,
                prazoDias: 7,
                validadeAtiva: true
            },
            '3': {
                id: '3',
                produtoId: '3',
                preco: 12.50,
                prazoDias: 7,
                validadeAtiva: true
            }
        }
    },
    {
        id: '2',
        nome: 'Fornecedor XYZ Industrial',
        cnpj: '98.765.432/0001-10',
        contato: '(11) 88888-8888',
        leadTimeMedio: { dias: 14 },
        ativo: true,
        cotacoes: {
            '1': {
                id: '2',
                produtoId: '1',
                preco: 0.45,
                prazoDias: 5,
                validadeAtiva: true
            },
            '2': {
                id: '4',
                produtoId: '2',
                preco: 85.00,
                prazoDias: 10,
                validadeAtiva: true
            }
        }
    },
    {
        id: '3',
        nome: 'Fornecedor Premium Ltda',
        cnpj: '11.222.333/0001-44',
        contato: '(11) 77777-7777',
        leadTimeMedio: { dias: 5 },
        ativo: true,
        cotacoes: {
            '2': {
                id: '5',
                produtoId: '2',
                preco: 82.00,
                prazoDias: 8,
                validadeAtiva: true
            },
            '4': {
                id: '6',
                produtoId: '4',
                preco: 45.00,
                prazoDias: 6,
                validadeAtiva: true
            }
        }
    },
    {
        id: '4',
        nome: 'Fornecedor Temporário',
        cnpj: '55.666.777/0001-88',
        contato: '(11) 66666-6666',
        leadTimeMedio: { dias: 10 },
        ativo: false,
        cotacoes: {}
    }
];

export const mockCotacoes: Cotacao[] = [
    {
        id: '1',
        produtoId: '1',
        preco: 0.50,
        prazoDias: 7,
        validadeAtiva: true
    },
    {
        id: '2',
        produtoId: '1',
        preco: 0.45,
        prazoDias: 5,
        validadeAtiva: true
    },
    {
        id: '3',
        produtoId: '2',
        preco: 85.00,
        prazoDias: 10,
        validadeAtiva: true
    },
    {
        id: '4',
        produtoId: '2',
        preco: 82.00,
        prazoDias: 8,
        validadeAtiva: true
    },
    {
        id: '5',
        produtoId: '3',
        preco: 12.50,
        prazoDias: 7,
        validadeAtiva: true
    },
    {
        id: '6',
        produtoId: '4',
        preco: 45.00,
        prazoDias: 6,
        validadeAtiva: true
    },
    {
        id: '7',
        produtoId: '5',
        preco: 0.65,
        prazoDias: 7,
        validadeAtiva: false
    },
    {
        id: '8',
        produtoId: '6',
        preco: 0.25,
        prazoDias: 5,
        validadeAtiva: true
    }
];

export const mockPedidos: Pedido[] = [
    {
        id: '1',
        clienteId: '1',
        fornecedorId: '2',
        dataCriacao: '2025-10-15',
        dataPrevistaEntrega: '2025-10-21',
        estoqueId: '1',
        itens: [
            { produtoId: '1', quantidade: 10000, precoUnitario: 0.50 }
        ],
        custo: {
            valorItens: 5000.00,
            frete: 200.00,
            custosLogisticos: 100.00,
            valorTotal: 5300.00
        },
        status: StatusPedido.RECEBIDO
    },
    {
        id: '2',
        clienteId: '1',
        fornecedorId: '3',
        dataCriacao: '2025-10-20',
        dataPrevistaEntrega: '2025-10-26',
        estoqueId: '1',
        itens: [
            { produtoId: '2', quantidade: 50, precoUnitario: 85.00 }
        ],
        custo: {
            valorItens: 4250.00,
            frete: 150.00,
            custosLogisticos: 80.00,
            valorTotal: 4480.00
        },
        status: StatusPedido.ENVIADO
    },
    {
        id: '3',
        clienteId: '1',
        fornecedorId: '1',
        dataCriacao: '2025-10-18',
        dataPrevistaEntrega: '2025-10-23',
        estoqueId: '2',
        itens: [
            { produtoId: '1', quantidade: 5000, precoUnitario: 0.45 }
        ],
        status: StatusPedido.CRIADO
    },
    {
        id: '4',
        clienteId: '1',
        fornecedorId: '2',
        dataCriacao: '2025-10-22',
        dataPrevistaEntrega: '2025-10-27',
        estoqueId: '1',
        itens: [
            { produtoId: '3', quantidade: 200, precoUnitario: 12.50 },
            { produtoId: '4', quantidade: 30, precoUnitario: 45.00 }
        ],
        status: StatusPedido.EM_TRANSPORTE
    },
    {
        id: '5',
        clienteId: '2',
        fornecedorId: '1',
        dataCriacao: '2025-10-10',
        dataPrevistaEntrega: '2025-10-17',
        estoqueId: '3',
        itens: [
            { produtoId: '5', quantidade: 8000, precoUnitario: 0.65 }
        ],
        status: StatusPedido.CANCELADO
    }
];

export const mockAlertas: Alerta[] = [
    {
        id: '1',
        produtoId: '1',
        estoqueId: '2',
        dataGeracao: '2025-10-18T10:00:00',
        fornecedorSugerido: '2',
        ativo: true
    },
    {
        id: '2',
        produtoId: '2',
        estoqueId: '1',
        dataGeracao: '2025-10-19T11:00:00',
        fornecedorSugerido: '3',
        ativo: true
    },
    {
        id: '3',
        produtoId: '3',
        estoqueId: '2',
        dataGeracao: '2025-10-20T09:00:00',
        fornecedorSugerido: '1',
        ativo: true
    },
    {
        id: '4',
        produtoId: '5',
        estoqueId: '1',
        dataGeracao: '2025-10-21T14:30:00',
        fornecedorSugerido: '2',
        ativo: true
    },
    {
        id: '5',
        produtoId: '6',
        estoqueId: '4',
        dataGeracao: '2025-10-22T08:15:00',
        fornecedorSugerido: '3',
        ativo: false
    }
];

export const mockMovimentacoes: Movimentacao[] = [
    {
        id: 1,
        tipo: TipoMovimentacao.ENTRADA,
        produtoId: '1',
        quantidade: 3500,
        dataHora: '2025-10-22T10:00:00',
        responsavel: 'Carlos Mendes',
        motivo: 'Recebimento de Pedido #1',
        meta: { pedidoId: '1', lote: 'LOTE001' }
    },
    {
        id: 2,
        tipo: TipoMovimentacao.SAIDA,
        produtoId: '2',
        quantidade: 850,
        dataHora: '2025-10-21T14:30:00',
        responsavel: 'Ana Paula',
        motivo: 'Venda ao Cliente',
        meta: { vendaId: 'V001' }
    },
    {
        id: 3,
        tipo: TipoMovimentacao.ENTRADA,
        produtoId: '3',
        quantidade: 2200,
        dataHora: '2025-10-20T09:15:00',
        responsavel: 'Roberto Alves',
        motivo: 'Recebimento de Pedido #4',
        meta: { pedidoId: '4' }
    },
    {
        id: 4,
        tipo: TipoMovimentacao.SAIDA,
        produtoId: '4',
        quantidade: 35,
        dataHora: '2025-10-19T16:45:00',
        responsavel: 'Fernanda Lima',
        motivo: 'Transferência para Filial',
        meta: { transferenciaId: '1' }
    },
    {
        id: 5,
        tipo: TipoMovimentacao.ENTRADA,
        produtoId: '1',
        quantidade: 8000,
        dataHora: '2025-10-18T11:20:00',
        responsavel: 'Carlos Mendes',
        motivo: 'Recebimento de Pedido #2',
        meta: { pedidoId: '2' }
    },
    {
        id: 6,
        tipo: TipoMovimentacao.SAIDA,
        produtoId: '1',
        quantidade: 1500,
        dataHora: '2025-10-17T13:00:00',
        responsavel: 'João Silva',
        motivo: 'Consumo Interno',
        meta: {}
    },
    {
        id: 7,
        tipo: TipoMovimentacao.ENTRADA,
        produtoId: '2',
        quantidade: 50,
        dataHora: '2025-10-16T08:30:00',
        responsavel: 'Maria Santos',
        motivo: 'Recebimento de Pedido #3',
        meta: { pedidoId: '3' }
    }
];

export const mockTransferencias: Transferencia[] = [
    {
        id: 1,
        produtoId: '1',
        estoqueOrigemId: '1',
        estoqueDestinoId: '2',
        quantidade: 1800,
        dataHora: '2025-10-22T10:00:00',
        responsavel: 'Roberto Alves',
        motivo: 'Transferência entre filiais'
    },
    {
        id: 2,
        produtoId: '2',
        estoqueOrigemId: '1',
        estoqueDestinoId: '4',
        quantidade: 650,
        dataHora: '2025-10-21T14:30:00',
        responsavel: 'Ana Paula',
        motivo: 'Reabastecimento'
    },
    {
        id: 3,
        produtoId: '3',
        estoqueOrigemId: '2',
        estoqueDestinoId: '1',
        quantidade: 1200,
        dataHora: '2025-10-20T09:15:00',
        responsavel: 'Carlos Mendes',
        motivo: 'Consolidação de estoque'
    },
    {
        id: 4,
        produtoId: '1',
        estoqueOrigemId: '4',
        estoqueDestinoId: '1',
        quantidade: 500,
        dataHora: '2025-10-19T11:00:00',
        responsavel: 'Fernanda Lima',
        motivo: 'Equilíbrio de estoque'
    }
];

export const mockReservas: ReservaRegistro[] = [
    {
        produtoId: '1',
        quantidade: 8500,
        dataHora: '2025-10-17T10:00:00',
        tipo: TipoReservaRegistro.RESERVA
    },
    {
        produtoId: '2',
        quantidade: 1200,
        dataHora: '2025-10-18T11:00:00',
        tipo: TipoReservaRegistro.RESERVA
    },
    {
        produtoId: '3',
        quantidade: 3800,
        dataHora: '2025-10-12T09:00:00',
        tipo: TipoReservaRegistro.LIBERACAO
    },
    {
        produtoId: '4',
        quantidade: 75,
        dataHora: '2025-10-11T14:00:00',
        tipo: TipoReservaRegistro.LIBERACAO
    },
    {
        produtoId: '1',
        quantidade: 6000,
        dataHora: '2025-10-09T08:00:00',
        tipo: TipoReservaRegistro.LIBERACAO
    },
    {
        produtoId: '5',
        quantidade: 2000,
        dataHora: '2025-10-22T15:00:00',
        tipo: TipoReservaRegistro.RESERVA
    },
    {
        produtoId: '6',
        quantidade: 500,
        dataHora: '2025-10-21T10:30:00',
        tipo: TipoReservaRegistro.RESERVA
    }
];

