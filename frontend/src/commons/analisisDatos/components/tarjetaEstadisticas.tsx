import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { EstadisticaSensor } from '../types/types';

interface EstadisticaCardProps {
  titulo: string;
  datos: EstadisticaSensor;
  unidad: string;
  icono: React.ReactNode;
  color: string;
}

export const EstadisticaCard: React.FC<EstadisticaCardProps> = ({
  titulo,
  datos,
  unidad,
  icono,
  color,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{titulo}</h3>
        <div className={`p-3 rounded-full ${color}`}>{icono}</div>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-3xl font-bold text-gray-900">
            {datos.promedio?.toFixed(1) || 0} {unidad}
          </p>
          <p className="text-sm text-gray-500">Promedio</p>
        </div>
        
        <div className="flex justify-between pt-3 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="text-sm text-gray-600">
              Max: {datos.maximo?.toFixed(1) || 0} {unidad}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingDown className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">
              Min: {datos.minimo?.toFixed(1) || 0} {unidad}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstadisticaCard;