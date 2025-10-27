import axios from '../../../api/axios';
import type { DataSensor } from '../types/types';
import type { ApiResponse } from '../../../types/types';


export const getSistema = async (): Promise<ApiResponse<DataSensor[]>> => {
    try {
        const response = await axios.get<ApiResponse<DataSensor[]>>('/api/data/');
        return response.data;      
    } catch (error: any) {
        throw {
            success: false,
            data: [],
            detail: error?.response?.data?.detail || 'Error al obtener los datos del sistema',
        } as ApiResponse<DataSensor[]>;
    }
};

export const createSistema = async (data: Omit<DataSensor, 'id'>): Promise<ApiResponse<DataSensor>> => {
    const response = await axios.post<ApiResponse<DataSensor>>('/api/data/crear/', data);
    console.log(response.data);
    return response.data;
};