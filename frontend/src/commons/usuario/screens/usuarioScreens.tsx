import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import useUsuario from '../hooks/useUsusario';
import ListUsuario from '../components/ListUsuario';
import UsuarioModal from '../components/CreateUsuario';
import type { Usuario } from '../types/types';

const UsuarioScreens: React.FC = () => {
  const { usuarios, loading, error, fetchUsuarios } = useUsuario();
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioToEdit, setUsuarioToEdit] = useState<Usuario | null>(null);

  const handleCreate = () => {
    setUsuarioToEdit(null);
    setModalOpen(true);
  };

  const handleEdit = (usuario: Usuario) => {
    setUsuarioToEdit(usuario);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSuccess = () => {
    fetchUsuarios();
  };

  return (
    <Box>
      <ListUsuario usuarios={usuarios} loading={loading} error={error} onEdit={handleEdit} />
      <UsuarioModal open={modalOpen} initialData={usuarioToEdit || undefined} onClose={handleModalClose} onSuccess={handleModalSuccess}/>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleCreate}>
          Crear Usuario
        </Button>
      </Box>
    </Box>
  );
};

export default UsuarioScreens;