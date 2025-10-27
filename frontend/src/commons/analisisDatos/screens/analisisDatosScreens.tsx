import React from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Waves,
  Activity,
  RefreshCw,
} from 'lucide-react';
import { useDashboard } from '../hooks/useAnalisisDatos';
import { EstadisticaCard } from '../components/tarjetaEstadisticas';
import { AlertasPanel } from '../components/componenteAlertas';
import { GraficoTendencias } from '../components/graficoTendencias';
import { ReportePanel } from '../components/panelReporte';

export const DashboardScreen: React.FC = () => {
  const { datosAnalisis, reporte, loading, error, cargarAnalisis, cargarReporte } =
    useDashboard();

  const handleRefresh = () => {
    cargarAnalisis();
    cargarReporte('semanal');
  };

  if (loading && !datosAnalisis) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Sistema de Riego
            </h1>
            <p className="text-gray-600 mt-1">
              Análisis en tiempo real de sensores y estadísticas
            </p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>
      </div>

      {datosAnalisis && (
        <>
          {/* Estadísticas Generales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <EstadisticaCard
              titulo="Temperatura Ambiente"
              datos={datosAnalisis.estadisticas_generales.temperatura_ambiental}
              unidad="°C"
              icono={<Thermometer className="w-6 h-6 text-white" />}
              color="bg-red-500"
            />
            <EstadisticaCard
              titulo="Humedad Relativa"
              datos={datosAnalisis.estadisticas_generales.humedad_relativa}
              unidad="%"
              icono={<Droplets className="w-6 h-6 text-white" />}
              color="bg-blue-500"
            />
            <EstadisticaCard
              titulo="Humedad del Suelo"
              datos={datosAnalisis.estadisticas_generales.humedad_suelo}
              unidad="%"
              icono={<Activity className="w-6 h-6 text-white" />}
              color="bg-green-500"
            />
            <EstadisticaCard
              titulo="Calidad del Aire"
              datos={datosAnalisis.estadisticas_generales.calidad_aire}
              unidad="ppm"
              icono={<Wind className="w-6 h-6 text-white" />}
              color="bg-purple-500"
            />
            <EstadisticaCard
              titulo="Temperatura Agua"
              datos={datosAnalisis.estadisticas_generales.temperatura_agua}
              unidad="°C"
              icono={<Waves className="w-6 h-6 text-white" />}
              color="bg-cyan-500"
            />
          </div>

          {/* Alertas */}
          <div className="mb-8">
            <AlertasPanel alertas={datosAnalisis.alertas} />
          </div>

          {/* Reporte Estadístico */}
          {reporte && (
            <div className="mb-8">
              <ReportePanel reporte={reporte} onCambiarTipo={cargarReporte} />
            </div>
          )}

          {/* Gráfico de Tendencias */}
          <div className="mb-8">
            <GraficoTendencias datos={datosAnalisis.tendencias_diarias} />
          </div>

          {/* Información Adicional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Último Registro
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Fecha:</strong>{' '}
                  {new Date(datosAnalisis.ultimo_registro.fecha_hora).toLocaleString('es-ES')}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Temperatura:</strong> {datosAnalisis.ultimo_registro.temperatura_ambiental}°C
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Humedad Suelo:</strong> {datosAnalisis.ultimo_registro.humedad_suelo}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Resumen
              </h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  <strong>Total de Lecturas:</strong> {datosAnalisis.total_lecturas}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Análisis Generado:</strong>{' '}
                  {new Date(datosAnalisis.fecha_analisis).toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;