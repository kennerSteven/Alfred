export interface MatchedCaseSummary {
  caseNumber: string;
  crimeType: string;
  crimeDescription?: string;
  incidentLocation: string;
  status: string;
}

export interface CaseCoincidenceItem {
  id: string;
  sourceCaseId: string;
  matchedCaseId: string;
  matchedDocId: string;
  confidenceScore: number;
  reason: string;
  createdAt: string;
  matchedCase?: MatchedCaseSummary;
}
