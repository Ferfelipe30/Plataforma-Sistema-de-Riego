import React, { useEffect } from 'react';
import AutenticacionLogin from '../components/autenticacionLogin';

const LoginScreen: React.FC = () => {
  useEffect(() => {
    document.title = 'Iniciar sesión';
  }, []);

  return <AutenticacionLogin />;
};

export default LoginScreen;