import type { Usuario } from '../types/types';

type Props = {
  items: Usuario[];
  loading: boolean;
  page: number;
  pageSize: number;
  count: number;
  onPaginaChange: (page: number) => void;
  onEditar: (u: Usuario) => void;
  onEliminar: (u: Usuario) => void;
};

export function UsuarioTable({
  items = [],
  loading = false,
  page = 1,
  pageSize = 10,
  count = 0,
  onPaginaChange,
  onEditar,
  onEliminar,
}: Props) {
  const safeItems = Array.isArray(items) ? items : [];
  const safeCount = Number.isFinite(count) ? count : 0;
  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safePageSize = Number.isFinite(pageSize) && pageSize > 0 ? pageSize : 10;

  const totalPages = Math.max(1, Math.ceil(safeCount / Math.max(1, safePageSize)));
  return (
    <div style={{ marginTop: 12 }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Usuario</th>
            <th style={{ textAlign: 'left' }}>Email</th>
            <th style={{ textAlign: 'left' }}>Nombre</th>
            <th style={{ textAlign: 'left' }}>Estado</th>
            <th style={{ textAlign: 'left' }}>Fecha registro</th>
            <th style={{ textAlign: 'left', width: 200 }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6}>Cargando...</td></tr>
          ) : safeItems.length === 0 ? (
            <tr><td colSpan={6}>Sin resultados</td></tr>
          ) : (
            safeItems.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{[u.nombres, u.apellidos].filter(Boolean).join(' ') || '-'}</td>
                <td>{u.estado ?? (u.isActive ? 'activo' : 'inactivo')}</td>
                <td>{u.fechaRegistro ?? '-'}</td>
                <td>
                  <button onClick={() => onEditar(u)}>Editar</button>{' '}
                  <button onClick={() => onEliminar(u)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
        <button disabled={safePage <= 1} onClick={() => onPaginaChange(safePage - 1)}>Anterior</button>
        <span>Página {safePage} de {totalPages}</span>
        <button disabled={safePage >= totalPages} onClick={() => onPaginaChange(safePage + 1)}>Siguiente</button>
      </div>
    </div>
  );
}