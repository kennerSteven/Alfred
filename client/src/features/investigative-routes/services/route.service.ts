import apiClient from '../../../shared/services/api.client.ts';
import { ApiResponse } from '../../../shared/types/api.types.ts';
import { InvestigativeTask } from '../types/route.types.ts';

export const routeService = {
  async toggleTask(taskId: string): Promise<InvestigativeTask> {
    const res = await apiClient.patch<ApiResponse<InvestigativeTask>>(
      `/routes/tasks/${taskId}/toggle`
    );
    return res.data.data!;
  },

  async requestValidation(caseNumber: string): Promise<{ status: string }> {
    const res = await apiClient.post<ApiResponse<{ status: string }>>(
      `/routes/${caseNumber}/request-validation`
    );
    return res.data.data!;
  },

  async approveRoute(caseNumber: string): Promise<{ status: string }> {
    const res = await apiClient.post<ApiResponse<{ status: string }>>(
      `/routes/${caseNumber}/approve`
    );
    return res.data.data!;
  },
};

export default routeService;
