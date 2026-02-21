import axios from 'axios';
import type { Category, Product, ProductSearchResult } from '../types';

// API Base URL - must be provided in production
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' ? window.location.origin : 'http://127.0.0.1:8000');

if (!import.meta.env.VITE_API_URL && typeof window !== 'undefined' && window.location.hostname !== '127.0.0.1' && window.location.hostname !== 'localhost') {
  console.warn('VITE_API_URL is not set; falling back to same-origin API. Set VITE_API_URL for production.');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Categories API
export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>('/api/categories/');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    const response = await api.get<Category>(`/api/categories/${slug}`);
    return response.data;
  },
};

// Products API
export const productsApi = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/api/products/');
    return response.data;
  },

  getBySlug: async (slug: string): Promise<Product> => {
    const response = await api.get<Product>(`/api/products/${slug}`);
    return response.data;
  },

  getByCategory: async (categorySlug: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/api/products/category/${categorySlug}`);
    return response.data;
  },

  getRelated: async (productSlug: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/api/products/${productSlug}/related`);
    return response.data;
  },

  search: async (query: string): Promise<ProductSearchResult[]> => {
    const response = await api.get<ProductSearchResult[]>('/api/products/search', {
      params: { q: query },
    });
    return response.data;
  },
};

// Leads API
export const leadsApi = {
  create: async (data: {
    name: string;
    phone: string;
    source: string;
    email?: string;
    product?: string;
    page_url?: string;
    message?: string;
  }): Promise<void> => {
    await api.post('/api/leads', data);
  },
};

export default api;
