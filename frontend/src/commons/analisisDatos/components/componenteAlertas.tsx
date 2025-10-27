import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';
import type { Alerta } from '../types/types';

interface AlertasPanelProps {
  alertas: Alerta[];
}

export const AlertasPanel: React.FC<AlertasPanelProps> = ({ alertas }) => {
  const getIconoAlerta = (tipo: string) => {
    switch (tipo) {
      case 'CRÍTICO':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'ADVERTENCIA':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getColorFondo = (tipo: string) => {
    switch (tipo) {
      case 'CRÍTICO':
        return 'bg-red-50 border-red-200';
      case 'ADVERTENCIA':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  if (alertas.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-center space-x-3">
          <Info className="w-6 h-6 text-green-500" />
          <div>
            <h3 className="font-semibold text-green-800">Sistema operando normalmente</h3>
            <p className="text-sm text-green-600">No hay alertas activas</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Alertas del Sistema ({alertas.length})
      </h3>
      {alertas.map((alerta, index) => (
        <div
          key={index}
          className={`${getColorFondo(alerta.tipo)} border rounded-lg p-4 transition-all hover:shadow-md`}
        >
          <div className="flex items-start space-x-3">
            {getIconoAlerta(alerta.tipo)}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-800">{alerta.sensor}</h4>
                <span className="text-sm font-medium px-2 py-1 rounded bg-white">
                  {alerta.tipo}
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{alerta.mensaje}</p>
              <p className="text-xs text-gray-600">
                Valor actual: <strong>{alerta.valor}</strong>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertasPanel;