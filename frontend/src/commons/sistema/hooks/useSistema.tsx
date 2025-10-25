import { useState, useEffect } from 'react';
import { getSistema } from '../services/services';
import type { DataSensor } from '../types/types';
import type { ApiResponse } from '../../../types/types';

export const useSistema = () => {
    const [data, setData] = useState<DataSensor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSistema = async () => {
        setLoading(true);
        setError(null);
        try {
            const response: ApiResponse<DataSensor[]> = await getSistema();
            if (response.success) {
                setData(response.data);
            } else {
                setError(response.detail);
            }
        } catch (err: any) {
            setError(err.message || 'Error al obtener los datos del sistema');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSistema();
    }, []);

    return { data, loading, error, refetch: fetchSistema };
}