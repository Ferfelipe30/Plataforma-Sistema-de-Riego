import { useState, useEffect } from 'react';
import { getSistema, createSistema } from '../services/services';
import type { DataSensor } from '../types/types';

export const useSistema = () => {
    const [data, setData] = useState<DataSensor[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSistema = async () => {
        setLoading(true);
        try {
            const response = await getSistema();
            setData(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Error al obtener los datos del sistema");
        } finally {
          setLoading(false);
        }
    };

    const addSistema = async (sistema: Omit<DataSensor, 'id'>) => {
        setLoading(true);
        try {
          const response = await createSistema(sistema);
          setData((prev) => [...prev, response.data]);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("Error al crear el sistema");
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchSistema();
    }, []);

    return { data, loading, error, refetch: fetchSistema, addSistema };
};

export default useSistema;