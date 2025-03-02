// Modelos para autenticación
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  profile_id: number;
  status_id: number;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface UserData {
  id: number;
  email: string;
  creation_date: string;
  profile_id: number;
  status_id: number;
}
