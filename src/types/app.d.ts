export interface User {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  preferences?: Record<string, any>;
  has_preferences: boolean;
  created_at: Date;
}

export interface AuthenticatedUser {
  id: number;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  preferences?: Record<string, any>;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
