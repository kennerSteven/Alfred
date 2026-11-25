import React, { useState } from 'react';
import { InvestigativeTask } from '../types/route.types.ts';
import routeService from '../services/route.service.ts';
import { UserRole } from '../../../shared/types/api.types.ts';
import { Button } from '../../../shared/components/ui/Button.tsx';

export interface RouteChecklistProps {
  caseNumber: string;
  tasks: InvestigativeTask[];
  currentRole: UserRole;
  caseStatus: string;
  onStatusChange: (newStatus: 'VALIDACION_PENDIENTE' | 'APROBADO_ELEVADO') => void;
}

export const RouteChecklist: React.FC<RouteChecklistProps> = ({
  caseNumber,
  tasks: initialTasks,
  currentRole,
  caseStatus,
  onStatusChange,
}) => {
  const [tasks, setTasks] = useState<InvestigativeTask[]>(initialTasks);
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isInvestigator = currentRole === 'INVESTIGADOR';

  const showFeedback = (message: string, type: 'success' | 'error' = 'success') => {
    setFeedback({ message, type });
    setTimeout(() => {
      setFeedback(null);
    }, 5000);
  };

  const handleToggle = async (taskId: string) => {
    if (!isInvestigator) return;

    try {
      const updated = await routeService.toggleTask(taskId);
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, isCompleted: updated.isCompleted } : t))
      );
    } catch (err: any) {
      showFeedback(err.message || 'Error al actualizar estado de la diligencia', 'error');
    }
  };

  const handleRequestValidation = async () => {
    setIsSubmitting(true);
    try {
      await routeService.requestValidation(caseNumber);
      onStatusChange('VALIDACION_PENDIENTE');
      showFeedback('Ruta investigativa enviada al Despacho Fiscal exitosamente. Estado actualizado a "Validación Pendiente".');
    } catch (err: any) {
      showFeedback(err.message || 'Error al solicitar validación', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApproveRoute = async () => {
    setIsSubmitting(true);
    try {
      await routeService.approveRoute(caseNumber);
      onStatusChange('APROBADO_ELEVADO');
      showFeedback('Ruta procesal aprobada formalmente. Expediente elevado a etapa de formalización / juicio oral.');
    } catch (err: any) {
      showFeedback(err.message || 'Error al aprobar la ruta procesal', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#BDC7D7]/70 rounded-3xl p-8 sm:p-10 shadow-sm space-y-8">
      {/* HEADER DE LA SECCIÓN */}
      <div className="border-b border-[#BDC7D7]/60 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-black text-sm tracking-wide text-[#120B8F]">
            Ruta Investigativa Pericial
          </h2>
          <p className="text-xs text-[#120B8F]/65 mt-0.5">
            Diligencias ordenadas y trazabilidad pericial para el esclarecimiento
          </p>
        </div>

        <div>
          {isInvestigator ? (
            <span className="text-[11px] font-bold px-3 py-1 bg-[#5087F7]/10 text-[#5087F7] rounded-lg border border-[#5087F7]/20">
              Checklist Interactivo
            </span>
          ) : (
            <span className="text-[11px] font-bold px-3 py-1 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
              Solo Lectura (Control Fiscal)
            </span>
          )}
        </div>
      </div>

      {/* LISTADO DE TAREAS CON DISEÑO MODERNO Y ESPACIOSO */}
      <div className="space-y-3.5" id="checklist-container">
        {tasks.map((task, index) => (
          <label
            key={task.id}
            onClick={(e) => {
              if (!isInvestigator) {
                e.preventDefault();
              }
            }}
            className={`flex items-start gap-4 p-4.5 sm:p-5 rounded-2xl border transition-all duration-200 ${
              task.isCompleted
                ? 'bg-[#10B981]/5 border-[#10B981]/30'
                : 'bg-white border-[#BDC7D7]/60 hover:border-[#5087F7]/50 hover:shadow-2xs'
            } ${
              isInvestigator ? 'cursor-pointer' : 'cursor-default opacity-85'
            }`}
          >
            <div className="pt-0.5 shrink-0">
              <input
                type="checkbox"
                checked={task.isCompleted}
                disabled={!isInvestigator}
                onChange={() => handleToggle(task.id)}
                className="task-checkbox h-5 w-5 rounded-lg border-[#BDC7D7] text-[#5087F7] focus:ring-[#5087F7] transition-all cursor-pointer"
              />
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold text-[#5087F7]">
                  {String(index + 1).padStart(2, '0')}.
                </span>
                <span className="font-bold text-sm text-[#120B8F] leading-snug">
                  {task.title}
                </span>
              </div>
              
              {task.isCompleted ? (
                <span className="text-xs text-[#10B981] font-medium block">
                  ✓ Diligencia ejecutada y registrada en el expediente
                </span>
              ) : (
                <span className="text-xs text-[#120B8F]/65 block leading-relaxed">
                  {task.description || task.legalBasis || 'Diligencia pericial ordenada'}
                </span>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* ACCIÓN INFERIOR */}
      <div className="pt-6 border-t border-[#BDC7D7]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="text-xs text-[#120B8F]/70 max-w-md leading-relaxed">
          {isInvestigator
            ? 'Marque las diligencias ejecutadas en campo y remita la ruta concluida a revisión del despacho fiscal.'
            : 'Como Fiscal titular, valide la suficiencia pericial para elevar la causa o devolver con observaciones.'}
        </div>

        <div className="shrink-0">
          {isInvestigator ? (
            <Button
              type="button"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={caseStatus === 'VALIDACION_PENDIENTE' || caseStatus === 'APROBADO_ELEVADO'}
              onClick={handleRequestValidation}
              className="w-full sm:w-auto shadow-sm hover:shadow-md px-6 py-3"
            >
              {caseStatus === 'VALIDACION_PENDIENTE'
                ? 'Validación Ya Solicitada'
                : 'Marcar tareas y Solicitar Validación'}
            </Button>
          ) : (
            <Button
              type="button"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              disabled={caseStatus === 'APROBADO_ELEVADO'}
              onClick={handleApproveRoute}
              className="w-full sm:w-auto shadow-sm hover:shadow-md px-6 py-3"
            >
              {caseStatus === 'APROBADO_ELEVADO'
                ? 'Ruta Aprobada Formalmente'
                : 'Aprobar Ruta y Avanzar Caso'}
            </Button>
          )}
        </div>
      </div>

      {/* NOTIFICACIÓN DE RETROALIMENTACIÓN */}
      {feedback && (
        <div
          className={`p-4 border rounded-2xl text-xs font-semibold shadow-xs animate-fadeIn ${
            feedback.type === 'success'
              ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
              : 'border-rose-300 bg-rose-50 text-rose-700'
          }`}
        >
          {feedback.message}
        </div>
      )}
    </div>
  );
};

export default RouteChecklist;
