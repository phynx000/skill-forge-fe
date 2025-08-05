export interface User {
    id: number;
    username: string;
    fullName: string;
    email: string;
    roles: string[];
}

export interface LoginResponse {
    user: User;
    access_token: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterData {
    username: string;
    fullName: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
    message: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ForgotPasswordResponse {
    message: string;
}

export interface ResetPasswordRequest {
    token: string;
    newPassword: string;
}

export interface ResetPasswordResponse {
    message: string;
}