import React, { useEffect } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, Alert } from '@mui/material';
import useSistema from '../hooks/useSistema';
import DashboardSensores from '../components/DashboardSensores';
import GraficaSensores from '../components/GraficaSensores';
import TablaSensor from '../components/TablaSensor';

const SistemaScreen: React.FC = () => {
  const {
    sensors,
    latestSensor,
    loading,
    error,
    fetchSensors,
    fetchLatestSensor,
    fetchEstadoRiego,
  } = useSistema();

  useEffect(() => {
    document.title = 'Datos de Sensores';
    fetchSensors(undefined, 1, 20);
    fetchLatestSensor();
    fetchEstadoRiego();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && !latestSensor && sensors.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Datos de Sensores
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Grid container spacing={3}>
        <div  style={{ width: '100%' }}>
          <DashboardSensores />
        </div>

        <div style={{ width: '100%'}}>
          <Paper sx={{ p: 3 }}>
            <GraficaSensores />
          </Paper>
        </div>

        <div style={{ width: '100%' }}>
          <Paper sx={{ p: 3 }}>
            <TablaSensor />
          </Paper>
        </div>
      </Grid>
    </Box>
  );
};

export default SistemaScreen;