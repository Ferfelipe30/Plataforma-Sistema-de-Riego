import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { UsuarioService } from '../services/services';
import type {
  ID,
  Usuario,
  UsuarioFiltro,
  CrearUsuarioDTO,
  ActualizarUsuarioDTO,
  CambiarPasswordDTO,
  Paginado,
  ErrorApi,
} from '../types/types';

type EstadoLista = {
  items: Usuario[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
  next?: number | null;
  previous?: number | null;
};

const defaultFiltro: UsuarioFiltro = {
  q: '',
  page: 1,
  pageSize: 10,
  ordenarPor: 'fechaRegistro',
  orden: 'desc',
};

export function useUsuario(initialFiltro?: Partial<UsuarioFiltro>) {
  const [filtro, setFiltro] = useState<UsuarioFiltro>({
    ...defaultFiltro,
    ...(initialFiltro ?? {}),
  });
  const filtroRef = useRef(filtro);
  const [lista, setLista] = useState<EstadoLista>({
    items: [],
    count: 0,
    page: filtro.page ?? 1,
    pageSize: filtro.pageSize ?? 10,
    totalPages: 0,
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<ErrorApi | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    filtroRef.current = filtro;
  }, [filtro]);

  const fetchLista = useCallback(async (): Promise<Paginado<Usuario>> => {
    setLoading(true);
    setError(null);
    const requestId = ++requestIdRef.current;
    try {
      const resp = await UsuarioService.listar(filtroRef.current);
      // resp: ApiRespuesta<Paginado<Usuario>>
      const data = resp.data;
      // Evita condición de carrera
      if (requestId !== requestIdRef.current) return data;
      setLista({
        items: data.results,
        count: data.count,
        page: data.page,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        next: data.next,
        previous: data.previous,
      });
      return data;
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    } finally {
      if (requestId === requestIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLista().catch(() => {});
  }, [fetchLista, filtro.q, filtro.estado, filtro.activo, filtro.isStaff, filtro.rolId, filtro.page, filtro.pageSize, filtro.ordenarPor, filtro.orden]);

  const setBusqueda = useCallback((q: string) => {
    setFiltro(prev => ({ ...prev, q, page: 1 }));
  }, []);

  const setPagina = useCallback((page: number) => {
    setFiltro(prev => ({ ...prev, page }));
  }, []);

  const setTamanoPagina = useCallback((pageSize: number) => {
    setFiltro(prev => ({ ...prev, pageSize, page: 1 }));
  }, []);

  const setOrden = useCallback((orden: UsuarioFiltro['orden']) => {
    setFiltro(prev => ({ ...prev, orden, page: 1 }));
  }, []);

  const setOrdenarPor = useCallback((ordenarPor: UsuarioFiltro['ordenarPor']) => {
    setFiltro(prev => ({ ...prev, ordenarPor, page: 1 }));
  }, []);

  const setEstado = useCallback((estado: UsuarioFiltro['estado']) => {
    setFiltro(prev => ({ ...prev, estado, page: 1 }));
  }, []);

  const setRolId = useCallback((rolId?: ID) => {
    setFiltro(prev => ({ ...prev, rolId, page: 1 }));
  }, []);

  const resetFiltro = useCallback(() => {
    setFiltro({ ...defaultFiltro });
  }, []);

  const obtener = useCallback(async (id: ID): Promise<Usuario> => {
    setError(null);
    try {
      const resp = await UsuarioService.obtener(id);
      return resp.data;
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    }
  }, []);

  const crear = useCallback(async (payload: CrearUsuarioDTO): Promise<Usuario> => {
    setSubmitting(true);
    setError(null);
    try {
      const resp = await UsuarioService.crear(payload);
      // Refresca la lista a la primera página para ver el nuevo registro
      await fetchLista();
      return resp.data;
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    } finally {
      setSubmitting(false);
    }
  }, [fetchLista]);

  const actualizar = useCallback(async (payload: ActualizarUsuarioDTO): Promise<Usuario> => {
    setSubmitting(true);
    setError(null);
    try {
      const resp = await UsuarioService.actualizar(payload);
      await fetchLista();
      return resp.data;
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    } finally {
      setSubmitting(false);
    }
  }, [fetchLista]);

  const eliminar = useCallback(async (id: ID): Promise<void> => {
    setSubmitting(true);
    setError(null);
    try {
      await UsuarioService.eliminar(id);
      await fetchLista();
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    } finally {
      setSubmitting(false);
    }
  }, [fetchLista]);

  const cambiarPassword = useCallback(async (payload: CambiarPasswordDTO): Promise<void> => {
    setSubmitting(true);
    setError(null);
    try {
      await UsuarioService.cambiarPassword(payload);
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    } finally {
      setSubmitting(false);
    }
  }, []);

  const asignarRoles = useCallback(async (usuarioId: ID, rolIds: ID[]): Promise<Usuario> => {
    setSubmitting(true);
    setError(null);
    try {
      const resp = await UsuarioService.asignarRoles(usuarioId, rolIds);
      await fetchLista();
      return resp.data;
    } catch (e) {
      setError(e as ErrorApi);
      throw e;
    } finally {
      setSubmitting(false);
    }
  }, [fetchLista]);

  const estado = useMemo(
    () => ({
      loading,
      submitting,
      error,
      filtro,
      lista,
    }),
    [loading, submitting, error, filtro, lista]
  );

  const acciones = useMemo(
    () => ({
      fetchLista,
      setBusqueda,
      setPagina,
      setTamanoPagina,
      setOrden,
      setOrdenarPor,
      setEstado,
      setRolId,
      resetFiltro,
      obtener,
      crear,
      actualizar,
      eliminar,
      cambiarPassword,
      asignarRoles,
    }),
    [
      fetchLista,
      setBusqueda,
      setPagina,
      setTamanoPagina,
      setOrden,
      setOrdenarPor,
      setEstado,
      setRolId,
      resetFiltro,
      obtener,
      crear,
      actualizar,
      eliminar,
      cambiarPassword,
      asignarRoles,
    ]
  );

  return { ...estado, ...acciones };
}