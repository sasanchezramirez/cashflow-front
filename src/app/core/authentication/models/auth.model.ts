// Modelos para autenticación
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthToken {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  profile_id?: number;
  status_id?: number;
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
}

export interface UserData {
  id: number;
  email: string;
  creation_date: string;
  profile_id: number;
  status_id: number;
}
