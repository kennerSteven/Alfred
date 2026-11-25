export interface CaseInvestigator {
  id?: string;
  fullName: string;
  badgeNumber: string;
  unit: string;
}

export interface CaseProsecutor {
  id?: string;
  fullName: string;
  badgeNumber: string;
  unit: string;
}

export interface CaseItem {
  id: string;
  caseNumber: string;
  crimeType: string;
  crimeDescription?: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  suspectName?: string;
  suspectDocId?: string;
  status: 'RUTA_EN_EJECUCION' | 'VALIDACION_PENDIENTE' | 'APROBADO_ELEVADO' | 'ARCHIVADO';
  investigator?: CaseInvestigator;
  prosecutor?: CaseProsecutor;
  route?: any;
  sourceCoincidences?: any[];
  createdAt: string;
}

export interface CreateCaseFormData {
  crimeType: string;
  incidentDate: string;
  incidentTime: string;
  incidentLocation: string;
  suspectDocId: string;
  suspectName?: string;
  crimeDescription?: string;
}
