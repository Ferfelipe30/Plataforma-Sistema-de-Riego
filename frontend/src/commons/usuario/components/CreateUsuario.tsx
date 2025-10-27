import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Checkbox,
  FormControlLabel,
  Alert,
} from '@mui/material';
import type { Usuario } from '../types/types';
import { createUsuario } from '../services/services';

interface UsuarioModalProps {
  open: boolean;
  initialData?: Usuario;
  onClose: () => void;
  onSuccess: () => void;
}

const UsuarioModal: React.FC<UsuarioModalProps> = ({ open, initialData, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    id: undefined as number | undefined,
    nombre: '',
    apellido: '',
    documento: '',
    email: '',
    password: '',
    telefono: '',
    activo: true,
    ultimaSesion: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        nombre: initialData.nombre,
        apellido: initialData.apellido,
        documento: (initialData as any)?.documento || '',
        email: initialData.email,
        password: '',
        telefono: initialData.telefono || '',
        activo: initialData.activo,
        ultimaSesion: initialData.ultimaSesion || '',
      });
    } else {
      setFormData({
        id: undefined,
        nombre: '',
        apellido: '',
        documento: '',
        email: '',
        password: '',
        telefono: '',
        activo: true,
        ultimaSesion: '',
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (!initialData) {
        const payload: Omit<Usuario, 'id'> = {
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password || undefined,
          telefono: formData.telefono || undefined,
          fechaRegistro: new Date().toISOString(),
          fehaActualizacion: undefined,
          activo: formData.activo,
          ultimaSesion: formData.ultimaSesion || undefined,
        };
        const created = await createUsuario(payload);
        setSuccess(`Usuario creado: ${created.nombre} ${created.apellido}`);
      } else if (initialData && formData.id) {
        setSuccess('Usuario actualizado.');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Error al procesar la petición.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? 'Actualizar Usuario' : 'Crear Usuario'}</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Documento"
            name="documento"
            value={formData.documento}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          {!initialData && (
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
          )}
          <TextField
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
              />
            }
            label="Activo"
            sx={{ mb: 2 }}
          />
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit" disabled={loading}>
              {loading ? (initialData ? 'Actualizando...' : 'Creando...') : (initialData ? 'Actualizar' : 'Crear')}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default UsuarioModal;