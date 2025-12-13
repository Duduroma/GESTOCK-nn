import api from './api';

interface LoginRequest {
    email: string;
    senha: string;
}

interface LoginResponse {
    token: string;
    nome: string;
    email: string;
    message: string;
}

export const authService = {
    login: async (email: string, senha: string): Promise<LoginResponse> => {
        try {
            const response = await api.post('/auth/login', { email, senha });
            console.log('🔑 [Auth] Resposta do login:', response);

            if (response && response.token) {
                localStorage.setItem('authToken', response.token);
                if (response.nome) {
                    localStorage.setItem('userName', response.nome);
                }
                if (response.email) {
                    localStorage.setItem('userEmail', response.email);
                }
                console.log('✅ [Auth] Token e dados do usuário salvos no localStorage');
            } else {
                console.error('❌ [Auth] Token não encontrado na resposta:', response);
            }
            
            return response;
        } catch (error: any) {
            console.error('❌ [Auth] Erro no login:', error);
            throw error;
        }
    },

    logout: (): void => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },

    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    },

    getUserName: (): string | null => {
        return localStorage.getItem('userName');
    },

    getUserEmail: (): string | null => {
        return localStorage.getItem('userEmail');
    }
};

export default authService;

