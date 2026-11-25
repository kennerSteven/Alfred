import React, { useState } from 'react';
import { Sidebar } from './Sidebar.tsx';
import { NewCaseModal } from '../../features/cases/components/NewCaseModal.tsx';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#120B8F] flex antialiased selection:bg-[#8BCFF1]/60 selection:text-[#120B8F]">
      {/* SIDEBAR CON TODAS LAS OPCIONES */}
      <Sidebar onOpenNewCase={() => setIsModalOpen(true)} />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="p-8 lg:p-10 max-w-7xl w-full mx-auto flex-1">
          {children}
        </main>
      </div>

      {/* MODAL GLOBAL PARA NUEVA DENUNCIA */}
      <NewCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MainLayout;
