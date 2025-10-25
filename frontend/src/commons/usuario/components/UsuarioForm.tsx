import { useEffect, useMemo, useState } from 'react';
import type { ActualizarUsuarioDTO, CrearUsuarioDTO, EstadoUsuario, Usuario } from '../types/types';

type CreateProps = {
  mode: 'create';
  initial?: Partial<Usuario>;
  submitting?: boolean;
  onSubmit: (data: CrearUsuarioDTO) => void;
  onCancel?: () => void;
};

type EditProps = {
  mode: 'edit';
  initial: Usuario;
  submitting?: boolean;
  onSubmit: (data: ActualizarUsuarioDTO) => void;
  onCancel?: () => void;
};

type Props = CreateProps | EditProps;

export function UsuarioForm(props: Props) {
  const isCreate = props.mode === 'create';

  const [username, setUsername] = useState(props.initial?.username ?? '');
  const [email, setEmail] = useState(props.initial?.email ?? '');
  const [nombres, setNombres] = useState(props.initial?.nombres ?? '');
  const [apellidos, setApellidos] = useState(props.initial?.apellidos ?? '');
  const [telefono, setTelefono] = useState(props.initial?.perfil?.telefono ?? '');
  const [isActive, setIsActive] = useState(props.initial?.isActive ?? true);
  const [estado, setEstado] = useState<EstadoUsuario | undefined>(props.initial?.estado);

  // Solo crear
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const passMismatch = useMemo(() => isCreate && password && password2 && password !== password2, [isCreate, password, password2]);

  useEffect(() => {
    setUsername(props.initial?.username ?? '');
    setEmail(props.initial?.email ?? '');
    setNombres(props.initial?.nombres ?? '');
    setApellidos(props.initial?.apellidos ?? '');
    setTelefono(props.initial?.perfil?.telefono ?? '');
    if (props.initial) {
      setIsActive(props.initial.isActive ?? true);
      setEstado(props.initial.estado);
    } else {
      setIsActive(true);
      setEstado(undefined);
    }
  }, [props.initial]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isCreate) {
      if (!password || !password2 || passMismatch) return;
      const payload: CrearUsuarioDTO = {
        username,
        email,
        password,
        nombres: nombres || undefined,
        apellidos: apellidos || undefined,
        telefono: telefono || undefined,
      };
      props.onSubmit(payload);
    } else {
      const payload: ActualizarUsuarioDTO = {
        id: props.initial.id,
        username: username || undefined,
        email: email || undefined,
        nombres: nombres || undefined,
        apellidos: apellidos || undefined,
        telefono: telefono || undefined,
        isActive,
        estado,
      };
      props.onSubmit(payload);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 640 }}>
      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        <label>
          Usuario
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
      </div>

      <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
        <label>
          Nombres
          <input value={nombres} onChange={(e) => setNombres(e.target.value)} />
        </label>
        <label>
          Apellidos
          <input value={apellidos} onChange={(e) => setApellidos(e.target.value)} />
        </label>
      </div>

      <label>
        Teléfono
        <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
      </label>

      {!isCreate && (
        <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
          <label>
            Activo
            <input type="checkbox" checked={!!isActive} onChange={(e) => setIsActive(e.target.checked)} />
          </label>
          <label>
            Estado
            <select value={estado ?? ''} onChange={(e) => setEstado((e.target.value || undefined) as EstadoUsuario | undefined)}>
              <option value="">-</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="bloqueado">Bloqueado</option>
              <option value="pendiente">Pendiente</option>
            </select>
          </label>
        </div>
      )}

      {isCreate && (
        <>
          <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
            <label>
              Contraseña
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
              Confirmar contraseña
              <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />
            </label>
          </div>
          {passMismatch && <div style={{ color: 'crimson' }}>Las contraseñas no coinciden.</div>}
        </>
      )}

      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        <button
          type="submit"
          disabled={(Boolean(props.submitting) || (isCreate && passMismatch)) ? true : undefined}
        >
          {isCreate ? 'Crear' : 'Guardar'}
        </button>
        {props.onCancel && <button type="button" onClick={props.onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}