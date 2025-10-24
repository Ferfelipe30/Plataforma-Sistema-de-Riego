import React from 'react';
import { Box, Typography, Button, TextField, AppBar, Container, Toolbar, Grid } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
    const navigate = useNavigate();

    const handleQuickLogin = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/login');
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Plataforma Sistema de Riego
                    </Typography>
                    <Button color="inherit" component={RouterLink} to="/login">
                        Iniciar sesión
                    </Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ py: 6 }}>
                <Grid container spacing={4} alignItems="center">
                        <Typography variant="h3" component="h1" gutterBottom>
                            Control y monitoreo de riego
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Visualiza datos de sensores, administra usuarios y controla el sistema de riego desde una interfaz sencilla.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                            <Button variant="contained" color="primary" component={RouterLink} to="/data">
                                Ver datos
                            </Button>
                            <Button variant="outlined" color="primary" component={RouterLink} to="/usuarios">
                                Usuarios
                            </Button>
                        </Box>

                        <Box
                            component="form"
                            onSubmit={handleQuickLogin}
                            noValidate
                            autoComplete="off"
                            sx={{
                                p: 3,
                                borderRadius: 2,
                                boxShadow: 3,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Acceso rápido
                            </Typography>
                            <TextField 
                                fullWidth 
                                label="Email" 
                                margin="normal" 
                                type="email"
                                name="email"
                                autoComplete="email"
                            />
                            <TextField 
                                fullWidth 
                                label="Contraseña" 
                                margin="normal" 
                                type="password"
                                name="password"
                                autoComplete="current-password"
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button 
                                    type="submit"
                                    variant="contained" 
                                    color="primary"
                                >
                                    Entrar
                                </Button>
                            </Box>
                        </Box>
                </Grid>
            </Container>
        </Box>
    );
};

export default HomeScreen;