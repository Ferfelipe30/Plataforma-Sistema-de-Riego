import axios from '../../../api/axios';
import type { AnalisisResponse, ReporteResponse } from '../types/types';

export const getAnalisisDatos = async (
  fechaInicio?: string,
  fechaFin?: string
): Promise<AnalisisResponse> => {
  const params = new URLSearchParams();
  if (fechaInicio) params.append('fecha_inicio', fechaInicio);
  if (fechaFin) params.append('fecha_fin', fechaFin);

  const response = await axios.get(`/api/data/analisis/`);
  return response.data;
};

export const getReporteEstadistico = async (
  tipo: 'semanal' | 'mensual' | 'anual' = 'semanal'
): Promise<ReporteResponse> => {
  // include the 'tipo' in the request as a query parameter so the parameter is used
  const response = await axios.get(`/api/data/reporte/`, { params: { tipo } });
  return response.data;
};