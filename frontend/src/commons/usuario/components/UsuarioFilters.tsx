import type { EstadoUsuario, UsuarioFiltro } from '../types/types';

type Props = {
  value: Pick<UsuarioFiltro, 'q' | 'estado' | 'ordenarPor' | 'orden' | 'pageSize'>;
  onSearchChange: (q: string) => void;
  onEstadoChange: (estado?: EstadoUsuario) => void;
  onOrdenarPorChange: (ordenarPor: UsuarioFiltro['ordenarPor']) => void;
  onOrdenChange: (orden: UsuarioFiltro['orden']) => void;
  onPageSizeChange: (size: number) => void;
  onReset: () => void;
};

export function UsuarioFilters({
  value,
  onSearchChange,
  onEstadoChange,
  onOrdenarPorChange,
  onOrdenChange,
  onPageSizeChange,
  onReset,
}: Props) {
  return (
    <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 160px 180px 120px 140px auto' }}>
      <input
        type="text"
        placeholder="Buscar por usuario/nombre/email"
        value={value.q ?? ''}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={value.estado ?? ''}
        onChange={(e) => onEstadoChange((e.target.value || undefined) as EstadoUsuario | undefined)}
      >
        <option value="">Estado (todos)</option>
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
        <option value="bloqueado">Bloqueado</option>
        <option value="pendiente">Pendiente</option>
      </select>
      <select
        value={value.ordenarPor ?? 'fechaRegistro'}
        onChange={(e) => onOrdenarPorChange(e.target.value as UsuarioFiltro['ordenarPor'])}
      >
        <option value="fechaRegistro">Fecha registro</option>
        <option value="ultimoAcceso">Último acceso</option>
        <option value="username">Usuario</option>
        <option value="email">Email</option>
      </select>
      <select value={value.orden ?? 'desc'} onChange={(e) => onOrdenChange(e.target.value as UsuarioFiltro['orden'])}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
      <select
        value={value.pageSize ?? 10}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
      >
        <option value={5}>5 por página</option>
        <option value={10}>10 por página</option>
        <option value={20}>20 por página</option>
        <option value={50}>50 por página</option>
      </select>
      <button type="button" onClick={onReset}>Reset</button>
    </div>
  );
}