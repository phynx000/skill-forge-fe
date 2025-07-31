import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import type { Category } from '../types/category';
import { categoryApi } from '../services/categoryApi';
import { mockApiResponse } from '../utils/mockData';

export interface UseCategoryReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
  refetchCategories: () => void;
}

export const useCategory = (useMockData = false): UseCategoryReturn => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      
      if (useMockData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        response = mockApiResponse;
      } else {
        response = await categoryApi.getCategories();
      }
      
      if (response.statusCode === 200) {
        setCategories(response.data);
      } else {
        const errorMessage = 'Không thể tải danh mục';
        setError(errorMessage);
        message.error(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'Lỗi khi tải danh mục';
      console.error('Error fetching categories:', error);
      setError(errorMessage);
      
      // Nếu API thật bị lỗi, fallback sang mock data
      if (!useMockData) {
        console.log('Fallback to mock data');
        setCategories(mockApiResponse.data);
        message.warning('Đang sử dụng dữ liệu mẫu do lỗi kết nối API');
      } else {
        message.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }, [useMockData]);

  const refetchCategories = useCallback(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    error,
    refetchCategories,
  };
};
