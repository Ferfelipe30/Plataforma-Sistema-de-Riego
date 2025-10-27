import React from 'react';
import { FileText, Calendar, Activity, CheckCircle } from 'lucide-react';
import type { ReporteEstadistico } from '../types/types';

interface ReportePanelProps {
  reporte: ReporteEstadistico;
  onCambiarTipo: (tipo: 'semanal' | 'mensual' | 'anual') => void;
}

export const ReportePanel: React.FC<ReportePanelProps> = ({ reporte, onCambiarTipo }) => {
  const getColorEficiencia = (eficiencia: number) => {
    if (eficiencia >= 80) return 'text-green-600';
    if (eficiencia >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Reporte Estadístico</h3>
        </div>
        
        <div className="flex space-x-2">
          {(['semanal', 'mensual', 'anual'] as const).map((tipo) => (
            <button
              key={tipo}
              onClick={() => onCambiarTipo(tipo)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                reporte.tipo_reporte === tipo
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">Total Lecturas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{reporte.total_lecturas}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-600">Lecturas Óptimas</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{reporte.lecturas_optimas}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-600">Eficiencia</span>
          </div>
          <p className={`text-2xl font-bold ${getColorEficiencia(reporte.eficiencia_sistema)}`}>
            {reporte.eficiencia_sistema.toFixed(1)}%
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-600">Período</span>
          </div>
          <p className="text-sm text-gray-700">
            {new Date(reporte.periodo.fecha_inicio).toLocaleDateString('es-ES')}
            <br />
            {new Date(reporte.periodo.fecha_fin).toLocaleDateString('es-ES')}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-3">Promedios del Período</h4>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Temperatura</p>
            <p className="text-lg font-bold text-gray-900">
              {reporte.promedios.temperatura_ambiental.toFixed(1)}°C
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Humedad Suelo</p>
            <p className="text-lg font-bold text-gray-900">
              {reporte.promedios.humedad_suelo.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Humedad Relativa</p>
            <p className="text-lg font-bold text-gray-900">
              {reporte.promedios.humedad_relativa.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportePanel;