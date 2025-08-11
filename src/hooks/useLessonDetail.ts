import { useState, useEffect } from 'react';
import { fetchLessonDetail } from '../services/lessonApi';
import type { LessonApiResponse } from '../types/lesson';

export const useLessonDetail = (lessonId: number | null) => {
    const [lessonDetail, setLessonDetail] = useState<LessonApiResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!lessonId) {
            setLessonDetail(null);
            setLoading(false);
            setError(null);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchLessonDetail(lessonId);
                setLessonDetail(data);
            } catch (err) {
                console.error('Error fetching lesson detail:', err);
                setError("Failed to fetch lesson details");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [lessonId]);

    return { lessonDetail, loading, error };
};
