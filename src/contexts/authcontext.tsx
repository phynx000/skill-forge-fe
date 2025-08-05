import React, { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import { message } from 'antd';
import type { AuthState, User, LoginCredentials } from '../types/auth';
import { authAPI } from '../services/authApi';

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'RESTORE_AUTH'; payload: { user: User; token: string } }
    | { type: 'CLEAR_ERROR' };

// Auth Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, loading: true, error: null };

        case 'LOGIN_SUCCESS':
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true
            };

        case 'LOGIN_FAILURE':
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: null,
                token: null,
                isAuthenticated: false
            };

        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                error: null,
                loading: false
            };

        case 'RESTORE_AUTH':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };

        case 'CLEAR_ERROR':
            return { ...state, error: null };

        default:
            return state;
    }
};

// Initial State
const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null
};

// Context Type
interface AuthContextType extends AuthState {
    login: (credentials: LoginCredentials) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
    hasRole: (role: string) => boolean;
    hasAnyRole: (roles: string[]) => boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Interface for error responses
interface ApiErrorResponse {
    response?: {
        data?: {
            error?: string;
            message?: string;
        };
        status?: number;
    };
    message?: string;
}

// Auth Provider
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Restore auth from localStorage on mount - ONLY ONCE
    useEffect(() => {
        let isRestoring = false;

        const restoreAuth = () => {
            if (isRestoring) return; // Prevent multiple calls
            isRestoring = true;

            try {
                const token = localStorage.getItem('skillforge_token');
                const userStr = localStorage.getItem('skillforge_user');

                console.log('🔍 Restoring auth - Token exists:', !!token, 'User exists:', !!userStr);

                if (token && userStr) {
                    const user = JSON.parse(userStr) as User;

                    // Validate token expiry (JWT format check)
                    try {
                        const base64Url = token.split('.')[1];
                        if (!base64Url) {
                            throw new Error('Invalid token format');
                        }

                        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                        const jsonPayload = decodeURIComponent(
                            window.atob(base64)
                                .split('')
                                .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                                .join('')
                        );

                        const tokenPayload = JSON.parse(jsonPayload) as { exp: number };
                        const currentTime = Math.floor(Date.now() / 1000);

                        if (tokenPayload.exp > currentTime) {
                            dispatch({ type: 'RESTORE_AUTH', payload: { user, token } });
                            console.log('✅ Auth restored from localStorage');
                        } else {
                            // Token expired, clear storage
                            localStorage.removeItem('skillforge_token');
                            localStorage.removeItem('skillforge_user');
                            console.log('⚠️ Token expired, cleared storage');
                        }
                    } catch (tokenError) {
                        // Invalid token format, clear storage
                        localStorage.removeItem('skillforge_token');
                        localStorage.removeItem('skillforge_user');
                        console.log('⚠️ Invalid token format, cleared storage');
                    }
                } else {
                    console.log('ℹ️ No auth data found in localStorage');
                }
            } catch (error) {
                console.error('❌ Error restoring auth:', error);
                localStorage.removeItem('skillforge_token');
                localStorage.removeItem('skillforge_user');
            } finally {
                isRestoring = false;
            }
        };

        // Only restore once on mount
        restoreAuth();
    }, []); // Empty dependency array - only run once

    // Login function with useCallback to prevent re-creation
    const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
        dispatch({ type: 'LOGIN_START' });

        try {
            console.log('🔐 Attempting login for:', credentials.username);

            const response = await authAPI.login(credentials);

            if (response.statusCode === 200 && response.data) {
                const { user, access_token } = response.data;

                // Store in localStorage with app prefix
                localStorage.setItem('skillforge_token', access_token);
                localStorage.setItem('skillforge_user', JSON.stringify(user));

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: { user, token: access_token }
                });

                message.success(`Chào mừng ${user.fullName}!`);
                console.log('✅ Login successful for user:', user);
                return true;
            } else {
                const errorMsg = response.error || response.message || 'Đăng nhập thất bại';
                dispatch({ type: 'LOGIN_FAILURE', payload: String(errorMsg) });
                message.error(String(errorMsg));
                console.log('❌ Login failed:', errorMsg);
                return false;
            }
        } catch (error) {
            let errorMsg = 'Có lỗi xảy ra khi đăng nhập';

            const apiError = error as ApiErrorResponse;

            if (apiError?.response?.data) {
                errorMsg = apiError.response.data.error ||
                    apiError.response.data.message ||
                    errorMsg;
            } else if (apiError?.message) {
                errorMsg = apiError.message;
            }

            dispatch({ type: 'LOGIN_FAILURE', payload: errorMsg });
            message.error(errorMsg);
            console.error('❌ Login error:', error);
            return false;
        }
    }, []); // No dependencies

    // Logout function with useCallback
    const logout = useCallback(() => {
        localStorage.removeItem('skillforge_token');
        localStorage.removeItem('skillforge_user');
        dispatch({ type: 'LOGOUT' });
        message.success('Đã đăng xuất thành công');
        console.log('✅ Logout successful');
    }, []);

    // Clear error with useCallback
    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    // Role checking utilities with useCallback
    const hasRole = useCallback((role: string): boolean => {
        return state.user?.roles.includes(role) || false;
    }, [state.user?.roles]);

    const hasAnyRole = useCallback((roles: string[]): boolean => {
        return roles.some(role => state.user?.roles.includes(role)) || false;
    }, [state.user?.roles]);

    // Memoize context value to prevent unnecessary re-renders
    const contextValue: AuthContextType = React.useMemo(() => ({
        ...state,
        login,
        logout,
        clearError,
        hasRole,
        hasAnyRole
    }), [state, login, logout, clearError, hasRole, hasAnyRole]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};