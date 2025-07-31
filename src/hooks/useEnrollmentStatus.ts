import { useState,  useCallback } from "react";
import { getEnrollmentByCourseId } from "../services/enrollApi";
import type { Enrollment } from "../types/enrollment";
import type { ApiResponse } from "../types/apiForm";

interface UseEnrollmentStatusReturn {
    isEnrolled: boolean;
    enrollmentLoading: boolean;
    enrollmentError: string | null;
    enrollment: Enrollment | null;
    checkEnrollmentStatus: (courseId: number) => Promise<void>;
    resetEnrollmentStatus: () => void;
}

const useEnrollmentStatus = (): UseEnrollmentStatusReturn => {
    const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
    const [enrollmentLoading, setEnrollmentLoading] = useState<boolean>(false);
    const [enrollmentError, setEnrollmentError] = useState<string | null>(null);
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

    const checkEnrollmentStatus = useCallback(async (courseId: number) => {
        try {
            setEnrollmentLoading(true);
            setEnrollmentError(null);
            
            console.log(`🔍 Checking enrollment status for course ${courseId}...`);
            
            const response: ApiResponse<Enrollment> = await getEnrollmentByCourseId(courseId);
            
            if (response.statusCode === 200 && response.data) {
                setIsEnrolled(true);
                setEnrollment(response.data);
                console.log('✅ User is enrolled in this course:', response.data);
            } else {
                setIsEnrolled(false);
                setEnrollment(null);
                console.log('ℹ️ User is not enrolled in this course');
            }
        } catch (err: unknown) {
            // If we get 404 or similar, user is not enrolled
            setIsEnrolled(false);
            setEnrollment(null);
            
            let errorMessage = '';
            if (err && typeof err === 'object') {
                if ('response' in err && err.response && typeof err.response === 'object') {
                    const response = err.response as { status?: number; data?: { error?: string; message?: string } };
                    if (response.status === 404) {
                        console.log('ℹ️ User is not enrolled in this course (404)');
                        setEnrollmentError(null); // Don't treat 404 as error
                        return;
                    }
                    errorMessage = response.data?.error || response.data?.message || '';
                } else if ('message' in err && typeof err.message === 'string') {
                    errorMessage = err.message;
                }
            }
            
            setEnrollmentError(errorMessage);
            console.error('❌ Error checking enrollment status:', err);
        } finally {
            setEnrollmentLoading(false);
        }
    }, []);

    const resetEnrollmentStatus = useCallback(() => {
        setIsEnrolled(false);
        setEnrollmentLoading(false);
        setEnrollmentError(null);
        setEnrollment(null);
    }, []);

    return {
        isEnrolled,
        enrollmentLoading,
        enrollmentError,
        enrollment,
        checkEnrollmentStatus,
        resetEnrollmentStatus
    };
};

export default useEnrollmentStatus;