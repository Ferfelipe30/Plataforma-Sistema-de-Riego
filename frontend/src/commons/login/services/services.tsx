import axios from '../../../api/axios';
import type { LoginRequest, LoginResponse } from '../types/types';

export const loginService = async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
        const response = await axios.post<LoginResponse>('/api/login/', credentials);

        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', JSON.stringify(response.data.user));
        }

        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Credenciales invalidas');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const logoutService = async (): Promise<void> => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};