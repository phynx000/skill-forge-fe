import axios from 'axios';
import { message } from 'antd';

const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER;

// Token storage keys
export const TOKEN_KEY = 'skillforge_token';
export const USER_KEY = 'skillforge_user';

// Create main axios instance for authenticated requests
export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 seconds timeout
});

// Create separate axios instance for authentication (no token required)
export const authClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 seconds timeout
});

// Create separate axios instance for public APIs (no token required)
export const publicClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000, // 10 seconds timeout
});

// Helper functions for token management
export const tokenManager = {
    getToken: () => localStorage.getItem(TOKEN_KEY),
    setToken: (token: string) => localStorage.setItem(TOKEN_KEY, token),
    removeToken: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
    hasToken: () => !!localStorage.getItem(TOKEN_KEY)
};

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenManager.getToken();
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log(`🔑 Adding token to request: ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        console.error('❌ Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor - Handle token expiry and errors
apiClient.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (import.meta.env.DEV && response.config.url) {
            console.log(`✅ API Success: ${response.config.method?.toUpperCase()} ${response.config.url}`, 
                      response.status, response.data);
        }
        return response;
    },
    (error) => {
        const { response, config } = error;
        
        if (response) {
            const { status, data } = response;
            const url = config?.url || 'unknown';
            
            console.error(`❌ API Error: ${status} ${config?.method?.toUpperCase()} ${url}`, data);
            
            switch (status) {
                case 401: {
                    // Only handle 401 for critical auth failures, not enrollment checks
                    const isLoginRequest = url.includes('/auth/login');
                    const isRegisterRequest = url.includes('/auth/register');
                    const isEnrollmentRequest = url.includes('/enrollments');
                    const isPlayCourseRequest = url.includes('/play-course');
                    const isOptionalAuthRequest = isLoginRequest || isRegisterRequest || isEnrollmentRequest || isPlayCourseRequest;
                    
                    if (!isOptionalAuthRequest) {
                        // Token expired or invalid for critical authenticated endpoints
                        console.warn('🔒 Token expired for critical endpoint, logging out...');
                        tokenManager.removeToken();
                        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
                        
                        // Only redirect if not already on login page
                        if (!window.location.pathname.includes('/login')) {
                            setTimeout(() => {
                                window.location.href = '/login';
                            }, 1500);
                        }
                    } else {
                        // For enrollment/play-course requests, 401 is expected for unauthenticated users
                        console.log(`ℹ️ ${url} returned 401 (user not authenticated or not enrolled)`);
                    }
                    break;
                }
                    
                case 403: {
                    // Forbidden - Don't show global message for enrollment (let component handle)
                    const isEnrollmentRequest = url.includes('/enrollments');
                    if (!isEnrollmentRequest) {
                        message.error('Bạn không có quyền thực hiện hành động này.');
                    } else {
                        console.log('ℹ️ Enrollment request returned 403 (user not authorized or already enrolled)');
                    }
                    break;
                }
                    
                case 404: {
                    // Don't show message for 404 on enrollment check or course access
                    const isEnrollmentRequest = url.includes('/enrollments');
                    const isPlayCourseRequest = url.includes('/play-course');
                    if (!isEnrollmentRequest && !isPlayCourseRequest) {
                        message.error('Không tìm thấy tài nguyên yêu cầu.');
                    } else {
                        console.log(`ℹ️ ${url} returned 404 (resource not found or not accessible)`);
                    }
                    break;
                }
                    
                case 500: {
                    message.error('Lỗi server. Vui lòng thử lại sau.');
                    break;
                }
                    
                default: {
                    // Don't show global error messages for enrollment or play-course requests
                    const isEnrollmentRequest = url.includes('/enrollments');
                    const isPlayCourseRequest = url.includes('/play-course');
                    
                    if (!isEnrollmentRequest && !isPlayCourseRequest) {
                        const errorMessage = data?.message || data?.error || 'Có lỗi xảy ra';
                        message.error(errorMessage);
                    } else {
                        console.log(`ℹ️ ${url} returned ${status} (let component handle)`);
                    }
                    break;
                }
            }
        } else if (error.code === 'ECONNABORTED') {
            message.error('Kết nối quá chậm. Vui lòng thử lại.');
        } else if (error.code === 'ERR_NETWORK') {
            message.error('Lỗi kết nối. Vui lòng kiểm tra mạng.');
        }
        
        return Promise.reject(error);
    }
);

// Response interceptor for auth client (no token management, just error handling)
authClient.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (import.meta.env.DEV && response.config.url) {
            console.log(`✅ Auth API Success: ${response.config.method?.toUpperCase()} ${response.config.url}`, 
                      response.status, response.data);  
        }
        return response;
    },
    (error) => {
        const { response, config } = error;
        
        if (response) {
            const { status, data } = response;
            const url = config?.url || 'unknown';
            
            console.error(`❌ Auth API Error: ${status} ${config?.method?.toUpperCase()} ${url}`, data);
            
            // For auth endpoints, don't show global error messages - let the forms handle them
            switch (status) {
                case 500:
                    message.error('Lỗi server. Vui lòng thử lại sau.');
                    break;
                // Don't handle 401, 403, 404 here - let the auth forms handle them
            }
        } else if (error.code === 'ECONNABORTED') {
            message.error('Kết nối quá chậm. Vui lòng thử lại.');
        } else if (error.code === 'ERR_NETWORK') {
            message.error('Lỗi kết nối. Vui lòng kiểm tra mạng.');
        }
        
        return Promise.reject(error);
    }
);

// Response interceptor for public client (no token management, minimal error handling)
publicClient.interceptors.response.use(
    (response) => {
        if (import.meta.env.DEV && response.config.url) {
            console.log(`✅ Public API Success: ${response.config.method?.toUpperCase()} ${response.config.url}`, 
                      response.status);
        }
        return response;
    },
    (error) => {
        const { response, config } = error;
        
        if (response) {
            const { status } = response;
            const url = config?.url || 'unknown';
            
            console.error(`❌ Public API Error: ${status} ${config?.method?.toUpperCase()} ${url}`);
            
            // For public APIs, only handle critical server errors
            if (status >= 500) {
                message.error('Lỗi server. Vui lòng thử lại sau.');
            }
        } else if (error.code === 'ECONNABORTED') {
            message.error('Kết nối quá chậm. Vui lòng thử lại.');
        } else if (error.code === 'ERR_NETWORK') {
            message.error('Lỗi kết nối. Vui lòng kiểm tra mạng.');
        }
        
        return Promise.reject(error);
    }
);