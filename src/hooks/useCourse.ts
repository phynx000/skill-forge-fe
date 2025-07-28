import { useEffect, useState } from "react";
import type { CourseApiResponse, PaginationMeta } from "../types/course";
import { fetchCourses } from "../services/courseApi";

export const useCourse = (page = 1, pageSize = 10) => {
    const [courses, setCourses] = useState<CourseApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [meta, setMeta] = useState<PaginationMeta | null>(null);


      useEffect(() => {
    const getCourses = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses(page, pageSize);
        setCourses(data);
        setMeta(data.data.meta);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, [page, pageSize]);

    return {
        courses,
        loading,
        meta,
        setCourses,
        setMeta,
    };
}