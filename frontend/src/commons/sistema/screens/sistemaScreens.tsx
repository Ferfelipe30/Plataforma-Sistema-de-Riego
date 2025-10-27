import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useSistema } from '../hooks/useSistema';
import ListSistema from '../components/TablaSensor';
import CreateSistema from '../components/CreateSensor';
import type { DataSensor } from '../types/types';

const SistemaScreens: React.FC = () => {
  const { data, loading, error, refetch } = useSistema();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dataToEdit, setDataToEdit] = useState<Partial<DataSensor> | undefined>(undefined);

  const handleCreate = () => {
    setDataToEdit(undefined);
    setModalOpen(true);
  };

  const handleEdit = (data: DataSensor) => {
    setDataToEdit(data);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setDataToEdit(undefined);
  };

  const handleSuccess = () => {
    refetch();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <h1 style={{ margin: 0 }}>Datos de Sensores</h1>
          <p style={{ color: '#666', margin: '8px 0 0 0' }}>
            Gestiona y monitorea los datos del sistema de riego
          </p>
        </Box>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleCreate}
          startIcon={<AddIcon />}
          size="large"
        >
          Registrar Datos
        </Button>
      </Box>
      
      <ListSistema 
        datas={data} 
        loading={loading} 
        error={error} 
        onEdit={handleEdit}
      />
      
      <CreateSistema 
        open={modalOpen} 
        initialData={dataToEdit} 
        onClose={handleCloseModal} 
        onSuccess={handleSuccess} 
      />
    </Box>
  );
};

export default SistemaScreens;