import { useState, useCallback } from 'react';
import {
    getDataSensorsService,
    getDataSensorByIdService,
    createDataSensorService,
    updateDataSensorService,
    deleteDataSensorService,
    getLatestDataSensorService,
    getEstadoRiegoService,
    updateEstadoRiegoService,
    getConfiguracionSistemaService,
    updateConfiguracionSistemaService
} from '../services/services';
import type {
    DataSensor,
    CreateDataSensorRequest,
    UpdateDataSensorRequest,
    DataSensorFilters,
    EstadoRiego,
    ConfiguracionSistema
} from '../types/types';

interface UseSistemaReturn {
    // Estados
    sensors: DataSensor[];
    currentSensor: DataSensor | null;
    latestSensor: DataSensor | null;
    estadoRiego: EstadoRiego | null;
    configuracion: ConfiguracionSistema | null;
    loading: boolean;
    error: string | null;
    pagination: {
        count: number;
        next: string | null;
        previous: string | null;
        currentPage: number;
        pageSize: number;
    };

    // Métodos para sensores
    fetchSensors: (filters?: DataSensorFilters, page?: number, pageSize?: number) => Promise<void>;
    fetchSensorById: (id: number) => Promise<void>;
    createSensor: (data: CreateDataSensorRequest) => Promise<DataSensor | null>;
    updateSensor: (id: number, data: UpdateDataSensorRequest) => Promise<DataSensor | null>;
    deleteSensor: (id: number) => Promise<boolean>;
    fetchLatestSensor: () => Promise<void>;

    // Métodos para estado de riego
    fetchEstadoRiego: () => Promise<void>;
    updateEstadoRiego: (estado: Partial<EstadoRiego>) => Promise<EstadoRiego | null>;

    // Métodos para configuración
    fetchConfiguracion: () => Promise<void>;
    updateConfiguracion: (id: number, config: Partial<ConfiguracionSistema>) => Promise<ConfiguracionSistema | null>;

    // Utilidades
    resetError: () => void;
    setCurrentPage: (page: number) => void;
    setPageSize: (size: number) => void;
}

export default function useSistema(): UseSistemaReturn {
    const [sensors, setSensors] = useState<DataSensor[]>([]);
    const [currentSensor, setCurrentSensor] = useState<DataSensor | null>(null);
    const [latestSensor, setLatestSensor] = useState<DataSensor | null>(null);
    const [estadoRiego, setEstadoRiego] = useState<EstadoRiego | null>(null);
    const [configuracion, setConfiguracion] = useState<ConfiguracionSistema | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        count: 0,
        next: null as string | null,
        previous: null as string | null,
        currentPage: 1,
        pageSize: 10,
    });

    // Obtener lista de sensores
    const fetchSensors = useCallback(async (
        filters?: DataSensorFilters,
        page: number = pagination.currentPage,
        pageSize: number = pagination.pageSize
    ) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getDataSensorsService(filters, page, pageSize);
            setSensors(response.results);
            setPagination({
                count: response.count,
                next: response.next,
                previous: response.previous,
                currentPage: page,
                pageSize,
            });
        } catch (e: any) {
            setError(e?.message ?? 'Error al obtener sensores');
        } finally {
            setLoading(false);
        }
    }, [pagination.currentPage, pagination.pageSize]);

    // Obtener sensor por ID
    const fetchSensorById = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const sensor = await getDataSensorByIdService(id);
            setCurrentSensor(sensor);
        } catch (e: any) {
            setError(e?.message ?? 'Error al obtener el sensor');
        } finally {
            setLoading(false);
        }
    }, []);

    // Crear sensor
    const createSensor = useCallback(async (data: CreateDataSensorRequest): Promise<DataSensor | null> => {
        setLoading(true);
        setError(null);
        try {
            const newSensor = await createDataSensorService(data);
            setSensors(prev => [newSensor, ...prev]);
            return newSensor;
        } catch (e: any) {
            setError(e?.message ?? 'Error al crear el sensor');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Actualizar sensor
    const updateSensor = useCallback(async (
        id: number,
        data: UpdateDataSensorRequest
    ): Promise<DataSensor | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedSensor = await updateDataSensorService(id, data);
            setSensors(prev => prev.map(s => s.id === id ? updatedSensor : s));
            if (currentSensor?.id === id) {
                setCurrentSensor(updatedSensor);
            }
            return updatedSensor;
        } catch (e: any) {
            setError(e?.message ?? 'Error al actualizar el sensor');
            return null;
        } finally {
            setLoading(false);
        }
    }, [currentSensor]);

    // Eliminar sensor
    const deleteSensor = useCallback(async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);
        try {
            await deleteDataSensorService(id);
            setSensors(prev => prev.filter(s => s.id !== id));
            if (currentSensor?.id === id) {
                setCurrentSensor(null);
            }
            return true;
        } catch (e: any) {
            setError(e?.message ?? 'Error al eliminar el sensor');
            return false;
        } finally {
            setLoading(false);
        }
    }, [currentSensor]);

    // Obtener último sensor
    const fetchLatestSensor = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const sensor = await getLatestDataSensorService();
            setLatestSensor(sensor);
        } catch (e: any) {
            setError(e?.message ?? 'Error al obtener último registro');
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener estado de riego
    const fetchEstadoRiego = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const estado = await getEstadoRiegoService();
            setEstadoRiego(estado);
        } catch (e: any) {
            setError(e?.message ?? 'Error al obtener estado de riego');
        } finally {
            setLoading(false);
        }
    }, []);

    // Actualizar estado de riego
    const updateEstadoRiego = useCallback(async (estado: Partial<EstadoRiego>): Promise<EstadoRiego | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedEstado = await updateEstadoRiegoService(estado);
            setEstadoRiego(updatedEstado);
            return updatedEstado;
        } catch (e: any) {
            setError(e?.message ?? 'Error al actualizar estado de riego');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Obtener configuración
    const fetchConfiguracion = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const config = await getConfiguracionSistemaService();
            setConfiguracion(config);
        } catch (e: any) {
            setError(e?.message ?? 'Error al obtener configuración');
        } finally {
            setLoading(false);
        }
    }, []);

    // Actualizar configuración
    const updateConfiguracion = useCallback(async (
        id: number,
        config: Partial<ConfiguracionSistema>
    ): Promise<ConfiguracionSistema | null> => {
        setLoading(true);
        setError(null);
        try {
            const updatedConfig = await updateConfiguracionSistemaService(id, config);
            setConfiguracion(updatedConfig);
            return updatedConfig;
        } catch (e: any) {
            setError(e?.message ?? 'Error al actualizar configuración');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Utilidades
    const resetError = useCallback(() => setError(null), []);

    const setCurrentPage = useCallback((page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    }, []);

    const setPageSize = useCallback((size: number) => {
        setPagination(prev => ({ ...prev, pageSize: size, currentPage: 1 }));
    }, []);

    return {
        // Estados
        sensors,
        currentSensor,
        latestSensor,
        estadoRiego,
        configuracion,
        loading,
        error,
        pagination,

        // Métodos
        fetchSensors,
        fetchSensorById,
        createSensor,
        updateSensor,
        deleteSensor,
        fetchLatestSensor,
        fetchEstadoRiego,
        updateEstadoRiego,
        fetchConfiguracion,
        updateConfiguracion,
        resetError,
        setCurrentPage,
        setPageSize,
    };
}