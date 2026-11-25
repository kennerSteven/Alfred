import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.ts';
import { UserRole } from '../../shared/types/api.types.ts';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { role, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex items-center space-x-2 text-sm text-[#120B8F]">
          <div className="w-4 h-4 rounded-full border-2 border-[#5087F7] border-t-transparent animate-spin" />
          <span>Validando credenciales...</span>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir a /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si el rol no tiene permiso para la ruta (ej. Fiscal intentando entrar a /cases/new)
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};
