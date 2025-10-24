import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import Login from './login';

export default function AutenticacionLogin() {
  const { isAuthenticated } = useLogin();
  const location = useLocation();

  useEffect(() => {
    document.title = 'Iniciar sesión';
  }, []);

  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return <Login />;
}