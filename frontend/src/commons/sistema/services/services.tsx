import axios from '../../../api/axios';
import type { 
    DataSensor, 
    CreateDataSensorRequest, 
    UpdateDataSensorRequest,
    DataSensorListResponse,
    DataSensorFilters,
    EstadoRiego,
    ConfiguracionSistema
} from '../types/types';

export const getDataSensorsService = async (
    filters?: DataSensorFilters,
    page: number = 1,
    pageSize: number = 10
): Promise<DataSensorListResponse> => {
    try {
        const params: any = {
            page,
            page_size: pageSize,
        };

        if (filters) {
            if (filters.fecha_inicio) params.fecha_inicio = filters.fecha_inicio;
            if (filters.fecha_fin) params.fecha_fin = filters.fecha_fin;
            if (filters.temperatura_min !== undefined) params.temperatura_min = filters.temperatura_min;
            if (filters.temperatura_max !== undefined) params.temperatura_max = filters.temperatura_max;
            if (filters.humedad_min !== undefined) params.humedad_min = filters.humedad_min;
            if (filters.humedad_max !== undefined) params.humedad_max = filters.humedad_max;
            if (filters.activo !== undefined) params.activo = filters.activo;
        }

        const response = await axios.get<DataSensorListResponse>('/api/data-sensor/', { params });
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al obtener datos de sensores');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const getDataSensorByIdService = async (id: number): Promise<DataSensor> => {
    try {
        const response = await axios.get<DataSensor>(`/api/data-sensor/${id}/`);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al obtener el sensor');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

// Crear nuevo registro de sensor
export const createDataSensorService = async (data: CreateDataSensorRequest): Promise<DataSensor> => {
    try {
        const response = await axios.post<DataSensor>('/api/data-sensor/', data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al crear el registro del sensor');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const updateDataSensorService = async (
    id: number, 
    data: UpdateDataSensorRequest
): Promise<DataSensor> => {
    try {
        const response = await axios.put<DataSensor>(`/api/data-sensor/${id}/`, data);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al actualizar el sensor');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const deleteDataSensorService = async (id: number): Promise<void> => {
    try {
        await axios.delete(`/api/data-sensor/${id}/`);
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al eliminar el sensor');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const getLatestDataSensorService = async (): Promise<DataSensor> => {
    try {
        const response = await axios.get<DataSensor>('/api/data-sensor/latest/');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al obtener último registro');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const getEstadoRiegoService = async (): Promise<EstadoRiego> => {
    try {
        const response = await axios.get<EstadoRiego>('/api/estado-riego/');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al obtener estado del riego');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const updateEstadoRiegoService = async (estado: Partial<EstadoRiego>): Promise<EstadoRiego> => {
    try {
        const response = await axios.post<EstadoRiego>('/api/estado-riego/', estado);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al actualizar estado del riego');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const getConfiguracionSistemaService = async (): Promise<ConfiguracionSistema> => {
    try {
        const response = await axios.get<ConfiguracionSistema>('/api/configuracion-sistema/');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al obtener configuración');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};

export const updateConfiguracionSistemaService = async (
    id: number,
    config: Partial<ConfiguracionSistema>
): Promise<ConfiguracionSistema> => {
    try {
        const response = await axios.put<ConfiguracionSistema>(`/api/configuracion-sistema/${id}/`, config);
        return response.data;
    } catch (error: any) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Error al actualizar configuración');
        } else if (error.request) {
            throw new Error('No se pudo conectar con el servidor');
        } else {
            throw new Error('Error al procesar la solicitud');
        }
    }
};