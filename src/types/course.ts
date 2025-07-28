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

export interface PaginationMeta {
    page: number;
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