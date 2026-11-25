import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { InputField } from '../../../shared/components/forms/InputField.tsx';
import { Button } from '../../../shared/components/ui/Button.tsx';

const loginSchema = z.object({
  email: z.string().email('Ingrese un correo institucional válido'),
  password: z.string().min(1, 'Ingrese su contraseña'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setServerError(null);
    try {
      await login(values.email, values.password);
      navigate('/dashboard');
    } catch (err: any) {
      setServerError(err.message || 'Credenciales institucionales incorrectas');
    }
  };

  const fillQuickCredentials = (email: string) => {
    setValue('email', email);
    setValue('password', 'alfred2026');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FAFC] via-[#F8FAFC] to-[#8BCFF1]/15 text-[#120B8F] flex flex-col justify-center items-center p-6 selection:bg-[#8BCFF1]">
      <div className="w-full max-w-md space-y-6">
        
        {/* LOGO INSTITUCIONAL */}
        <div className="text-center space-y-2">
          <img
            src="/logo.png"
            alt="Logo Alfred SIC"
            className="inline-block h-36 w-auto max-w-full object-contain drop-shadow-md"
          />
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#120B8F]/70 font-semibold mt-1">
              Sistema Automatizado de Investigación Criminalística
            </p>
          </div>
        </div>

        {/* TARJETA BLANCA FORMULARIO */}
        <div className="bg-white border border-[#BDC7D7]/70 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="border-b border-[#BDC7D7]/60 pb-3">
            <h2 className="text-base font-bold text-[#120B8F]">
              Control de Acceso Seguro
            </h2>
            <p className="text-xs text-[#120B8F]/70 mt-0.5">
              Ingrese con sus credenciales institucionales habilitadas.
            </p>
          </div>

          {serverError && (
            <div className="p-3.5 border border-rose-300 bg-rose-50 text-rose-700 text-xs rounded-xl font-medium">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              label="Correo Electrónico Institucional"
              placeholder="Ej. usuario@policia.gob o usuario@fiscalia.gob"
              error={errors.email?.message}
              {...register('email')}
            />

            <InputField
              label="Contraseña"
              type="password"
              placeholder="Ingrese su contraseña..."
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2 shadow-sm hover:shadow-md"
              isLoading={isSubmitting}
            >
              Ingresar al Sistema
            </Button>
          </form>

          {/* ACCESOS RÁPIDOS PARA PRUEBA DE ROLES */}
          <div className="pt-4 border-t border-[#BDC7D7]/60 space-y-2.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/60 block text-center">
              Perfiles de Prueba Preconfigurados:
            </span>

            <div className="grid grid-cols-2 gap-2 text-left">
              <button
                type="button"
                onClick={() => fillQuickCredentials('carlos.mendoza@policia.gob')}
                className="p-2.5 border border-[#BDC7D7]/60 rounded-xl bg-[#F8FAFC] hover:bg-white hover:border-[#5087F7]/60 transition-all text-left shadow-2xs hover:shadow-xs group"
              >
                <span className="text-[10px] font-bold text-[#5087F7] block uppercase group-hover:translate-x-0.5 transition-transform">
                  Investigador
                </span>
                <span className="text-xs font-semibold text-[#120B8F] block truncate mt-0.5">
                  Insp. C. Mendoza
                </span>
                <span className="text-[10px] text-[#120B8F]/60 block truncate">
                  carlos.mendoza@policia.gob
                </span>
              </button>

              <button
                type="button"
                onClick={() => fillQuickCredentials('elena.restrepo@fiscalia.gob')}
                className="p-2.5 border border-[#BDC7D7]/60 rounded-xl bg-[#F8FAFC] hover:bg-white hover:border-[#10B981]/60 transition-all text-left shadow-2xs hover:shadow-xs group"
              >
                <span className="text-[10px] font-bold text-emerald-600 block uppercase group-hover:translate-x-0.5 transition-transform">
                  Fiscal Titular
                </span>
                <span className="text-xs font-semibold text-[#120B8F] block truncate mt-0.5">
                  Dra. E. Restrepo
                </span>
                <span className="text-[10px] text-[#120B8F]/60 block truncate">
                  elena.restrepo@fiscalia.gob
                </span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
