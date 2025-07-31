import { useEffect, useState } from "react";
import { fetchPlayCourse } from "../services/playCourseApi";
import type { PlayCourseApiResponse } from "../types/playCourse";

export const usePlayCourse = (courseId: number) => {
    const [playCourseData, setPlayCourseData] = useState<PlayCourseApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPlayCourse = async () => {
            try {
                console.log('🔥 usePlayCourse: Starting fetch for course ID:', courseId);
                setLoading(true);
                setError(null);
                const data = await fetchPlayCourse(courseId);
                console.log('✅ usePlayCourse: Received data:', data);
                setPlayCourseData(data);
            } catch (error) {
                console.error('❌ usePlayCourse: Error occurred:', error);
                setError("Failed to fetch course play data");
            } finally {
                setLoading(false);
                console.log('🏁 usePlayCourse: Fetch completed');
            }
        };

        if (courseId) {
            getPlayCourse();
        }
    }, [courseId]);

    return { playCourseData, loading, error };
};
