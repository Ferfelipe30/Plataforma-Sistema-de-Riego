import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Typography, Box, CircularProgress } from '@mui/material';
import useSistema from '../hooks/useSistema';

const GraficoSensores: React.FC = () => {
    const { sensors, loading, fetchSensors } = useSistema();

    useEffect(() => {
        fetchSensors(undefined, 1, 20);
    }, []);

    if (loading && sensors.length === 0) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
            </Box>
        );
    }

    const data = sensors.map(s => ({
        fecha: new Date(s.fecha_registro).toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit' 
        }),
        temperatura: s.temperatura,
        humedad: s.humedad,
        nivel_agua: s.nivel_agua,
    })).reverse();

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Gráfico de Sensores
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="fecha" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="temperatura" stroke="#f44336" name="Temperatura (°C)" />
                    <Line type="monotone" dataKey="humedad" stroke="#2196f3" name="Humedad (%)" />
                    <Line type="monotone" dataKey="nivel_agua" stroke="#4caf50" name="Nivel de Agua (%)" />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
};

export default GraficoSensores;