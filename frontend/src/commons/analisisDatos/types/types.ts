export interface EstadisticaSensor {
  promedio: number;
  maximo: number;
  minimo: number;
}

export interface EstadisticasGenerales {
  temperatura_ambiental: EstadisticaSensor;
  humedad_relativa: EstadisticaSensor;
  humedad_suelo: EstadisticaSensor;
  calidad_aire: EstadisticaSensor;
  temperatura_agua: EstadisticaSensor;
}

export interface TendenciaDiaria {
  dia: string;
  temp_promedio: number;
  humedad_suelo_promedio: number;
  humedad_relativa_promedio: number;
  lecturas: number;
}

export interface TendenciaHoraria {
  hora: string;
  temp_promedio: number;
  humedad_suelo_promedio: number;
  lecturas: number;
}

export interface Alerta {
  tipo: 'CRÍTICO' | 'ADVERTENCIA' | 'INFO';
  sensor: string;
  valor: number;
  mensaje: string;
}

export interface UltimoRegistro {
  ID: number;
  temperatura_ambiental: number;
  humedad_relativa: number;
  humedad_suelo: number;
  calidad_aire: number;
  temperatura_agua: number;
  fecha_hora: string;
}

export interface DatosAnalisis {
  total_lecturas: number;
  estadisticas_generales: EstadisticasGenerales;
  tendencias_diarias: TendenciaDiaria[];
  tendencias_horarias: TendenciaHoraria[];
  ultimo_registro: UltimoRegistro;
  alertas: Alerta[];
  fecha_analisis: string;
}

export interface ReporteEstadistico {
  tipo_reporte: 'semanal' | 'mensual' | 'anual';
  periodo: {
    fecha_inicio: string;
    fecha_fin: string;
  };
  total_lecturas: number;
  lecturas_optimas: number;
  eficiencia_sistema: number;
  promedios: {
    temperatura_ambiental: number;
    humedad_suelo: number;
    humedad_relativa: number;
  };
}

export interface AnalisisResponse {
  success: boolean;
  details: string;
  data: DatosAnalisis;
}

export interface ReporteResponse {
  success: boolean;
  details: string;
  data: ReporteEstadistico;
}