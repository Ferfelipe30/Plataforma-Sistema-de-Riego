import React from 'react';
import { Box, Typography, Button, AppBar, Container, Toolbar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleQuickLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <Box sx={{ textAlign: 'center', mt: 4, bgcolor: 'background.default' }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Plataforma Sistema de Riego
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/login">
                        Iniciar sesión
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 10 }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Bienvenido a la Plataforma del Sistema de Riego
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    Monitorea y controla tu sistema de riego de manera eficiente y sencilla.
                </Typography>

                <Container sx={{ py: 6 }}>
                    <Box sx={{ maxWidth: 920, mx: 'auto', mb: 6 }}>
                        <Typography variant="h3" gutterBottom>
                            Monitoreo y gestión inteligente de riego
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Visualiza datos de sensores en tiempo real, administra usuarios y roles, genera alertas y optimiza el uso del agua en tus cultivos.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4, flexWrap: 'wrap' }}>
                            <Button variant="contained" size="large" component={RouterLink} to="/sistema">
                                Ver datos del sistema
                            </Button>
                            <Button variant="outlined" size="large" component={RouterLink} to="/usuarios">
                                Gestión de usuarios
                            </Button>
                        </Box>
                    </Box>

                    <Box sx={{ mt: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                            ¿Nuevo en la plataforma? Inicia sesión para acceder a todas las funciones disponibles.
                        </Typography>
                        <Button sx={{ mt: 2 }} variant="text" component={RouterLink} to="/login" onClick={handleQuickLogin}>
                            Ir a iniciar sesión
                        </Button>
                    </Box>
                </Container>
            </Container>
        </Box>
    );
};

export default HomeScreen;