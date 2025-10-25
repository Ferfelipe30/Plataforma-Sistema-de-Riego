import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import useSistema from '../hooks/useSistema';
import TarjetaSensor from './TarjetaSensor';
import GraficoSensores from './GraficaSensores';
import TablaSensores from './TablaSensor';
import ControlRiego from './ControlRiesgo';

const DashboardSensores: React.FC = () => {
    const { latestSensor, estadoRiego, loading, error, fetchLatestSensor, fetchEstadoRiego } = useSistema();

    useEffect(() => {
        fetchLatestSensor();
        fetchEstadoRiego();
        
        // Auto-refresh cada 30 segundos
        const interval = setInterval(() => {
            fetchLatestSensor();
            fetchEstadoRiego();
        }, 30000);

        return () => clearInterval(interval);
    }, [fetchLatestSensor, fetchEstadoRiego]);

    if (loading && !latestSensor) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Dashboard de Sensores
            </Typography>

            <Grid container spacing={2}>
                    <TarjetaSensor
                        titulo="Temperatura"
                        valor={latestSensor?.temperatura}
                        unidad="°C"
                        icono="temperature"
                    />
                    <TarjetaSensor
                        titulo="Humedad"
                        valor={latestSensor?.humedad}
                        unidad="%"
                        icono="humidity"
                    />
                    <TarjetaSensor
                        titulo="Nivel de Agua"
                        valor={latestSensor?.nivel_agua}
                        unidad="%"
                        icono="water"
                    />
                </Grid>
                    <ControlRiego estadoRiego={estadoRiego} />

            <Grid container spacing={2} sx={{ mt: 2 }}>
                
                    <Paper sx={{ p: 2 }}>
                        <GraficoSensores />
                    </Paper>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Estado del Sistema
                        </Typography>
                        {estadoRiego && (
                            <Box>
                                <Typography>
                                    Modo: <strong>{estadoRiego.modo === 'automatico' ? 'Automático' : 'Manual'}</strong>
                                </Typography>
                                <Typography>
                                    Estado: <strong>{estadoRiego.activo ? 'Activo' : 'Inactivo'}</strong>
                                </Typography>
                            </Box>
                        )}
                    </Paper>
            </Grid>
                <Typography variant="h6" gutterBottom>
                    Sensores Registrados
                </Typography>
            <Paper sx={{ p: 2 }}>
                <TablaSensores />
            </Paper>
        </Box>
    );
};

export default DashboardSensores;