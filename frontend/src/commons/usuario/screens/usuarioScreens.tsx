import { useState } from 'react';
import { useUsuario } from '../hooks/useUsusario';
import { UsuarioFilters } from '../components/UsuarioFilters';
import { UsuarioTable } from '../components/UsuarioTable';
import { UsuarioForm } from '../components/UsuarioForm';
import type { Usuario, CrearUsuarioDTO, ActualizarUsuarioDTO } from '../types/types';

export default function UsuarioScreens() {
  const usuario = useUsuario();
  const [form, setForm] = useState<{ mode: 'create' } | { mode: 'edit'; data: Usuario } | null>(null);

  function handleCreate(payload: CrearUsuarioDTO) {
    usuario.crear(payload).then(() => setForm(null)).catch(() => {});
  }

  function handleUpdate(payload: ActualizarUsuarioDTO) {
    usuario.actualizar(payload).then(() => setForm(null)).catch(() => {});
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2>Usuarios</h2>

      <UsuarioFilters
        value={{
          q: usuario.filtro.q,
          estado: usuario.filtro.estado,
          ordenarPor: usuario.filtro.ordenarPor,
          orden: usuario.filtro.orden,
          pageSize: usuario.filtro.pageSize,
        }}
        onSearchChange={usuario.setBusqueda}
        onEstadoChange={usuario.setEstado}
        onOrdenarPorChange={usuario.setOrdenarPor}
        onOrdenChange={usuario.setOrden}
        onPageSizeChange={usuario.setTamanoPagina}
        onReset={usuario.resetFiltro}
      />

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={() => setForm({ mode: 'create' })}>Nuevo usuario</button>
        <button onClick={() => usuario.fetchLista()}>Refrescar</button>
      </div>

      {form && (
        <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 6 }}>
          {form.mode === 'create' ? (
            <UsuarioForm
              mode="create"
              submitting={usuario.submitting}
              onSubmit={handleCreate}
              onCancel={() => setForm(null)}
            />
          ) : (
            <UsuarioForm
              mode="edit"
              initial={form.data}
              submitting={usuario.submitting}
              onSubmit={handleUpdate}
              onCancel={() => setForm(null)}
            />
          )}
        </div>
      )}

      <UsuarioTable
        items={usuario.lista.items}
        loading={usuario.loading}
        page={usuario.lista.page}
        pageSize={usuario.lista.pageSize}
        count={usuario.lista.count}
        onPaginaChange={usuario.setPagina}
        onEditar={(u) => setForm({ mode: 'edit', data: u })}
        onEliminar={(u) => {
          if (confirm(`¿Eliminar usuario ${u.username}?`)) {
            usuario.eliminar(u.id).catch(() => {});
          }
        }}
      />

      {usuario.error && (
        <div style={{ color: 'crimson' }}>
          Error: {usuario.error.message}
        </div>
      )}
    </div>
  );
}