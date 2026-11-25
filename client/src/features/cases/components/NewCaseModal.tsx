import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { InputField } from '../../../shared/components/forms/InputField.tsx';
import { SelectField } from '../../../shared/components/forms/SelectField.tsx';
import { Button } from '../../../shared/components/ui/Button.tsx';
import { Modal } from '../../../shared/components/ui/Modal.tsx';
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

export interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCaseCreated?: () => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  onCaseCreated,
}) => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
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
      reset();
      onClose();
      if (onCaseCreated) {
        onCaseCreated();
      }
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Registro de Nueva Denuncia Penal"
      subtitle="Complete los datos fácticos para la generación automática de la ruta metodológica"
      maxWidth="2xl"
    >
      {serverError && (
        <div className="mb-4 p-3.5 border border-rose-300 bg-rose-50 text-rose-700 text-xs rounded-xl font-medium">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SelectField
          label="Tipo de Delito"
          options={crimeOptions}
          error={errors.crimeType?.message}
          {...register('crimeType')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Fecha del Suceso"
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
          placeholder="Ej. Av. Libertador 1420, Sector Centro"
          error={errors.incidentLocation?.message}
          {...register('incidentLocation')}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Cédula / Documento de Identidad"
            placeholder="Cédula o DNI del sospechoso"
            helperText="Verificación automática de coincidencias"
            error={errors.suspectDocId?.message}
            {...register('suspectDocId')}
          />

          <InputField
            label="Nombre del Sospechoso"
            placeholder="Nombre y apellidos (si se conoce)"
            error={errors.suspectName?.message}
            {...register('suspectName')}
          />
        </div>

        <div className="pt-5 border-t border-[#BDC7D7]/60 flex items-center justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isSubmitting}
            className="shadow-sm hover:shadow-md"
          >
            Generar Ruta Pericial
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewCaseModal;
