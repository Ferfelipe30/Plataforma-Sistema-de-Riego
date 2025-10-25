import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useSistema } from '../hooks/useSistema';
import ListSistema from '../components/TablaSensor';
import type { DataSensor } from '../types/types';

const SistemaScreens: React.FC = () => {
  const { data, loading, error, refetch } = useSistema();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dataToEdit, setDataToEdit] = useState<DataSensor | null>(null);

  const handleEdit = (data: DataSensor) => {
    setDataToEdit(data);
    setModalOpen(true);
  };

  return (
    <Box>
      <ListSistema datas={data} loading={loading} error={error} onEdit={handleEdit}/>
    </Box>
  );
};

export default SistemaScreens;