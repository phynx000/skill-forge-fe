export interface Category {
  id: number;
  name: string;
  description: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  subCategories: SubCategory[];
}

export interface CategoryApiResponse {
  statusCode: number;
  error: string | null;
  message: string;
  data: Category[];
}