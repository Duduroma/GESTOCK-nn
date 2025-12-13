import api from './api';
import { Fornecedor, FornecedorId, ProdutoId, Cotacao, CotacaoId, LeadTime } from '../types/entities';

interface ListFornecedoresParams extends Record<string, string | number | boolean | undefined> {
    ativo?: boolean;
    page?: number;
    size?: number;
}

interface CreateFornecedorData {
    nome: string;
    cnpj: string;
    contato: string;
    leadTimeMedio: LeadTime;
    ativo: boolean;
}

interface UpdateFornecedorData {
    nome?: string;
    contato?: string;
    leadTimeMedio?: LeadTime;
}

interface CreateCotacaoData {
    produtoId: ProdutoId;
    preco: number;
    prazoDias: number;
    validadeAtiva: boolean;
}

interface UpdateCotacaoData {
    preco?: number;
    prazoDias?: number;
    validadeAtiva?: boolean;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const fornecedoresService = {
    listar: async (params?: ListFornecedoresParams): Promise<PaginatedResponse<Fornecedor>> => {
        console.log('📡 [fornecedoresService] listar() - Parâmetros:', params);
        const response = await api.get('/fornecedores', params);
        console.log('✅ [fornecedoresService] listar() - Resposta recebida:', response);
        console.log('📊 [fornecedoresService] Tipo da resposta:', Array.isArray(response) ? 'Array' : typeof response);
        if (Array.isArray(response)) {
            console.log('📦 [fornecedoresService] Array com', response.length, 'itens');
            if (response.length > 0) {
                console.log('📋 [fornecedoresService] Primeiro item:', response[0]);
            }
        } else if (response && typeof response === 'object') {
            console.log('📦 [fornecedoresService] Objeto - keys:', Object.keys(response));
            if ('content' in response) {
                console.log('📦 [fornecedoresService] Content array com', (response as any).content?.length || 0, 'itens');
            }
        }
        return response;
    },

    buscarPorId: async (id: FornecedorId): Promise<Fornecedor> => {
        console.log('📡 [fornecedoresService] buscarPorId() - ID:', id);
        const response = await api.get(`/fornecedores/${id}`);
        console.log('✅ [fornecedoresService] buscarPorId() - Resposta:', response);
        return response;
    },

    criar: async (data: CreateFornecedorData): Promise<Fornecedor> => {
        console.log('📡 [fornecedoresService] criar() - Dados enviados:', JSON.stringify(data, null, 2));
        console.log('📝 [fornecedoresService] criar() - Estrutura leadTimeMedio:', data.leadTimeMedio);
        const response = await api.post('/fornecedores', data);
        console.log('✅ [fornecedoresService] criar() - Resposta recebida:', response);
        console.log('📊 [fornecedoresService] criar() - Status da resposta:', response ? 'OK' : 'VAZIO');
        return response;
    },

    atualizar: async (id: FornecedorId, data: UpdateFornecedorData): Promise<Fornecedor> => {
        console.log('📡 [fornecedoresService] atualizar() - ID:', id);
        console.log('📡 [fornecedoresService] atualizar() - Dados enviados:', JSON.stringify(data, null, 2));
        const response = await api.put(`/fornecedores/${id}`, data);
        console.log('✅ [fornecedoresService] atualizar() - Resposta recebida:', response);
        return response;
    },

    inativar: async (id: FornecedorId): Promise<void> => {
        console.log('📡 [fornecedoresService] inativar() - ID:', id);
        const response = await api.patch(`/fornecedores/${id}/inativar`);
        console.log('✅ [fornecedoresService] inativar() - Resposta:', response);
    },

    ativar: async (id: FornecedorId): Promise<void> => {
        console.log('📡 [fornecedoresService] ativar() - ID:', id);
        const response = await api.patch(`/fornecedores/${id}/ativar`);
        console.log('✅ [fornecedoresService] ativar() - Resposta:', response);
    },

    registrarCotacao: async (fornecedorId: FornecedorId, data: CreateCotacaoData): Promise<Cotacao> => {
        return api.post(`/fornecedores/${fornecedorId}/cotacao`, data);
    },

    atualizarCotacao: async (fornecedorId: FornecedorId, cotacaoId: CotacaoId, data: UpdateCotacaoData): Promise<Cotacao> => {
        return api.put(`/fornecedores/${fornecedorId}/cotacoes/${cotacaoId}`, data);
    },

    removerCotacao: async (fornecedorId: FornecedorId, cotacaoId: CotacaoId): Promise<void> => {
        return api.delete(`/fornecedores/${fornecedorId}/cotacoes/${cotacaoId}`);
    },

    obterMelhorCotacao: async (produtoId: ProdutoId): Promise<Cotacao & { fornecedorId: FornecedorId }> => {
        return api.get(`/fornecedores/melhor-cotacao/${produtoId}`);
    },
};

