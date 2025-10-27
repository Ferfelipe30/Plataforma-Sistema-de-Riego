import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import type { DataSensor } from '../types/types';
import { createSistema } from '../services/services';

interface CreateSensorProps {
    open: boolean;
    initialData?: Partial<DataSensor>;
    onClose: () => void;
    onSuccess: () => void;
}

const SistemaModal: React.FC<CreateSensorProps> = ({ open, initialData, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        temperatura_ambiental: 0,
        humedad_relativa: 0,
        humedad_suelo: 0,
        calidad_aire: 0,
        temperatura_agua: 0,
    });
    
    useEffect(() => {
        if (initialData) {
            setFormData({
                temperatura_ambiental: initialData.temperatura_ambiental ?? 0,
                humedad_relativa: initialData.humedad_relativa ?? 0,
                humedad_suelo: initialData.humedad_suelo ?? 0,
                calidad_aire: initialData.calidad_aire ?? 0,
                temperatura_agua: initialData.temperatura_agua ?? 0,
            });
        } else {
            setFormData({
                temperatura_ambiental: 0,
                humedad_relativa: 0,
                humedad_suelo: 0,
                calidad_aire: 0,
                temperatura_agua: 0,
            });
        }
    }, [initialData, open]);

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        
        try {
            // Validaciones
            if (formData.temperatura_ambiental < -50 || formData.temperatura_ambiental > 60) {
                setError('La temperatura ambiental debe estar entre -50°C y 60°C');
                setLoading(false);
                return;
            }
            if (formData.humedad_relativa < 0 || formData.humedad_relativa > 100) {
                setError('La humedad relativa debe estar entre 0% y 100%');
                setLoading(false);
                return;
            }
            if (formData.humedad_suelo < 0 || formData.humedad_suelo > 100) {
                setError('La humedad del suelo debe estar entre 0% y 100%');
                setLoading(false);
                return;
            }
            if (formData.temperatura_agua < 0 || formData.temperatura_agua > 50) {
                setError('La temperatura del agua debe estar entre 0°C y 50°C');
                setLoading(false);
                return;
            }

            // Crear nuevo registro
            const created = await createSistema(formData as any);
            setSuccess(`Datos del sensor creados exitosamente: ID ${created.data.ID}`);
            
            // Esperar un momento para mostrar el mensaje de éxito
            setTimeout(() => {
                onSuccess();
                onClose();
                // Resetear formulario
                setFormData({
                    temperatura_ambiental: 0,
                    humedad_relativa: 0,
                    humedad_suelo: 0,
                    calidad_aire: 0,
                    temperatura_agua: 0,
                });
            }, 1500);
        } catch (err: any) {
            console.error('Error al crear:', err);
            if (err.response && err.response.data && err.response.data.details) {
                setError(err.response.data.details);
            } else if (err.detail) {
                setError(err.detail);
            } else {
                setError('Error al procesar la petición. Verifique los datos ingresados.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setFormData({
            temperatura_ambiental: 0,
            humedad_relativa: 0,
            humedad_suelo: 0,
            calidad_aire: 0,
            temperatura_agua: 0,
        });
        setError(null);
        setSuccess(null);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Registrar Datos del Sensor</DialogTitle>
            <DialogContent>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        label="Temperatura Ambiental (°C)"
                        name="temperatura_ambiental"
                        type="number"
                        value={formData.temperatura_ambiental}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ step: "0.1", min: "-50", max: "60" }}
                        helperText="Rango: -50°C a 60°C"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Humedad Relativa (%)"
                        name="humedad_relativa"
                        type="number"
                        value={formData.humedad_relativa}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ step: "0.1", min: "0", max: "100" }}
                        helperText="Rango: 0% a 100%"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Humedad del Suelo (%)"
                        name="humedad_suelo"
                        type="number"
                        value={formData.humedad_suelo}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ step: "0.1", min: "0", max: "100" }}
                        helperText="Rango: 0% a 100%"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Calidad del Aire (ppm)"
                        name="calidad_aire"
                        type="number"
                        value={formData.calidad_aire}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ step: "0.1", min: "0" }}
                        helperText="Partes por millón (ppm)"
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Temperatura del Agua (°C)"
                        name="temperatura_agua"
                        type="number"
                        value={formData.temperatura_agua}
                        onChange={handleChange}
                        fullWidth
                        required
                        inputProps={{ step: "0.1", min: "0", max: "50" }}
                        helperText="Rango: 0°C a 50°C"
                        sx={{ mb: 2 }}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" disabled={loading}>
                            Cancelar
                        </Button>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default SistemaModal;