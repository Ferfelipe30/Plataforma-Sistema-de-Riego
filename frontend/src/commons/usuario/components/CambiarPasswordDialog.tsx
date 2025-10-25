import { useState } from 'react';
import type { CambiarPasswordDTO, ID } from '../types/types';

type Props = {
  open: boolean;
  usuarioId: ID;
  submitting?: boolean;
  onSubmit: (payload: CambiarPasswordDTO) => void | Promise<void>;
  onClose: () => void;
};

export function CambiarPasswordDialog({ open, usuarioId, submitting, onSubmit, onClose }: Props) {
  const [passwordActual, setPasswordActual] = useState('');
  const [passwordNueva, setPasswordNueva] = useState('');
  const [passwordConfirmacion, setPasswordConfirmacion] = useState('');
  const mismatch = Boolean(passwordNueva && passwordConfirmacion && passwordNueva !== passwordConfirmacion);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mismatch || !passwordActual || !passwordNueva) return;
    onSubmit({ usuarioId, passwordActual, passwordNueva, passwordConfirmacion });
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div style={{ background: '#fff', padding: 16, borderRadius: 8, width: 420 }}>
        <h3>Cambiar contraseña</h3>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
          <label>
            Contraseña actual
            <input type="password" value={passwordActual} onChange={(e) => setPasswordActual(e.target.value)} required />
          </label>
          <label>
            Nueva contraseña
            <input type="password" value={passwordNueva} onChange={(e) => setPasswordNueva(e.target.value)} required />
          </label>
          <label>
            Confirmar contraseña
            <input type="password" value={passwordConfirmacion} onChange={(e) => setPasswordConfirmacion(e.target.value)} required />
          </label>
          {mismatch && <div style={{ color: 'crimson' }}>Las contraseñas no coinciden.</div>}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit" disabled={Boolean(submitting) || mismatch}>Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}