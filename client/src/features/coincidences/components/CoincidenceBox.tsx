import React from 'react';
import { CaseCoincidenceItem } from '../types/coincidence.types.ts';

export interface CoincidenceBoxProps {
  coincidences: CaseCoincidenceItem[];
}

export const CoincidenceBox: React.FC<CoincidenceBoxProps> = ({ coincidences }) => {
  if (!coincidences || coincidences.length === 0) {
    return null;
  }

  const primaryMatch = coincidences[0];
  const percentScore = Math.round(primaryMatch.confidenceScore * 100);

  return (
    <div
      id="coincidence-box"
      className="bg-gradient-to-r from-[#FEF3C7] to-[#FFFBEB] border border-[#F59E0B] p-5 rounded-2xl shadow-sm space-y-2 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#F59E0B]" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B] animate-ping" />
          <span className="text-xs font-black uppercase tracking-wider text-[#F59E0B]">
            Alerta de Coincidencia Criminológica
          </span>
        </div>
        <span className="text-xs font-bold px-2.5 py-0.5 bg-[#F59E0B] text-white rounded-full shadow-2xs">
          MATCH POSITIVO {percentScore}%
        </span>
      </div>

      <p className="text-sm font-bold text-[#120B8F]">
        {primaryMatch.reason}
      </p>

      {primaryMatch.matchedCase && (
        <p className="text-xs text-[#120B8F]/80 leading-relaxed">
          Cédula de identidad <strong>{primaryMatch.matchedDocId}</strong> coincide con el expediente radicado bajo causa de{' '}
          <strong>{primaryMatch.matchedCase.crimeType}</strong> ({primaryMatch.matchedCase.incidentLocation}).
        </p>
      )}
    </div>
  );
};

export default CoincidenceBox;
