import React from 'react';
import { Card, CardContent, Typography, Switch, FormControlLabel, Box } from '@mui/material';
import WaterIcon from '@mui/icons-material/Water';
import type { EstadoRiego } from '../types/types';
import useSistema from '../hooks/useSistema';

interface ControlRiegoProps {
    estadoRiego: EstadoRiego | null;
}

const ControlRiego: React.FC<ControlRiegoProps> = ({ estadoRiego }) => {
    const { updateEstadoRiego } = useSistema();

    const handleToggleActivo = async () => {
        if (estadoRiego) {
            await updateEstadoRiego({ activo: !estadoRiego.activo });
        }
    };

    const handleToggleModo = async () => {
        if (estadoRiego) {
            await updateEstadoRiego({ 
                modo: estadoRiego.modo === 'automatico' ? 'manual' : 'automatico' 
            });
        }
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                    <Typography color="textSecondary">
                        Control de Riego
                    </Typography>
                    <WaterIcon sx={{ fontSize: 40, color: 'success.main' }} />
                </Box>
                <FormControlLabel
                    control={
                        <Switch
                            checked={estadoRiego?.activo ?? false}
                            onChange={handleToggleActivo}
                            color="primary"
                        />
                    }
                    label="Activar Riego"
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={estadoRiego?.modo === 'automatico'}
                            onChange={handleToggleModo}
                            color="secondary"
                        />
                    }
                    label="Modo Automático"
                />
            </CardContent>
        </Card>
    );
};

export default ControlRiego;