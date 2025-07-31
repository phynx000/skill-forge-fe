import { useEffect, useState } from "react";
import type { CourseApiResponse, PaginationMeta } from "../types/course";
import { fetchCourses, fetchCoursesByCategory } from "../services/courseApi";

export const useCourse = (current = 1, pageSize = 10, categoryId?: number) => {
    const [courses, setCourses] = useState<CourseApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);

    useEffect(() => {
        const getCourses = async () => {
            try {
                setLoading(true);
                let data;
                
                if (categoryId) {
                    // Nếu có categoryId thì lấy courses theo category
                    data = await fetchCoursesByCategory(categoryId, current, pageSize);
                } else {
                    // Nếu không có categoryId thì lấy tất cả courses
                    data = await fetchCourses(current, pageSize);
                }
                
                setCourses(data);
                setMeta(data.data.meta);
            } catch (err) {
                console.error("Failed to fetch courses", err);
            } finally {
                setLoading(false);
            }
        };

        getCourses();
    }, [categoryId, current, pageSize]);

    return {
        courses,
        loading,
        meta,
        setCourses,
        setMeta,
    };
}