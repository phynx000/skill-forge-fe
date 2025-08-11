import { publicClient } from './axiosConfig';
import type { CourseApiResponse, CourseDetail } from '../types/course';
import type { ApiResponse } from "../types/apiForm";

export const fetchCourses = async (
       current: number = 1,
       pageSize: number = 10
) : Promise<CourseApiResponse> => {
    const response = await publicClient.get<CourseApiResponse>(
        `/api/v1/courses?current=${current}&pageSize=${pageSize}`
    );
    return response.data;
}

export const fetchCourseById = async (courseId: number): Promise<ApiResponse<CourseDetail>> => {
    try {
        const response = await publicClient.get<ApiResponse<CourseDetail>>(
            `/api/v1/courses/${courseId}`
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
    const response = await publicClient.get<CourseApiResponse>(
        `/api/v1/courses/category/${categoryId}?current=${current}&pageSize=${pageSize}`
    );
    console.log('Response from API:', response.data);
    return response.data;
}