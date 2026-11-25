import apiClient from '../../../shared/services/api.client.ts';
import { ApiResponse, UserProfile } from '../../../shared/types/api.types.ts';

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface AuthResponseData {
  token: string;
  user: UserProfile;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponseData> {
    const res = await apiClient.post<ApiResponse<AuthResponseData>>('/auth/login', {
      email: credentials.email,
      password: credentials.password || 'alfred2026',
    });
    return res.data.data!;
  },

  async getProfile(): Promise<UserProfile> {
    const res = await apiClient.get<ApiResponse<UserProfile>>('/auth/me');
    return res.data.data!;
  },
};

export default authService;
