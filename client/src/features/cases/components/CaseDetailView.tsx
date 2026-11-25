import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth.ts';
import caseService from '../services/case.service.ts';
import { CaseItem } from '../types/case.types.ts';
import { Badge } from '../../../shared/components/ui/Badge.tsx';
import { RouteChecklist } from '../../investigative-routes/components/RouteChecklist.tsx';
import { CoincidenceBox } from '../../coincidences/components/CoincidenceBox.tsx';
import coincidenceService from '../../coincidences/services/coincidence.service.ts';
import { CaseCoincidenceItem } from '../../coincidences/types/coincidence.types.ts';

export const CaseDetailView: React.FC = () => {
  const { caseId } = useParams<{ caseId: string }>();
  const { role } = useAuth();
  const [criminalCase, setCriminalCase] = useState<CaseItem | null>(null);
  const [coincidences, setCoincidences] = useState<CaseCoincidenceItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCase = async () => {
      if (!caseId) return;
      setIsLoading(true);
      setError(null);
      try {
        const [caseData, coincidencesData] = await Promise.all([
          caseService.getCaseByNumber(caseId),
          coincidenceService.getCoincidencesByCase(caseId),
        ]);
        setCriminalCase(caseData);
        setCoincidences(coincidencesData);
      } catch (err: any) {
        setError(err.message || 'Error al cargar expediente criminal');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCase();
  }, [caseId]);

  if (isLoading) {
    return (
      <div className="py-24 flex flex-col justify-center items-center text-sm text-[#120B8F] space-y-3">
        <div className="w-6 h-6 rounded-full border-2 border-[#5087F7] border-t-transparent animate-spin" />
        <span className="font-medium text-xs tracking-wide">Cargando expediente {caseId}...</span>
      </div>
    );
  }

  if (error || !criminalCase) {
    return (
      <div className="bg-white border border-[#BDC7D7]/70 rounded-3xl p-10 max-w-lg mx-auto text-center space-y-4 shadow-sm">
        <h3 className="font-bold text-base text-rose-600">No se pudo cargar el caso</h3>
        <p className="text-xs text-[#120B8F]/70">{error || 'El caso solicitado no existe.'}</p>
        <Link to="/dashboard" className="text-xs font-semibold text-[#5087F7] hover:underline block pt-2">
          &larr; Volver al Dashboard
        </Link>
      </div>
    );
  }

  const statusBadgeVariant =
    criminalCase.status === 'APROBADO_ELEVADO'
      ? 'green'
      : criminalCase.status === 'VALIDACION_PENDIENTE'
      ? 'orange'
      : 'lightBlue';

  const statusLabel =
    criminalCase.status === 'APROBADO_ELEVADO'
      ? 'Aprobado / Elevado'
      : criminalCase.status === 'VALIDACION_PENDIENTE'
      ? 'Validación Pendiente'
      : 'Ruta en ejecución';

  return (
    <div className="space-y-6">
      {/* CABECERA: REGRESO RÁPIDO */}
      <div>
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-2 text-xs font-bold text-[#120B8F] hover:text-[#5087F7] px-3.5 py-1.5 rounded-xl bg-white border border-[#BDC7D7]/70 shadow-2xs hover:shadow-xs transition-all"
        >
          <span>&larr;</span>
          <span>Volver al listado</span>
        </Link>
      </div>

      {/* ALERTA DE COINCIDENCIAS (SIEMPRE VISIBLE ARRIBA SI EXISTE) */}
      <CoincidenceBox coincidences={coincidences} />

      {/* DISEÑO EN 2 COLUMNAS SIN SCROLL EXCESIVO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* COLUMNA IZQUIERDA (5 COLS): FICHA Y METADATOS DEL CASO */}
        <div className="lg:col-span-5 bg-white border border-[#BDC7D7]/70 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6 sticky top-24">
          <div className="space-y-3 pb-5 border-b border-[#BDC7D7]/60">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold px-2.5 py-0.5 bg-[#5087F7]/10 text-[#5087F7] rounded-md border border-[#5087F7]/20">
                SECTOR 04-NORTE
              </span>
              <Badge variant={statusBadgeVariant} className="font-bold text-xs shadow-2xs">
                {statusLabel}
              </Badge>
            </div>

            <div>
              <h1 className="text-2xl font-black text-[#120B8F] tracking-tight">
                Caso N° {criminalCase.caseNumber}
              </h1>
              <p className="text-xs font-semibold text-[#120B8F]/80 mt-1">
                Delito: <span className="font-bold text-[#120B8F]">{criminalCase.crimeType}</span>
              </p>
              {criminalCase.crimeDescription && (
                <p className="text-xs text-[#120B8F]/60 mt-0.5 leading-relaxed">
                  {criminalCase.crimeDescription}
                </p>
              )}
            </div>
          </div>

          {/* DATOS DE LA CAUSA EN TARJETAS ESTRUCTURADAS */}
          <div className="space-y-3 text-xs">
            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#BDC7D7]/50 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#120B8F]/50 block">
                Sospechoso
              </span>
              <span className="text-sm font-black text-[#120B8F] block">
                {criminalCase.suspectName || 'Por identificar'}
              </span>
              <span className="text-[11px] font-bold text-[#5087F7] block">
                {criminalCase.suspectDocId ? `DNI / Cédula: ${criminalCase.suspectDocId}` : 'Sin documento registrado'}
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#BDC7D7]/50 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#120B8F]/50 block">
                Lugar del Hecho
              </span>
              <p className="font-bold text-[#120B8F] leading-snug">
                {criminalCase.incidentLocation}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#BDC7D7]/50 space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#120B8F]/50 block">
                  Fecha y Hora
                </span>
                <span className="font-bold text-[#120B8F] block">
                  {criminalCase.incidentDate.substring(0, 10)}
                </span>
                <span className="text-[10px] text-[#120B8F]/60 block font-medium">
                  {criminalCase.incidentTime} hrs
                </span>
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-2xl border border-[#BDC7D7]/50 space-y-0.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#120B8F]/50 block">
                  Investigador
                </span>
                <span className="font-bold text-[#120B8F] block truncate">
                  {criminalCase.investigator?.fullName || 'Sin asignar'}
                </span>
                <span className="text-[10px] text-[#120B8F]/60 block">
                  {criminalCase.investigator?.badgeNumber || 'IP-Pol'}
                </span>
              </div>
            </div>

            <div className="bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#BDC7D7]/50 space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#120B8F]/50 block">
                Fiscalía Asignada
              </span>
              <span className="font-bold text-[#120B8F] block">
                {criminalCase.prosecutor?.unit || 'Fiscalía de Focos Delictivos N° 3'}
              </span>
              <span className="text-[10px] text-[#120B8F]/70 block">
                Fiscal Titular: {criminalCase.prosecutor?.fullName || 'Dra. Elena Restrepo'}
              </span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA (7 COLS): RUTA INVESTIGATIVA */}
        <div className="lg:col-span-7">
          {criminalCase.route?.tasks ? (
            <RouteChecklist
              caseNumber={criminalCase.caseNumber}
              tasks={criminalCase.route.tasks}
              currentRole={role}
              caseStatus={criminalCase.status}
              onStatusChange={(newStatus) => {
                setCriminalCase((prev) => (prev ? { ...prev, status: newStatus } : null));
              }}
            />
          ) : (
            <div className="bg-white border border-[#BDC7D7]/70 rounded-3xl p-12 text-center text-xs text-[#120B8F]/60 shadow-sm">
              No se ha generado una ruta pericial para este expediente.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CaseDetailView;
