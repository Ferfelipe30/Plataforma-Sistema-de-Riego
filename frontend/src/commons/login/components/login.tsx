import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert, InputAdornment, IconButton, Paper, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const { login, loading, error, resetError } = useLogin();
  const [values, setValues] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState<{ email?: boolean; password?: boolean }>({});
  const [showPassword, setShowPassword] = useState(false);

  const errors = {
    email: touched.email && !values.email ? 'El email es requerido' : '',
    password: touched.password && !values.password ? 'La contraseña es requerida' : '',
  };

  const hasFormErrors = Boolean(errors.email || errors.password);

  const handleChange =
    (field: 'email' | 'password') =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (error) resetError();
      setValues((v) => ({ ...v, [field]: e.target.value }));
    };

  const handleBlur = (field: 'email' | 'password') => () => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (hasFormErrors) return;

    await login(
      { email: values.email.trim(), password: values.password },
      { redirectTo: '/', showSuccess: true, replace: true, navigateOnSuccess: true }
    );
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', bgcolor: (t) => t.palette.background.default, p: 2 }}>
      <Paper elevation={3} sx={{ width: '100%', maxWidth: 420, p: 4 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Iniciar sesión
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" noValidate onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            onBlur={handleBlur('email')}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
            margin="normal"
            autoFocus
            autoComplete="email"
            disabled={loading}
          />

          <TextField
            label="Contraseña"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            onBlur={handleBlur('password')}
            error={Boolean(errors.password)}
            helperText={errors.password}
            fullWidth
            margin="normal"
            autoComplete="current-password"
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                    onClick={() => setShowPassword((s) => !s)}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : undefined}
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};