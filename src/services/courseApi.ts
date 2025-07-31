import axios from "axios";
import type { CourseApiResponse, CourseDetail } from '../types/course';
import type { ApiResponse } from "../types/apiForm";


const BASE_URL_SERVER = import.meta.env.VITE_BASE_URL_SERVER;

export const fetchCourses = async (
       current: number = 1,
       pageSize: number = 10
) : Promise<CourseApiResponse> => {
    const response = await axios.get<CourseApiResponse>(
        `${BASE_URL_SERVER}/api/v1/courses?current=${current}&pageSize=${pageSize}`
        
    );
    return response.data;
}

export const fetchCourseById = async (courseId: number): Promise<ApiResponse<CourseDetail>> => {
    try {
        const response = await axios.get<ApiResponse<CourseDetail>>(
            `${BASE_URL_SERVER}/api/v1/courses/${courseId}`,
            
        );
        return response.data;
    } catch (error) {
        console.error('❌ Error fetching course:', error);
        throw error;
    }
};

export const fetchCoursesByCategory = async (
    categoryId: number,
    current: number = 1,
    pageSize: number = 10
): Promise<CourseApiResponse> => {
    const response = await axios.get<CourseApiResponse>(
        `${BASE_URL_SERVER}/api/v1/courses/category/${categoryId}?current=${current}&pageSize=${pageSize}`,
    );
    console.log('Response from API:', response.data);
    return response.data;
}