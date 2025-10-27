import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import type { Usuario } from '../types/types';

interface ListUsuariosProps {
  usuarios: Usuario[];
  loading: boolean;
  error: string | null;
  onEdit: (usuario: Usuario) => void;
}

const ListUsuarios: React.FC<ListUsuariosProps> = ({ usuarios, loading, error, onEdit }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ maxWidth: '90%', margin: '0 auto', mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Listado de Usuarios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((u) => (
              <TableRow key={u.id}>
                <TableCell>{u.nombre}</TableCell>
                <TableCell>{u.apellido}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.activo ? 'Sí' : 'No'}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onEdit(u)} color="primary">
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListUsuarios;