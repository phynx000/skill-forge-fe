import { useEffect, useState } from "react";
import type { CourseApiResponse, PaginationMeta } from "../types/course";
import { fetchCourses } from "../services/courseApi";

export const useCourse = (current = 1, pageSize = 10) => {
    const [courses, setCourses] = useState<CourseApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);


      useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses(current, pageSize);
        setCourses(data);
        setMeta(data.data.meta);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [current, pageSize]);

    return {
        courses,
        loading,
        meta,
        setCourses,
        setMeta,
    };
}