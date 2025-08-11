import { publicClient } from './axiosConfig';
import type { CategoryApiResponse } from '../types/category';

export const categoryApi = {
  // Lấy danh sách tất cả danh mục
  getCategories: async (): Promise<CategoryApiResponse> => {
    try {
      const response = await publicClient.get('/api/v1/categories');
      console.log('Response from API:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },

  // Lấy danh mục theo ID (nếu cần thiết)
  getCategoryById: async (id: number): Promise<CategoryApiResponse> => {
    try {
      const response = await publicClient.get(`/api/v1/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  }
};
