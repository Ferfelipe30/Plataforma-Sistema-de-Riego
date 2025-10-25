export interface DataSensor {
    id: number;
    temperatura: number;
    humedad: number;
    nivel_agua: number;
    fecha_registro: string;
    activo: boolean;
}

export interface CreateDataSensorRequest {
    temperatura: number;
    humedad: number;
    nivel_agua: number;
    activo?: boolean;
}

export interface UpdateDataSensorRequest {
    temperatura?: number;
    humedad?: number;
    nivel_agua?: number;
    activo?: boolean;
}

export interface DataSensorListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: DataSensor[];
}

export interface DataSensorFilters {
    fecha_inicio?: string;
    fecha_fin?: string;
    temperatura_min?: number;
    temperatura_max?: number;
    humedad_min?: number;
    humedad_max?: number;
    activo?: boolean;
}

export interface EstadoRiego {
    activo: boolean;
    modo: 'manual' | 'automatico';
    ultima_actualizacion: string;
}

export interface ConfiguracionSistema {
    id: number;
    temperatura_minima: number;
    temperatura_maxima: number;
    humedad_minima: number;
    humedad_maxima: number;
    nivel_agua_minimo: number;
    riego_automatico: boolean;
}