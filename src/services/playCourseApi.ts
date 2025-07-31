import axios from "axios";
import type { PlayCourseApiResponse } from '../types/playCourse';

const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER;
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiZXhwIjoxNzYyMzM3Njk1LCJpYXQiOjE3NTM2OTc2OTUsInVzZXIiOnsiaWQiOjUwMiwidXNlcm5hbWUiOiJhZG1pbjIiLCJmdWxsTmFtZSI6IkRhbmggUGh1b2MgVG9hbiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSJ9LCJwZXJtaXNzaW9ucyI6WyJST0xFX1VTRVJfQ1JFQVRFIiwiUk9MRV9VU0VSX1VQREFURSJdfQ.3xMW0nj0hGP1xx4dvW4968-0mufAApOYJ-tOYhpxjVymY2ClahXqv-zLGeZn-5UkgMZgQUYaDd97PB2K2t4ufQ"

export const fetchPlayCourse = async (courseId: number): Promise<PlayCourseApiResponse> => {
    try {
        console.log('🔥 Fetching play course with ID:', courseId);
        const response = await axios.get<PlayCourseApiResponse>(
            `${BASE_URL_SERVER}/api/v1/play-course/${courseId}`, 
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );
        console.log('✅ Response from play course API:', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching play course:', error);
        throw error;
    }
};
