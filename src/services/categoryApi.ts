import axios from 'axios';
import type { CategoryApiResponse } from '../types/category';

// Base URL - có thể thay đổi theo môi trường
const BASE_URL = import.meta.env.VITE_BASE_URL_SERVER|| 'http://localhost:8080/api';

export const categoryApi = {
  // Lấy danh sách tất cả danh mục
  getCategories: async (): Promise<CategoryApiResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/categories`);
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
      const response = await axios.get(`${BASE_URL}/categories/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching category by ID:', error);
      throw error;
    }
  }
};
