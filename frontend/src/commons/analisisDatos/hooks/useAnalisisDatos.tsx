import { useState, useEffect } from 'react';
import { getAnalisisDatos, getReporteEstadistico } from '../services/services';
import type { DatosAnalisis, ReporteEstadistico } from '../types/types';

export const useDashboard = () => {
  const [datosAnalisis, setDatosAnalisis] = useState<DatosAnalisis | null>(null);
  const [reporte, setReporte] = useState<ReporteEstadistico | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tipoReporte, setTipoReporte] = useState<'semanal' | 'mensual' | 'anual'>('semanal');

  const cargarAnalisis = async (fechaInicio?: string, fechaFin?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAnalisisDatos(fechaInicio, fechaFin);
      if (response.success) {
        setDatosAnalisis(response.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.details || 'Error al cargar análisis');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const cargarReporte = async (tipo: 'semanal' | 'mensual' | 'anual') => {
    setLoading(true);
    setError(null);
    try {
      const response = await getReporteEstadistico(tipo);
      if (response.success) {
        setReporte(response.data);
        setTipoReporte(tipo);
      }
    } catch (err: any) {
      setError(err.response?.data?.details || 'Error al cargar reporte');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarAnalisis();
    cargarReporte('semanal');
  }, []);

  return {
    datosAnalisis,
    reporte,
    loading,
    error,
    tipoReporte,
    cargarAnalisis,
    cargarReporte,
  };
};