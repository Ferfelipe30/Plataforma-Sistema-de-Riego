export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  telefono?: string;
  fechaRegistro: string;
  fehaActualizacion?: string;
  activo: boolean;
  ultimaSesion?: string;
}