import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import type { TendenciaDiaria } from '../types/types';

interface GraficoTendenciasProps {
  datos: TendenciaDiaria[];
}

export const GraficoTendencias: React.FC<GraficoTendenciasProps> = ({ datos }) => {
  const datosFormateados = datos.map((item) => ({
    ...item,
    dia: new Date(item.dia).toLocaleDateString('es-ES', { month: 'short', day: 'numeric' }),
  }));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Tendencias Diarias (Últimos 30 días)
      </h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={datosFormateados}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="dia" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temp_promedio"
            stroke="#ef4444"
            name="Temperatura (°C)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="humedad_suelo_promedio"
            stroke="#3b82f6"
            name="Humedad Suelo (%)"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="humedad_relativa_promedio"
            stroke="#10b981"
            name="Humedad Relativa (%)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraficoTendencias;