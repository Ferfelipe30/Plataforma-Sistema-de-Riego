import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

interface TarjetaSensorProps {
    titulo: string;
    valor?: number;
    unidad: string;
    icono: 'temperature' | 'humidity' | 'water';
}

const TarjetaSensor: React.FC<TarjetaSensorProps> = ({ titulo, valor, unidad, icono }) => {
    const getIcon = () => {
        switch (icono) {
            case 'temperature':
                return <ThermostatIcon sx={{ fontSize: 40, color: 'error.main' }} />;
            case 'humidity':
                return <OpacityIcon sx={{ fontSize: 40, color: 'info.main' }} />;
            case 'water':
                return <WaterDropIcon sx={{ fontSize: 40, color: 'primary.main' }} />;
        }
    };

    return (
        <Card>
            <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography color="textSecondary" gutterBottom>
                            {titulo}
                        </Typography>
                        <Typography variant="h4">
                            {valor !== undefined ? `${valor} ${unidad}` : 'N/A'}
                        </Typography>
                    </Box>
                    {getIcon()}
                </Box>
            </CardContent>
        </Card>
    );
};

export default TarjetaSensor;