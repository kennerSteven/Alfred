export interface InvestigativeTask {
  id: string;
  orderIndex: number;
  title: string;
  description?: string;
  legalBasis?: string;
  isCompleted: boolean;
  completedAt?: string;
  completedByUserId?: string;
}

export interface InvestigativeRoute {
  id: string;
  caseId: string;
  crimeTemplate: string;
  tasks: InvestigativeTask[];
}
