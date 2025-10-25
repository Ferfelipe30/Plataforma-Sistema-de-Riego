import React from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Collapse, Snackbar, Alert } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import HomeScreen from './HomeScreen';
import SistemaScreen from '../commons/sistema/screens/sistemaScreens';
import UsuarioScreens from '../commons/usuario/screens/usuarioScreens';

const drawerWidth = 240;

const AppLayout: React.FC = () => {
    const [openUsuarios, setOpenUsuarios] = React.useState(false);
    const [openSistema, setOpenSistema] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        if (location.state?.loginSuccess) {
            setShowSuccessMessage(true);
        }
    }, [location]);

    const handleUsuariosClick = () => {
        setOpenUsuarios(!openUsuarios);
    };

    const handleSistemaClick = () => {
        setOpenSistema(!openSistema);
    };

    const handleCloseSnackbar = () => {
        setShowSuccessMessage(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer 
                variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ p: 2 }}>
                        Menu de Sistema de Riego
                    </Typography>
                </Toolbar>
                <List>
                    <ListItemButton component={Link} to="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>

                    <ListItemButton onClick={handleSistemaClick}>
                        <ListItemIcon>
                            <WaterDropIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sistema" />
                        {openSistema ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openSistema} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton component={Link} to="/sistema/tabla">
                                <ListItemText primary="Tabla de Sensores" />
                            </ListItemButton>
                        </List>
                    </Collapse>

                    <ListItemButton onClick={handleUsuariosClick}>
                        <ListItemIcon>
                            <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" />
                        {openUsuarios ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton component={Link} to="/usuarios">
                                <ListItemText primary="Gestión de usuarios" />
                            </ListItemButton>
                        </List>
                    </Collapse>
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/sistema/*" element={<SistemaScreen />} />
                    <Route path="/usuarios/*" element={<UsuarioScreens />} />
                </Routes>
            </Box>

            <Snackbar
                open={showSuccessMessage}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Inicio de sesión exitoso.
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default AppLayout;