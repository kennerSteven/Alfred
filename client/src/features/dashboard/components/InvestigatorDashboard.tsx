import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InvestigatorDashboardData } from '../services/dashboard.service.ts';
import { Button } from '../../../shared/components/ui/Button.tsx';
import { Badge } from '../../../shared/components/ui/Badge.tsx';
import { NewCaseModal } from '../../cases/components/NewCaseModal.tsx';

export interface InvestigatorDashboardProps {
  data: InvestigatorDashboardData;
  onRefresh?: () => void;
}

export const InvestigatorDashboard: React.FC<InvestigatorDashboardProps> = ({ data, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="space-y-6">
      {/* TARJETA DE ACCIÓN PRIMARIA */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gradient-to-r from-white via-white to-[#F8FAFC] p-6 rounded-3xl border border-[#BDC7D7]/70 shadow-sm gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5087F7] animate-pulse" />
            <h2 className="text-base font-bold text-[#120B8F]">
              Gestión Operativa de Noticias Criminales
            </h2>
          </div>
          <p className="text-xs text-[#120B8F]/70">
            Incorpore nuevas actuaciones y actas policiales directamente a las carpetas investigativas.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={() => setIsModalOpen(true)}
          className="shadow-sm hover:shadow-md cursor-pointer"
        >
          + Registrar Nueva Denuncia
        </Button>
      </div>

      {/* GRID: TABLA DE CASOS + TAREAS PENDIENTES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* TABLA: MIS CASOS ASIGNADOS */}
        <div className="lg:col-span-2 bg-white border border-[#BDC7D7]/70 rounded-3xl shadow-sm overflow-hidden">
          <div className="px-6 py-4.5 border-b border-[#BDC7D7]/60 flex justify-between items-center bg-white">
            <div className="flex items-center space-x-2.5">
              <span className="text-xs font-black tracking-wider text-[#120B8F] uppercase">
                Mis Casos Asignados
              </span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#5087F7]/10 text-[#5087F7]">
                {data.assignedCases.length} activos
              </span>
            </div>
            <span className="text-xs text-[#120B8F]/60">Expedientes en curso</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-[#BDC7D7]/60 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/80">
                  <th className="px-6 py-3.5">N° Caso</th>
                  <th className="px-6 py-3.5">Delito / Tipificación</th>
                  <th className="px-6 py-3.5">Estado Procesal</th>
                  <th className="px-6 py-3.5 text-right">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BDC7D7]/50">
                {data.assignedCases.map((c) => {
                  const badgeVariant =
                    c.status === 'APROBADO_ELEVADO'
                      ? 'green'
                      : c.status === 'VALIDACION_PENDIENTE'
                      ? 'orange'
                      : 'lightBlue';

                  const badgeText =
                    c.status === 'APROBADO_ELEVADO'
                      ? 'Aprobado / Elevado'
                      : c.status === 'VALIDACION_PENDIENTE'
                      ? 'Validación Pendiente'
                      : 'Ruta en ejecución';

                  return (
                    <tr key={c.id} className="hover:bg-[#F8FAFC]/80 transition-colors group">
                      <td className="px-6 py-4 font-bold text-[#120B8F] group-hover:text-[#5087F7] transition-colors">
                        {c.caseNumber}
                      </td>
                      <td className="px-6 py-4 text-[#120B8F]/90 font-medium text-xs">
                        {c.crimeType}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={badgeVariant}>{badgeText}</Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          to={`/cases/${c.caseNumber}`}
                          className="inline-flex items-center space-x-1 text-xs font-bold text-[#5087F7] hover:text-[#3f76e5] transition-colors"
                        >
                          <span>Ver Ruta</span>
                          <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* TARJETA LATERAL: MIS TAREAS PENDIENTES */}
        <div className="bg-white border border-[#BDC7D7]/70 rounded-3xl shadow-sm p-6 space-y-4">
          <div className="border-b border-[#BDC7D7]/60 pb-3 flex justify-between items-center">
            <h3 className="font-black text-xs tracking-wider text-[#120B8F] uppercase">
              Mis Tareas Pendientes
            </h3>
            <Badge variant="lightBlue">Urgentes</Badge>
          </div>

          <div className="space-y-3">
            {data.pendingTasks.length === 0 ? (
              <p className="text-xs text-[#120B8F]/60 py-6 text-center">
                No hay diligencias periciales urgentes pendientes.
              </p>
            ) : (
              data.pendingTasks.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 border border-[#BDC7D7]/60 rounded-2xl bg-[#F8FAFC] hover:bg-white hover:border-[#5087F7]/50 transition-all group"
                >
                  <div className="text-[10px] font-bold text-[#5087F7] uppercase tracking-wide">
                    Caso {t.caseNumber}
                  </div>
                  <div className="font-semibold text-[#120B8F] mt-1 text-xs leading-snug">
                    {t.title}
                  </div>
                  <div className="text-[11px] text-[#120B8F]/65 mt-1">
                    {t.description}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* MODAL DE NUEVA DENUNCIA */}
      <NewCaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCaseCreated={onRefresh}
      />
    </section>
  );
};

export default InvestigatorDashboard;
