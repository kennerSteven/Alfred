import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../../../shared/types/api.types.ts';
import authService from '../services/auth.service.ts';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  switchRoleDev: (targetRole: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const cached = localStorage.getItem('alfred_auth_user');
    return cached ? JSON.parse(cached) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Inicializar sesión validando el token
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('alfred_auth_token');
      if (token) {
        try {
          const profile = await authService.getProfile();
          setUser(profile);
          localStorage.setItem('alfred_auth_user', JSON.stringify(profile));
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password = 'alfred2026') => {
    setIsLoading(true);
    try {
      const { token, user: loggedUser } = await authService.login({ email, password });
      localStorage.setItem('alfred_auth_token', token);
      localStorage.setItem('alfred_auth_user', JSON.stringify(loggedUser));
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('alfred_auth_token');
    localStorage.removeItem('alfred_auth_user');
    setUser(null);
  };

  const switchRoleDev = async (targetRole: UserRole) => {
    const email =
      targetRole === 'INVESTIGADOR'
        ? 'carlos.mendoza@policia.gob'
        : 'elena.restrepo@fiscalia.gob';
    await login(email, 'alfred2026');
  };

  const currentRole: UserRole = user?.role || 'INVESTIGADOR';

  return (
    <AuthContext.Provider
      value={{
        user,
        role: currentRole,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        switchRoleDev,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};
