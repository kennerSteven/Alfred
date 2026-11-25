import apiClient from '../../../shared/services/api.client.ts';
import { ApiResponse } from '../../../shared/types/api.types.ts';
import { CaseItem, CreateCaseFormData } from '../types/case.types.ts';

export const caseService = {
  async listCases(filters?: { status?: string; investigatorId?: string }): Promise<CaseItem[]> {
    const res = await apiClient.get<ApiResponse<CaseItem[]>>('/cases', {
      params: filters,
    });
    return res.data.data || [];
  },

  async getCaseByNumber(caseNumber: string): Promise<CaseItem> {
    const res = await apiClient.get<ApiResponse<CaseItem>>(`/cases/${caseNumber}`);
    return res.data.data!;
  },

  async registerCase(data: CreateCaseFormData): Promise<CaseItem> {
    const res = await apiClient.post<ApiResponse<CaseItem>>('/cases', data);
    return res.data.data!;
  },
};

export default caseService;
