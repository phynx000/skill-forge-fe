// Interface cho API play course
export interface PlayLesson {
  id: number;
  title: string;
  sectionId: number;
  orderIndex: number;
  videoUrl: string;
  completed: boolean;
}

export interface PlaySection {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
  courseId: number;
  lessons: PlayLesson[];
}

export interface PlayCourseApiResponse {
  statusCode: number;
  error: null | string;
  message: string;
  data: PlaySection[];
}
