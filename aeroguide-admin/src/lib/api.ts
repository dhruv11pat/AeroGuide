const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
  token?: string | null;
}

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {}
): Promise<{ data?: T; error?: string }> {
  const { method = 'GET', body, token } = options;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return { error: data.error || 'Request failed' };
    }

    return { data };
  } catch (error) {
    console.error('API request error:', error);
    return { error: 'Network error. Please try again.' };
  }
}

// School types
export interface School {
  id: string;
  name: string;
  location: string;
  full_address?: string;
  rating: number;
  reviews_count: number;
  image_url: string;
  pricing: string;
  students: number;
  duration: string;
  certifications: string[];
  phone?: string;
  email?: string;
  website?: string;
  established?: number;
  fleet_size?: number;
  instructors?: number;
  description?: string;
  features: string[];
  is_active: boolean;
  created_at: string;
  training_programs?: TrainingProgram[];
}

export interface TrainingProgram {
  id?: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export interface CreateSchoolInput {
  name: string;
  location: string;
  full_address?: string;
  image_url: string;
  pricing: string;
  duration: string;
  certifications?: string[];
  phone?: string;
  email?: string;
  website?: string;
  established?: number;
  fleet_size?: number;
  instructors?: number;
  description?: string;
  features?: string[];
  programs?: Omit<TrainingProgram, 'id'>[];
}

// Stats types
export interface DashboardStats {
  stats: {
    schools: number;
    users: number;
    reviews: { total: number; pending: number };
    inquiries: { total: number; pending: number };
    messages: { total: number; new: number };
  };
  recent: {
    reviews: any[];
    inquiries: any[];
  };
}

// API functions
export const api = {
  // Schools
  getSchools: (token: string, params?: { limit?: number; offset?: number }) => {
    const queryParams: any = { ...params };
    Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);
    return apiRequest<{ schools: School[]; total: number }>(`/api/schools?${new URLSearchParams(queryParams)}`, { token });
  },

  getSchool: (token: string, id: string) =>
    apiRequest<{ school: School }>(`/api/schools/${id}`, { token }),

  createSchool: (token: string, data: CreateSchoolInput) =>
    apiRequest<{ school: School }>('/api/schools', { method: 'POST', body: data, token }),

  updateSchool: (token: string, id: string, data: Partial<CreateSchoolInput>) =>
    apiRequest<{ school: School }>(`/api/schools/${id}`, { method: 'PUT', body: data, token }),

  deleteSchool: (token: string, id: string) =>
    apiRequest<{ message: string }>(`/api/schools/${id}`, { method: 'DELETE', token }),

  // Reviews
  getReviews: (token: string, params?: { status?: string; limit?: number; offset?: number }) => {
    const queryParams: any = { ...params };
    // Remove undefined values
    Object.keys(queryParams).forEach(key => queryParams[key] === undefined && delete queryParams[key]);
    
    return apiRequest<{ reviews: any[]; total: number }>(`/api/reviews?${new URLSearchParams(queryParams)}`, { token });
  },

  updateReviewStatus: (token: string, id: string, status: 'approved' | 'rejected') =>
    apiRequest<{ review: any }>(`/api/reviews/${id}`, { method: 'PATCH', body: { status }, token }),

  deleteReview: (token: string, id: string) =>
    apiRequest<{ message: string }>(`/api/reviews/${id}`, { method: 'DELETE', token }),

  // Stats
  getStats: (token: string) =>
    apiRequest<DashboardStats>('/api/admin/stats', { token }),
};
