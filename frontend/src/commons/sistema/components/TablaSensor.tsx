import React, { useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Typography,
    CircularProgress,
    Box,
    Chip
} from '@mui/material';
import useSistema from '../hooks/useSistema';

const TablaSensores: React.FC = () => {
    const { sensors, loading, pagination, fetchSensors, setCurrentPage, setPageSize } = useSistema();

    useEffect(() => {
        fetchSensors();
    }, []);

    const handleChangePage = (_: unknown, newPage: number) => {
        setCurrentPage(newPage + 1);
        fetchSensors(undefined, newPage + 1);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        setPageSize(newSize);
        fetchSensors(undefined, 1, newSize);
    };

    if (loading && sensors.length === 0) {
        return (
            <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Typography variant="h6" gutterBottom>
                Historial de Sensores
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="right">Temperatura (°C)</TableCell>
                            <TableCell align="right">Humedad (%)</TableCell>
                            <TableCell align="right">Nivel de Agua (%)</TableCell>
                            <TableCell align="center">Estado</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sensors.map((sensor) => (
                            <TableRow key={sensor.id}>
                                <TableCell>
                                    {new Date(sensor.fecha_registro).toLocaleString('es-ES')}
                                </TableCell>
                                <TableCell align="right">{sensor.temperatura}</TableCell>
                                <TableCell align="right">{sensor.humedad}</TableCell>
                                <TableCell align="right">{sensor.nivel_agua}</TableCell>
                                <TableCell align="center">
                                    <Chip
                                        label={sensor.activo ? 'Activo' : 'Inactivo'}
                                        color={sensor.activo ? 'success' : 'default'}
                                        size="small"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={pagination.count}
                page={pagination.currentPage - 1}
                onPageChange={handleChangePage}
                rowsPerPage={pagination.pageSize}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage="Filas por página:"
            />
        </>
    );
};

export default TablaSensores;