import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService, logoutService, isAuthenticated as isAuthService, getCurrentUser } from '../services/services';
import type { LoginRequest, LoginResponse, User } from '../types/types';

type LoginOptions = {
  redirectTo?: string;
  showSuccess?: boolean;
  replace?: boolean;
  navigateOnSuccess?: boolean;
};

export default function useLogin() {
  const initialUser =
    getCurrentUser() ??
    (() => {
      const s = localStorage.getItem('username');
      return s ? JSON.parse(s) : null;
    })();

  const [user, setUser] = useState<User | null>(initialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => isAuthService(), [user]);

  const login = useCallback(
    async (credentials: LoginRequest, options: LoginOptions = {}): Promise<LoginResponse | null> => {
      const {
        redirectTo = '/',
        showSuccess = true,
        replace = true,
        navigateOnSuccess = true,
      } = options;

      setLoading(true);
      setError(null);

      try {
        const resp = await loginService(credentials);
        setUser(resp.user);

        if (navigateOnSuccess) {
          navigate(redirectTo, {
            replace,
            state: showSuccess ? { loginSuccess: true } : undefined,
          });
        }

        return resp;
      } catch (e: any) {
        setError(e?.message ?? 'Error al iniciar sesión');
        return null;
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const logout = useCallback(async (redirectTo: string = '/login') => {
    await logoutService();
    setUser(null);
    navigate(redirectTo, { replace: true });
  }, [navigate]);

  const resetError = useCallback(() => setError(null), []);

  return {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    resetError,
  };
}