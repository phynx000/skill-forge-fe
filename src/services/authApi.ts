import { authClient } from './axiosConfig';
import type { ApiResponse } from '../types/apiForm';
import type { 
    LoginCredentials, 
    LoginResponse,
    RegisterData,
    RegisterResponse,
    ForgotPasswordRequest,
    ForgotPasswordResponse,
    ResetPasswordRequest,
    ResetPasswordResponse
} from '../types/auth';

export const authAPI = {
    // Login
    login: async (credentials: LoginCredentials): Promise<ApiResponse<LoginResponse>> => {
        try {
            console.log('🌐 Sending login request:', {
                username: credentials.username,
                password: '***' // Don't log password
            });
            const response = await authClient.post<ApiResponse<LoginResponse>>(
                '/api/v1/auth/login',
                credentials
            );

            console.log('🌐 Login response:', {
                statusCode: response.data.statusCode,
                hasData: !!response.data.data,
                error: response.data.error
            });
            return response.data;
        } catch (error) {
            console.error('❌ Login error:', error);
            throw error;
        }
    },

    // Register (if needed)
    register: async (userData: RegisterData): Promise<ApiResponse<RegisterResponse>> => {
        try {
            console.log('🌐 Sending register request');
            const response = await authClient.post<ApiResponse<RegisterResponse>>(
                '/api/v1/auth/register',
                userData
            );
            console.log('🌐 Register response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Register error:', error);
            throw error;
        }
    },

    // Forgot password (if needed)
    forgotPassword: async (email: string): Promise<ApiResponse<ForgotPasswordResponse>> => {
        try {
            console.log('🌐 Sending forgot password request');
            const response = await authClient.post<ApiResponse<ForgotPasswordResponse>>(
                '/api/v1/auth/forgot-password',
                { email } satisfies ForgotPasswordRequest
            );
            console.log('🌐 Forgot password response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Forgot password error:', error);
            throw error;
        }
    },

    // Reset password (if needed)
    resetPassword: async (token: string, newPassword: string): Promise<ApiResponse<ResetPasswordResponse>> => {
        try {
            console.log('🌐 Sending reset password request');
            const response = await authClient.post<ApiResponse<ResetPasswordResponse>>(
                '/api/v1/auth/reset-password',
                { token, newPassword } satisfies ResetPasswordRequest
            );
            console.log('🌐 Reset password response:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Reset password error:', error);
            throw error;
        }
    },
};