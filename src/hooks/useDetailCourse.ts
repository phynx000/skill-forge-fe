import { useEffect, useState } from "react";
import {fetchCourseById} from "../services/courseApi";
import type {ApiResponse } from "../types/apiForm";
import type { CourseDetail } from "../types/course";

export const useDetailCourse = (courseId: number) => {
    const [courseDetail, setCourseDetail] = useState<ApiResponse<CourseDetail> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getCourse = async () => {
            try {
                console.log('🔥 useDetailCourse: Starting fetch for course ID:', courseId);
                setLoading(true);
                setError(null);
                const data = await fetchCourseById(courseId);
                console.log('✅ useDetailCourse: Received data:', data);
                setCourseDetail(data);
            } catch (error) {
                console.error('❌ useDetailCourse: Error occurred:', error);
                setError("Failed to fetch course details");
            } finally {
                setLoading(false);
                console.log('🏁 useDetailCourse: Fetch completed');
            }
        };

        if (courseId) {
            getCourse();
        }
    }, [courseId]);

    return { courseDetail, loading, error };
};
