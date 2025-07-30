export interface Course {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnailUrl: string;
  categoryName: string;
  instructorName: string;
  numberOfLessons: number;
  slug: string;
  published: boolean;
}

export interface CourseInstructor {
  id: number;
  name: string;
  avatar: string;
  title: string;
  experience: string;
}

export interface CourseLesson {
  id: number;
  title: string;
  sectionId: number;
  orderIndex: number;
}

export interface CourseSection {
  id: number;
  title: string;
  description: string;
  orderIndex: number;
  courseId: number;
  lessons: CourseLesson[];
}

export interface CourseDetail {
  id: number;
  title: string;
  shortDescription: string | null;
  description: string;
  instructor: CourseInstructor;
  lastUpdated: string | null;
  originalPrice: number;
  discountPrice: number;
  rating: number;
  lessonCount: number;
  reviewCount: number;
  level: string;
  thumbnailUrl: string;
  duration: string;
  language: string;
  features: string[];
  whatYouLearn: string[];
  sections: CourseSection[];
}

export interface PaginationMeta {
    current: number;
    pageSize: number;
    pages: number;
    totalItems: number;
}

export interface CourseApiResponse {
  statusCode: number;
  error: unknown;
  message: string;
  data: {
    meta: PaginationMeta;
    results: Course[];
  };
}