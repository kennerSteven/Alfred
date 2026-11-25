import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './features/auth/context/AuthContext.tsx';
import { AppRouter } from './app/router/AppRouter.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
