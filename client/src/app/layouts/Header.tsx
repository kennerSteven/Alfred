import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.ts';
import { NewCaseModal } from '../../features/cases/components/NewCaseModal.tsx';

export const Header: React.FC = () => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isInvestigator = role === 'INVESTIGADOR';

  return (
    <>
      <header className="bg-white border-b border-[#BDC7D7]/70 sticky top-0 z-40 transition-all shadow-xs py-2 px-6 sm:px-10 lg:px-14">
        <div className="w-full flex items-center justify-between">
          
          {/* LADO IZQUIERDO: LOGO E ÍCONO DE ALFRED AL TODO DE LA IZQUIERDA */}
          <div className="flex items-center">
            <NavLink to="/dashboard" className="flex items-center group">
              <img
                src="/logo.png"
                alt="Logo Alfred SIC"
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </NavLink>
          </div>

          {/* CENTRO: OPCIONES DE INICIO Y NUEVA DENUNCIA */}
          <nav className="flex items-center space-x-3">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-2 rounded-xl text-[#120B8F] bg-[#5087F7]/12 font-black text-sm tracking-wide shadow-2xs'
                  : 'px-4 py-2 rounded-xl text-[#120B8F]/75 hover:text-[#120B8F] hover:bg-[#F8FAFC] font-bold text-sm tracking-wide transition-all'
              }
            >
              Inicio
            </NavLink>

            {isInvestigator && (
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#5087F7] hover:bg-[#3f76e5] text-white font-bold text-sm shadow-xs hover:shadow-sm transition-all cursor-pointer flex items-center space-x-1.5 active:scale-95"
              >
                <span>+</span>
                <span>Nueva Denuncia</span>
              </button>
            )}
          </nav>

          {/* LADO DERECHO: USUARIO AL TODO DE LA DERECHA Y SALIR EN ROJO CON ÍCONO */}
          <div className="flex items-center space-x-5">
            {/* PERFIL */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#5087F7]/15 text-[#5087F7] flex items-center justify-center font-black text-sm shadow-2xs">
                {user?.fullName?.charAt(0) || 'U'}
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-xs font-black text-[#120B8F] block leading-tight">
                  {user?.fullName}
                </span>
                <span className="text-[10px] font-bold text-[#5087F7] block leading-tight mt-0.5">
                  {isInvestigator ? 'Investigador' : 'Fiscal'} • {user?.badgeNumber}
                </span>
              </div>
            </div>

            {/* BOTÓN SALIR CON ÍCONO EN ROJO */}
            <button
              type="button"
              onClick={handleLogout}
              title="Cerrar sesión"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-rose-600 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/80 text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
            >
              <svg
                className="w-4 h-4 text-rose-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Salir</span>
            </button>
          </div>

        </div>
      </header>

      {/* MODAL GLOBAL PARA NUEVA DENUNCIA */}
      <NewCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Header;
