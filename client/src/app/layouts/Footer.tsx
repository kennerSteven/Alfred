import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#BDC7D7] bg-white py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-[#120B8F]/70 space-y-2 sm:space-y-0">
        <div>
          <strong className="text-[#120B8F]">Alfred SIC</strong> — Sistema Automatizado de Investigación Criminalística
        </div>
        <div>
          Plataforma de Coordinación Procesal y Pericial
        </div>
      </div>
    </footer>
  );
};
