// Interface cho API lesson response
export interface LessonDetail {
    id: number;
    title: string;
    sectionId: number;
    orderIndex: number;
    videoUrl: string;
    completed: boolean;
}

export interface LessonApiResponse {
    statusCode: number;
    error: null | string;
    message: string;
    data: LessonDetail;
}