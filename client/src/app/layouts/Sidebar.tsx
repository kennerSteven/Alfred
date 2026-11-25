import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth.ts';

interface SidebarProps {
  onOpenNewCase: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenNewCase }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isInvestigator = role === 'INVESTIGADOR';

  return (
    <div className="p-4 sm:p-5 shrink-0 select-none">
      <aside className="w-64 bg-white/95 backdrop-blur-md border border-[#BDC7D7]/80 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex flex-col h-[calc(100vh-2.5rem)] sticky top-5 overflow-hidden">
        {/* BRAND / HEADER */}
        <div className="px-4 py-6 border-b border-[#BDC7D7]/50 flex items-center justify-center">
          <NavLink to="/dashboard" className="flex items-center justify-center group w-full">
            <img
              src="/logo.png"
              alt="Logo Alfred SIC"
              className="h-28 w-auto max-w-[85%] object-contain group-hover:scale-105 transition-transform"
            />
          </NavLink>
        </div>

        {/* NAVEGACIÓN Y ACCIÓN PRINCIPAL */}
        <div className="p-4 space-y-3 flex-1 flex flex-col justify-start">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${
                isActive
                  ? 'bg-[#5087F7]/12 text-[#120B8F] shadow-2xs'
                  : 'text-[#120B8F]/75 hover:text-[#120B8F] hover:bg-[#F8FAFC]'
              }`
            }
          >
            <svg
              className="w-5 h-5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Inicio</span>
          </NavLink>

          {isInvestigator && (
            <button
              type="button"
              onClick={onOpenNewCase}
              className="w-full py-3 px-4 bg-[#5087F7] hover:bg-[#3f76e5] text-white text-sm font-bold rounded-2xl shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95"
            >
              <svg
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              <span>Nueva Denuncia</span>
            </button>
          )}
        </div>

        {/* PIE DEL SIDEBAR: USUARIO Y SALIR */}
        <div className="p-4 border-t border-[#BDC7D7]/50 bg-[#F8FAFC]/50 space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5087F7]/15 text-[#5087F7] flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">
              {user?.fullName?.charAt(0) || 'U'}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-black text-[#120B8F] block truncate leading-tight">
                {user?.fullName}
              </span>
              <span className="text-[10px] font-bold text-[#5087F7] block truncate leading-tight mt-0.5">
                {isInvestigator ? 'Investigador' : 'Fiscal'} • {user?.badgeNumber}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-2xl text-rose-600 bg-rose-50/70 hover:bg-rose-100/80 border border-rose-200/80 text-xs font-bold transition-all shadow-2xs hover:shadow-xs cursor-pointer active:scale-95"
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
      </aside>
    </div>
  );
};

export default Sidebar;
