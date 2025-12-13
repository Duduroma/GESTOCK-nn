import api from './api';

interface LoginRequest {
    email: string;
    senha: string;
}

interface LoginResponse {
    token: string;
    message: string;
}

export const authService = {
    login: async (email: string, senha: string): Promise<LoginResponse> => {
        try {
            const response = await api.post('/auth/login', { email, senha });

            if (response.data && response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }
            
            return response;
        } catch (error: any) {
            throw error;
        }
    },

    logout: (): void => {
        localStorage.removeItem('authToken');
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('authToken');
    },

    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    }
};

export default authService;

