import apiClient from '../../../shared/services/api.client.ts';
import { ApiResponse } from '../../../shared/types/api.types.ts';
import { CaseCoincidenceItem } from '../types/coincidence.types.ts';

export const coincidenceService = {
  async getCoincidencesByCase(caseNumber: string): Promise<CaseCoincidenceItem[]> {
    const res = await apiClient.get<ApiResponse<CaseCoincidenceItem[]>>(
      `/coincidences/case/${caseNumber}`
    );
    return res.data.data || [];
  },
};

export default coincidenceService;
