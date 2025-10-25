import { isAxiosError, type AxiosError } from 'axios';
import { api } from '../../../api/axios';
import type {
  ID,
  Usuario,
  UsuarioFiltro,
  CrearUsuarioDTO,
  ActualizarUsuarioDTO,
  CambiarPasswordDTO,
  Paginado,
  ApiRespuesta,
  ErrorApi,
} from '../types/types';

const baseUrl = '/api/usuarios/';

function normalizeError(e: unknown): never {
  if (isAxiosError(e)) {
    const err = e as AxiosError<any>;
    const status = err.response?.status ?? 0;
    const data = err.response?.data ?? {};
    const normalized: ErrorApi = {
      status,
      message: data?.message ?? err.message ?? 'Error de solicitud',
      details: data,
      errors: data?.errors,
    };
    throw normalized;
  }
  throw {
    status: 0,
    message: (e as any)?.message ?? 'Error desconocido',
    details: e,
  } as ErrorApi;
}

function buildParams(filtro?: UsuarioFiltro) {
  if (!filtro) return undefined;
  const {
    q,
    estado,
    activo,
    isStaff,
    rolId,
    page,
    pageSize,
    ordenarPor,
    orden,
  } = filtro;

  return {
    q,
    estado,
    activo,
    is_staff: isStaff, // ajusta si tu backend usa otro nombre
    rol_id: rolId, // ajusta si tu backend usa otro nombre
    page,
    page_size: pageSize, // ajusta a tu paginación
    ordenar_por: ordenarPor, // o 'ordering' si usas DjangoFilter ordering
    orden,
  };
}

export const UsuarioService = {
  async listar(filtro?: UsuarioFiltro) {
    try {
      const res = await api.get<ApiRespuesta<Paginado<Usuario>>>(baseUrl, {
        params: buildParams(filtro),
      });
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },

  async obtener(id: ID) {
    try {
      const res = await api.get<ApiRespuesta<Usuario>>(`${baseUrl}${id}/`);
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },

  async crear(payload: CrearUsuarioDTO) {
    try {
      const res = await api.post<ApiRespuesta<Usuario>>(baseUrl, payload);
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },

  async actualizar(payload: ActualizarUsuarioDTO) {
    try {
      const res = await api.put<ApiRespuesta<Usuario>>(
        `${baseUrl}${payload.id}/`,
        payload
      );
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },

  async eliminar(id: ID) {
    try {
      const res = await api.delete<ApiRespuesta<null>>(`${baseUrl}${id}/`);
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },

  async cambiarPassword(payload: CambiarPasswordDTO) {
    try {
      const res = await api.post<ApiRespuesta<null>>(
        `${baseUrl}cambiar-password/`,
        payload
      );
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },

  async asignarRoles(usuarioId: ID, rolIds: ID[]) {
    try {
      const res = await api.post<ApiRespuesta<Usuario>>(
        `${baseUrl}${usuarioId}/roles/`,
        { rolIds }
      );
      return res.data;
    } catch (e) {
      normalizeError(e);
    }
  },
};