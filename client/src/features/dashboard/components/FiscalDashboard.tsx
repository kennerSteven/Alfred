import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiscalDashboardData } from '../services/dashboard.service.ts';
import { Button } from '../../../shared/components/ui/Button.tsx';
import { Badge } from '../../../shared/components/ui/Badge.tsx';

export interface FiscalDashboardProps {
  data: FiscalDashboardData;
}

export const FiscalDashboard: React.FC<FiscalDashboardProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <section className="space-y-6">
      {/* MÉTRICAS MODERNAS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#BDC7D7]/70 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-[#5087F7]/40 transition-all">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#120B8F]" />
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/70">
            Casos Activos
          </div>
          <div className="text-4xl font-black text-[#120B8F] mt-2">
            {data.metrics.activeCases}
          </div>
          <div className="text-xs text-[#120B8F]/60 mt-1">
            Bajo supervisión directa en el despacho
          </div>
        </div>

        <div className="bg-white border border-[#BDC7D7]/70 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-[#5087F7]/40 transition-all">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#5087F7]" />
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/70">
            Pendientes de Validación
          </div>
          <div className="text-4xl font-black text-[#5087F7] mt-2">
            {data.metrics.pendingValidation}
          </div>
          <div className="text-xs text-[#120B8F]/60 mt-1">
            Rutas concluidas a la espera de firma procesal
          </div>
        </div>

        <div className="bg-white border border-[#BDC7D7]/70 rounded-2xl p-6 shadow-sm relative overflow-hidden group hover:border-[#10B981]/40 transition-all">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#10B981]" />
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/70">
            Casos Resueltos / Elevados
          </div>
          <div className="text-4xl font-black text-[#10B981] mt-2">
            {data.metrics.resolvedCases}
          </div>
          <div className="text-xs text-[#120B8F]/60 mt-1">
            Periodo fiscal en curso
          </div>
        </div>
      </div>

      {/* ALERTA VISIBLE DE COINCIDENCIA (COLOR NARANJA) */}
      {data.alert && (
        <div className="bg-gradient-to-r from-[#FEF3C7] to-[#FFFBEB] border border-[#F59E0B] p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
              <span className="font-bold text-xs text-[#F59E0B] uppercase tracking-wider">
                1 Nueva Coincidencia Criminológica Detectada
              </span>
            </div>
            <div className="text-xs text-[#120B8F] leading-relaxed">
              Cédula implicada en el <strong>Caso N° {data.alert.sourceCaseNumber}</strong> presenta coincidencia con el{' '}
              <strong>Caso N° {data.alert.matchedCaseNumber}</strong> (Posible actor recurrente).
            </div>
          </div>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => navigate(`/cases/${data.alert!.sourceCaseNumber}`)}
            className="whitespace-nowrap shadow-sm"
          >
            Revisar Coincidencia
          </Button>
        </div>
      )}

      {/* TABLA: CASOS DEL DESPACHO */}
      <div className="bg-white border border-[#BDC7D7]/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4.5 border-b border-[#BDC7D7]/60 flex justify-between items-center bg-white">
          <div>
            <h3 className="font-black text-xs tracking-wider text-[#120B8F] uppercase">
              Casos del Despacho
            </h3>
            <p className="text-xs text-[#120B8F]/60 mt-0.5">
              Supervisión, dirección jurídica y aprobación de rutas investigativas
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#BDC7D7]/60 text-[#120B8F]/70">
            {data.cases.length} expedientes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#BDC7D7]/60 bg-[#F8FAFC] text-[11px] font-bold uppercase tracking-wider text-[#120B8F]/80">
                <th className="px-6 py-3.5">N° Caso</th>
                <th className="px-6 py-3.5">Investigador a cargo</th>
                <th className="px-6 py-3.5">Delito / Causa</th>
                <th className="px-6 py-3.5">Estado</th>
                <th className="px-6 py-3.5 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#BDC7D7]/50">
              {data.cases.map((c) => {
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
                    : c.hasMatch
                    ? 'Ruta con Alerta'
                    : 'Ruta en ejecución';

                return (
                  <tr
                    key={c.id}
                    className={`hover:bg-[#F8FAFC]/80 transition-colors ${
                      c.hasMatch ? 'bg-[#FEF3C7]/20' : ''
                    }`}
                  >
                    <td className="px-6 py-4 font-bold text-[#120B8F]">
                      <div className="flex items-center space-x-1.5">
                        <span>{c.caseNumber}</span>
                        {c.hasMatch && (
                          <span className="text-[10px] font-bold text-[#F59E0B] border border-[#F59E0B] px-1.5 py-0.2 rounded-full bg-[#FEF3C7]">
                            MATCH
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#120B8F]/90 text-xs">
                      {c.investigatorName}
                    </td>
                    <td className="px-6 py-4 text-[#120B8F]/90 font-medium text-xs">
                      {c.crimeType}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={badgeVariant}>{badgeText}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        type="button"
                        variant={c.status === 'APROBADO_ELEVADO' ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => navigate(`/cases/${c.caseNumber}`)}
                      >
                        {c.status === 'APROBADO_ELEVADO' ? 'Ver Autos' : 'Revisar'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default FiscalDashboard;
