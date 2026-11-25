export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ApiValidationError {
  field: string;
  message: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: ApiValidationError[] | any;
}

export type UserRole = 'INVESTIGADOR' | 'FISCAL';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  badgeNumber: string;
  unit: string;
}
