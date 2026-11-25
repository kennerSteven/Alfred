import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { InputField } from '../../../shared/components/forms/InputField.tsx';
import { SelectField } from '../../../shared/components/forms/SelectField.tsx';
import { Button } from '../../../shared/components/ui/Button.tsx';
import { Badge } from '../../../shared/components/ui/Badge.tsx';
import caseService from '../services/case.service.ts';

const createCaseFormSchema = z.object({
  crimeType: z.string().min(1, 'Seleccione el tipo penal tipificado'),
  incidentDate: z.string().min(1, 'Ingrese la fecha de los hechos'),
  incidentTime: z.string().min(1, 'Ingrese la hora estimada'),
  incidentLocation: z.string().min(3, 'Ingrese el lugar del suceso'),
  suspectDocId: z.string().min(3, 'Ingrese la cédula o DNI del sospechoso'),
  suspectName: z.string().optional(),
});

type FormValues = z.infer<typeof createCaseFormSchema>;

export const CaseRegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(createCaseFormSchema),
    defaultValues: {
      crimeType: '',
      incidentDate: '',
      incidentTime: '',
      incidentLocation: '',
      suspectDocId: '',
      suspectName: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    try {
      const createdCase = await caseService.registerCase(values);
      navigate(`/cases/${createdCase.caseNumber}`);
    } catch (err: any) {
      setServerError(err.message || 'Error al registrar la denuncia penal');
    }
  };

  const crimeOptions = [
    { value: '', label: 'Seleccione el tipo penal tipificado...' },
    { value: 'Hurto Calificado', label: 'Hurto Calificado y Agravado' },
    { value: 'Homicidio', label: 'Homicidio / Tentativa' },
    { value: 'Extorsión', label: 'Extorsión y Concierto para Delinquir' },
    { value: 'Tráfico, Fabricación o Porte de Estupefacientes', label: 'Tráfico, Fabricación o Porte de Estupefacientes' },
    { value: 'Fraude Digital', label: 'Fraude Digital / Delitos Informáticos' },
  ];

  return (
    <section className="max-w-2xl mx-auto space-y-6">
      {/* ENCABEZADO DE RETORNO */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xs font-semibold text-[#5087F7] hover:underline flex items-center space-x-1"
        >
          <span>&larr; Volver al Dashboard</span>
        </Link>
        <Badge variant="lightBlue">Exclusivo Investigador</Badge>
      </div>

      {/* TARJETA BLANCA AL CENTRO CON CAMPOS PLANOS */}
      <div className="bg-white border border-[#BDC7D7] rounded p-8">
        <div className="border-b border-[#BDC7D7] pb-4 mb-6">
          <h2 className="text-lg font-bold text-[#120B8F]">
            Registro de Nueva Denuncia Penal
          </h2>
          <p className="text-xs text-[#120B8F]/70 mt-1">
            Ingrese los datos fácticos para la generación automática de la ruta metodológica pericial.
          </p>
        </div>

        {serverError && (
          <div className="mb-4 p-3 border border-red-300 bg-red-50 text-red-700 text-xs rounded font-medium">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <SelectField
            label="Tipo de Delito"
            options={crimeOptions}
            error={errors.crimeType?.message}
            {...register('crimeType')}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Fecha de los Hechos"
              type="date"
              error={errors.incidentDate?.message}
              {...register('incidentDate')}
            />

            <InputField
              label="Hora Estimada"
              type="time"
              error={errors.incidentTime?.message}
              {...register('incidentTime')}
            />
          </div>

          <InputField
            label="Lugar del Suceso"
            placeholder="Ej. Av. Libertador 1420, Sector Centro, Sucursal Norte"
            error={errors.incidentLocation?.message}
            {...register('incidentLocation')}
          />

          <InputField
            label="Cédula / Documento de Identidad del Implicado"
            placeholder="Cédula de identidad o DNI (si se conoce)"
            helperText="El sistema verificará automáticamente correlaciones con la base de datos nacional."
            error={errors.suspectDocId?.message}
            {...register('suspectDocId')}
          />

          <InputField
            label="Nombre Completo del Sospechoso (Opcional)"
            placeholder="Nombre y apellidos del presunto implicado"
            error={errors.suspectName?.message}
            {...register('suspectName')}
          />

          <div className="pt-4 border-t border-[#BDC7D7] flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => navigate('/dashboard')}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
            >
              Generar Ruta Investigativa
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CaseRegisterForm;
