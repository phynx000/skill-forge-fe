import { apiClient } from './axiosConfig';
import type { PlayCourseApiResponse } from '../types/playCourse';

export const fetchPlayCourse = async (courseId: number): Promise<PlayCourseApiResponse> => {
    try {
        console.log('🔥 Fetching play course with ID:', courseId);
        const response = await apiClient.get<PlayCourseApiResponse>(
            `/api/v1/play-course/${courseId}`
        );
        console.log('✅ Response from play course API:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching play course:', error);
        throw error;
    }
};
