import api from './api';
import { Cliente, ClienteId } from '../types/entities';

interface ListClientesParams extends Record<string, string | number | boolean | undefined> {
    nome?: string;
    documento?: string;
    page?: number;
    size?: number;
}

interface CreateClienteData {
    nome: string;
    documento: string;
    email: string;
    senha: string;
}

interface UpdateClienteData {
    nome?: string;
    email?: string;
}

interface PaginatedResponse<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    page: number;
    size: number;
}

export const clientesService = {
    listar: async (params?: ListClientesParams): Promise<Cliente[] | PaginatedResponse<Cliente>> => {
        console.log('📋 [ClientesService] Listando clientes com params:', params);
        try {
            const response = await api.get('/clientes', params);
            console.log('✅ [ClientesService] Resposta recebida:', response);
            console.log('📦 [ClientesService] Tipo da resposta:', typeof response);
            console.log('📦 [ClientesService] É array?', Array.isArray(response));
            if (response && typeof response === 'object') {
                console.log('📦 [ClientesService] Keys da resposta:', Object.keys(response));
                if (Array.isArray(response)) {
                    console.log('📦 [ClientesService] Total de clientes (array):', response.length);
                } else if ('content' in response) {
                    console.log('📦 [ClientesService] Content:', response.content);
                    console.log('📦 [ClientesService] Total de clientes (paginado):', response.content?.length || 0);
                }
            }
            return response;
        } catch (error: any) {
            console.error('❌ [ClientesService] Erro ao listar clientes:', error);
            console.error('❌ [ClientesService] Detalhes do erro:', {
                message: error?.message,
                status: error?.response?.status,
                data: error?.response?.data,
                stack: error?.stack
            });
            throw error;
        }
    },

    buscarPorId: async (id: ClienteId): Promise<Cliente> => {
        return api.get(`/clientes/${id}`);
    },

    criar: async (data: CreateClienteData): Promise<Cliente> => {
        return api.post('/clientes', data);
    },

    atualizar: async (id: ClienteId, data: UpdateClienteData): Promise<Cliente> => {
        return api.put(`/clientes/${id}`, data);
    },
};

