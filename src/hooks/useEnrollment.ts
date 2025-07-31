import { useState, useCallback } from "react";
import { message } from "antd";
import { enrollCourse } from "../services/enrollApi";
import type { Enrollment } from "../types/enrollment";
import type { ApiResponse } from "../types/apiForm";

interface UseEnrollmentReturn {
    enrolling: boolean;
    error: string | null;
    enrollment: Enrollment | null;
    handleEnroll: (courseId: number) => Promise<void>;
    resetState: () => void;
}

const useEnrollment = (
    onSuccess?: (enrollment: Enrollment) => void,
    onError?: (error: string) => void
): UseEnrollmentReturn => {
    const [enrolling, setEnrolling] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [enrollment, setEnrollment] = useState<Enrollment | null>(null);

    const handleEnroll = useCallback(async (courseId: number) => {
        try {
            setEnrolling(true);
            setError(null);
            
            console.log(`🎓 Enrolling in course ${courseId}...`);
            
            const response: ApiResponse<Enrollment> = await enrollCourse(courseId);
            
            if (response.statusCode === 200 || response.statusCode === 201) {
                if (response.data) {
                    setEnrollment(response.data);
                    message.success('Đăng ký khóa học thành công!');
                    
                    console.log('✅ Enrollment successful:', response.data);
                    
                    // Call success callback if provided
                    if (onSuccess) {
                        onSuccess(response.data);
                    }
                }
            } else {
                const errorMessage = typeof response.error === 'string' 
                    ? response.error 
                    : typeof response.message === 'string' 
                    ? response.message 
                    : 'Đăng ký khóa học thất bại';
                setError(errorMessage);
                message.error(errorMessage);
                
                console.error('❌ Enrollment failed:', errorMessage);
                
                if (onError) {
                    onError(errorMessage);
                }
            }
        } catch (err: unknown) {
            let errorMessage = 'Có lỗi xảy ra khi đăng ký khóa học';
            
            if (err && typeof err === 'object') {
                if ('response' in err && err.response && typeof err.response === 'object') {
                    const response = err.response as { data?: { error?: string; message?: string } };
                    errorMessage = response.data?.error || 
                                 response.data?.message || 
                                 errorMessage;
                } else if ('message' in err && typeof err.message === 'string') {
                    errorMessage = err.message;
                }
            }
            
            setError(errorMessage);
            message.error(errorMessage);
            
            console.error('❌ Error in useEnrollment:', err);
            
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setEnrolling(false);
        }
    }, [onSuccess, onError]);

    const resetState = useCallback(() => {
        setEnrolling(false);
        setError(null);
        setEnrollment(null);
    }, []);

    return {
        enrolling,
        error,
        enrollment,
        handleEnroll,
        resetState
    };
};

export default useEnrollment;