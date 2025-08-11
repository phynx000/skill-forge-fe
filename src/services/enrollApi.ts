import { apiClient } from "./axiosConfig";
import type { ApiResponse } from "../types/apiForm";
import type { Enrollment } from "../types/enrollment";

export const enrollCourse = async (courseId: number): Promise<ApiResponse<Enrollment>> => {
    try {
        console.log('📚 Enrolling in course ID:', courseId);


        
        const response = await apiClient.post<ApiResponse<Enrollment>>(
            '/api/v1/enrollments',
            { courseId }
        );
        
        console.log('✅ Enrollment successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error enrolling in course:', error);
        throw error;
    }
};

export const getEnrollmentByCourseId = async (courseId: number): Promise<ApiResponse<Enrollment>> => {
    try {
        console.log('🔍 Fetching enrollment for course ID:', courseId);
        
        const response = await apiClient.get<ApiResponse<Enrollment>>(
            `/api/v1/enrollments/${courseId}`
        );
        
        console.log('✅ Enrollment data fetched:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching enrollment by course ID:', error);
        throw error;
    }
};