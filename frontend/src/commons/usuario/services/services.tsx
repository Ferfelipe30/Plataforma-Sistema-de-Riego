import api from '../../../api/axios';
import type { Usuario } from '../types/types';
import type { ApiResponse } from '../../../types/types';

export const getUsuarios = async (): Promise<Usuario[]> => {
  const response = await api.get<ApiResponse<Usuario[]>>('/api/usuarios/');
  console.log("response.data", response.data);
  return response.data.data;
};

export const createUsuario = async (usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
  const response = await api.post<ApiResponse<Usuario>>('/api/usuarios/crear/', usuario);
  console.log("response.data", response.data);
  return response.data.data || response.data;
};