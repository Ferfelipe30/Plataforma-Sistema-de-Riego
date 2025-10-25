export type ID = number;
export type ISODate = string;

export type EstadoUsuario = 'activo' | 'inactivo' | 'bloqueado' | 'pendiente';

export interface Permiso {
  id: ID;
  codigo: string; // p.ej. Django 'codename'
  nombre: string;
  descripcion?: string;
}

export interface Rol {
  id: ID;
  nombre: string;
  descripcion?: string;
  permisos?: Permiso[];
}

export interface Direccion {
  linea1: string;
  linea2?: string;
  ciudad?: string;
  departamento?: string;
  pais?: string;
  codigoPostal?: string;
}

export interface PreferenciasUsuario {
  idioma?: 'es' | 'en';
  tema?: 'light' | 'dark' | 'system';
  zonaHoraria?: string;
  notificacionesEmail?: boolean;
  notificacionesPush?: boolean;
}

export interface PerfilUsuario {
  telefono?: string;
  avatarUrl?: string;
  direccion?: Direccion;
  preferencias?: PreferenciasUsuario;
}

export interface Auditoria {
  creadoEn?: ISODate;
  actualizadoEn?: ISODate;
  creadoPorId?: ID | null;
  actualizadoPorId?: ID | null;
}

export interface Usuario extends Auditoria {
  id: ID;
  username: string;
  email: string;
  nombres?: string;
  apellidos?: string;
  isActive?: boolean;
  isStaff?: boolean;
  isSuperuser?: boolean;
  estado?: EstadoUsuario;
  ultimoAcceso?: ISODate | null;
  fechaRegistro?: ISODate;
  roles?: Rol[];
  permisos?: Permiso[];
  perfil?: PerfilUsuario;
}

export interface CrearUsuarioDTO {
  username: string;
  email: string;
  password: string;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  rolIds?: ID[];
  avatarUrl?: string;
  direccion?: Direccion;
}

export interface ActualizarUsuarioDTO {
  id: ID;
  username?: string;
  email?: string;
  nombres?: string;
  apellidos?: string;
  telefono?: string;
  isActive?: boolean;
  estado?: EstadoUsuario;
  rolIds?: ID[];
  avatarUrl?: string;
  direccion?: Direccion;
}

export interface CambiarPasswordDTO {
  usuarioId: ID;
  passwordActual: string;
  passwordNueva: string;
  passwordConfirmacion: string;
}

export interface UsuarioFiltro {
  q?: string;
  estado?: EstadoUsuario;
  activo?: boolean;
  isStaff?: boolean;
  rolId?: ID;
  page?: number;
  pageSize?: number;
  ordenarPor?: 'username' | 'email' | 'fechaRegistro' | 'ultimoAcceso';
  orden?: 'asc' | 'desc';
}

export interface Paginado<T> {
  results: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  next?: number | null;
  previous?: number | null;
}

export type ApiRespuesta<T> = {
  data: T;
  message?: string;
};

export interface ErrorApi {
  status: number;
  message: string;
  details?: unknown;
  errors?: Record<string, string[]>;
}