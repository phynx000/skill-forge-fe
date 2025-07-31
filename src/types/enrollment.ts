export interface Enrollment {
    id: number;
    userId: number;
    courseId: number;
    courseName: string;
    courseDescription: string;
    enrolledAt: string;
    progress: number;
    status: string;
    completed: boolean;
    paid: boolean;
}