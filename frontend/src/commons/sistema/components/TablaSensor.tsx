import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    Alert,
} from '@mui/material';
import type { DataSensor } from '../types/types';

interface ListSistemaProps {
    datas: DataSensor[];
    loading: boolean;
    error: string | null;
    onEdit: (data: DataSensor) => void;
}

const ListSistema: React.FC<ListSistemaProps> = ({ datas, loading, error}) => {
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
            <Typography variant='h4' component='h2' gutterBottom>
                Lista del Sistema
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Temperatura Ambiental</TableCell>
                            <TableCell>Humedad Relativa</TableCell>
                            <TableCell>Humedad Suelo</TableCell>
                            <TableCell>Calidad Aire</TableCell>
                            <TableCell>Temperatura Agua</TableCell>
                            <TableCell>Fecha y Hora</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datas.map((data) => (
                            <TableRow key={data.ID}>
                                <TableCell>{data.ID}</TableCell>
                                <TableCell>{data.temperatura_ambiental} °C</TableCell>
                                <TableCell>{data.humedad_relativa} %</TableCell>
                                <TableCell>{data.humedad_suelo} %</TableCell>
                                <TableCell>{data.calidad_aire} %</TableCell>
                                <TableCell>{data.temperatura_agua} °C</TableCell>
                                <TableCell>{data.fecha_hora}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ListSistema;