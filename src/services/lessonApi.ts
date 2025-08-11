import { apiClient } from './axiosConfig';
import type { LessonApiResponse } from '../types/lesson';

// API để lấy thông tin lesson với video URL
export const fetchLessonDetail = async (lessonId: number): Promise<LessonApiResponse> => {
    try {
        console.log('🔥 Fetching lesson detail with ID:', lessonId);
        const response = await apiClient.get<LessonApiResponse>(
            `/api/v1/play-course/lesson/${lessonId}`
        );
        console.log('✅ Response from lesson API:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching lesson detail:', error);
        throw error;
    }
};
