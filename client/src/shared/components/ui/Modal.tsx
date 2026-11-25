import React, { useEffect } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'xl',
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const maxWidthStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* TELÓN CON BLUR */}
      <div
        className="fixed inset-0 bg-[#120B8F]/35 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div
          className={`relative w-full ${maxWidthStyles[maxWidth]} transform overflow-hidden rounded-3xl bg-white border border-[#BDC7D7]/80 shadow-2xl transition-all animate-fadeIn`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER MODAL */}
          <div className="px-7 pt-6 pb-4 border-b border-[#BDC7D7]/60 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-black tracking-tight text-[#120B8F]">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-[#120B8F]/70 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#BDC7D7]/60 text-[#120B8F]/70 hover:text-[#120B8F] hover:bg-white flex items-center justify-center transition-all text-sm font-bold shadow-2xs hover:shadow-xs"
            >
              ✕
            </button>
          </div>

          {/* CUERPO MODAL */}
          <div className="px-7 py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
