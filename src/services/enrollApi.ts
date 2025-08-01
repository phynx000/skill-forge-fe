import axios from "axios";
import type { ApiResponse } from "../types/apiForm";
import type { Enrollment } from "../types/enrollment";

const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER;
const accessToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbjJAZ21haWwuY29tIiwiZXhwIjoxNzYyMzM3Njk1LCJpYXQiOjE3NTM2OTc2OTUsInVzZXIiOnsiaWQiOjUwMiwidXNlcm5hbWUiOiJhZG1pbjIiLCJmdWxsTmFtZSI6IkRhbmggUGh1b2MgVG9hbiIsImVtYWlsIjoiYWRtaW4yQGdtYWlsLmNvbSJ9LCJwZXJtaXNzaW9ucyI6WyJST0xFX1VTRVJfQ1JFQVRFIiwiUk9MRV9VU0VSX1VQREFURSJdfQ.3xMW0nj0hGP1xx4dvW4968-0mufAApOYJ-tOYhpxjVymY2ClahXqv-zLGeZn-5UkgMZgQUYaDd97PB2K2t4ufQ"


export const enrollCourse = async (courseId : number) : Promise<ApiResponse<Enrollment>> => {
    try {
        const response = await axios.post<ApiResponse<Enrollment>>(
            `${BASE_URL_SERVER}/api/v1/enrollments`, {
                courseId: courseId
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
            
               
               
        );
         return response.data;
    } catch (error) {
        console.error('❌ Error enrolling in course:', error);
        throw error;
    }
}

export const getEnrollmentByCourseId = async (courseId: number): Promise<ApiResponse<Enrollment>> => {
    try {
        const response = await axios.get<ApiResponse<Enrollment>>(
            `${BASE_URL_SERVER}/api/v1/enrollments/${courseId}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching enrollment by course ID:', error);
        throw error;
    }
}