import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.ts';
import { MainLayout } from '../layouts/MainLayout.tsx';
import { ProtectedRoute } from './ProtectedRoute.tsx';
import { LoginPage } from '../../features/auth/pages/LoginPage.tsx';
import { CaseRegisterForm } from '../../features/cases/components/CaseRegisterForm.tsx';
import { CaseDetailView } from '../../features/cases/components/CaseDetailView.tsx';
import { DashboardPage } from '../../features/dashboard/pages/DashboardPage.tsx';

export const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* RUTA PÚBLICA DE LOGIN */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
          }
        />

        {/* RUTAS PROTEGIDAS CON EL LAYOUT INSTITUCIONAL */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/cases/:caseId" element={<CaseDetailView />} />
                  <Route
                    path="/cases/new"
                    element={
                      <ProtectedRoute allowedRoles={['INVESTIGADOR']}>
                        <CaseRegisterForm />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
