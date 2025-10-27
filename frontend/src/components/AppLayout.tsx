import React from "react";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Collapse, Snackbar, Alert, IconButton } from '@mui/material';
import { BarChart3 } from "lucide-react";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MenuIcon from '@mui/icons-material/Menu';
import HomeScreen from './HomeScreen';
import SistemaScreen from '../commons/sistema/screens/sistemaScreens';
import UsuarioScreens from '../commons/usuario/screens/usuarioScreens';
import DashboardScreen from "../commons/analisisDatos/screens/analisisDatosScreens";

const drawerWidth = 240;
const miniWidth = (theme: any) => `calc(${theme.spacing(7)} + 1px)`;

export const AppLayout: React.FC = () => {
    const [openUsuarios, setOpenUsuarios] = React.useState(false);
    const [openSistema, setOpenSistema] = React.useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(true);
    const location = useLocation();

    React.useEffect(() => {
        if (location.state?.loginSuccess) {
            setShowSuccessMessage(true);
        }
    }, [location]);

    const handleUsuariosClick = () => setOpenUsuarios((v) => !v);
    const handleSistemaClick = () => setOpenSistema((v) => !v);
    const handleCloseSnackbar = () => setShowSuccessMessage(false);

    const toggleDrawer = () => {
        setDrawerOpen((v) => !v);

        if (drawerOpen) {
            setOpenUsuarios(false);
            setOpenSistema(false);
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer 
                variant="permanent" 
                sx={(theme) => ({ 
                    width: drawerOpen ? drawerWidth : miniWidth(theme), 
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerOpen ? drawerWidth : miniWidth(theme),
                        boxSizing: 'border-box',
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    },
                })}>
                <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: drawerOpen ? 'space-between' : 'center' }}>
                    {drawerOpen && (
                        <Typography variant="h6" noWrap component="div" sx={{ pl: 1 }}>
                        Menú
                        </Typography>
                    )}
                    <IconButton onClick={toggleDrawer} size="small">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                <List>
                    <ListItemButton
                        component={Link}
                        to="/"
                        sx={{
                        minHeight: 48,
                        justifyContent: drawerOpen ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: drawerOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                    </ListItemButton>

                    <ListItemButton
                        component={Link}
                        to="/analisis-datos"
                        selected={location.pathname.startsWith('/analisis-datos')}
                        sx={{
                            minHeight: 48,
                            justifyContent: drawerOpen ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                            minWidth: 0,
                            mr: drawerOpen ? 3 : 'auto',
                            justifyContent: 'center',
                            }}
                        >
                            <BarChart3 />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                    </ListItemButton>

                    <ListItemButton
                        onClick={handleSistemaClick}
                        sx={{
                        minHeight: 48,
                        justifyContent: drawerOpen ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: drawerOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <WaterDropIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sistema" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                        {drawerOpen ? (openSistema ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>

                    {drawerOpen && (
                        <Collapse in={openSistema} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton
                            component={Link}
                            to="/sistema/tabla"
                            sx={{ pl: 4 }}
                            >
                            <ListItemText primary="Tabla de Sensores" />
                            </ListItemButton>
                        </List>
                        </Collapse>
                    )}

                    <ListItemButton
                        onClick={handleUsuariosClick}
                        sx={{
                        minHeight: 48,
                        justifyContent: drawerOpen ? 'initial' : 'center',
                        px: 2.5,
                        }}
                    >
                        <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: drawerOpen ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                        >
                        <PersonIcon />
                        </ListItemIcon>
                        <ListItemText primary="Usuarios" sx={{ opacity: drawerOpen ? 1 : 0 }} />
                        {drawerOpen ? (openUsuarios ? <ExpandLess /> : <ExpandMore />) : null}
                    </ListItemButton>

                    {drawerOpen && (
                        <Collapse in={openUsuarios} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton component={Link} to="/usuarios" sx={{ pl: 4 }}>
                            <ListItemText primary="Gestión de usuarios" />
                            </ListItemButton>
                        </List>
                        </Collapse>
                    )}
                    </List>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/analisis-datos/*" element={<DashboardScreen />} />
                    <Route path="/sistema/*" element={<SistemaScreen />} />
                    <Route path="/usuarios/*" element={<UsuarioScreens />} />
                    </Routes>
                </Box>

                <Snackbar
                    open={showSuccessMessage}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                    Inicio de sesión exitoso.
                    </Alert>
                </Snackbar>
        </Box>
    );
};

export default AppLayout;