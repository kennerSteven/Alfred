import apiClient from '../../../shared/services/api.client.ts';
import { ApiResponse } from '../../../shared/types/api.types.ts';

export interface InvestigatorDashboardData {
  assignedCases: Array<{
    id: string;
    caseNumber: string;
    crimeType: string;
    status: string;
    createdAt: string;
  }>;
  pendingTasks: Array<{
    id: string;
    caseNumber: string;
    title: string;
    description: string;
  }>;
}

export interface FiscalDashboardData {
  metrics: {
    activeCases: number;
    pendingValidation: number;
    resolvedCases: number;
  };
  alert: {
    sourceCaseNumber: string;
    matchedCaseNumber: string;
    matchedDocId: string;
    reason: string;
  } | null;
  cases: Array<{
    id: string;
    caseNumber: string;
    investigatorName: string;
    crimeType: string;
    status: string;
    hasMatch: boolean;
  }>;
}

export const dashboardService = {
  async getInvestigatorDashboard(): Promise<InvestigatorDashboardData> {
    const res = await apiClient.get<ApiResponse<InvestigatorDashboardData>>('/dashboard/investigator');
    return res.data.data!;
  },

  async getFiscalDashboard(): Promise<FiscalDashboardData> {
    const res = await apiClient.get<ApiResponse<FiscalDashboardData>>('/dashboard/fiscal');
    return res.data.data!;
  },
};

export default dashboardService;
