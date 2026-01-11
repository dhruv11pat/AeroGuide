import type { FlyingSchool } from '../../utils/example-schools';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('aeroguide_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Helper to map API snake_case to App camelCase
const mapApiSchoolToAppSchool = (apiSchool: any): FlyingSchool => {
  return {
    id: apiSchool.id,
    name: apiSchool.name,
    location: apiSchool.location,
    rating: Number(apiSchool.rating) || 0,
    reviews: apiSchool.reviews_count || 0,
    imageUrl: apiSchool.image_url,
    pricing: apiSchool.pricing,
    students: apiSchool.students || 0,
    duration: apiSchool.duration,
    certifications: apiSchool.certifications || [],
    fullAddress: apiSchool.full_address,
    phone: apiSchool.phone,
    email: apiSchool.email,
    website: apiSchool.website,
    established: apiSchool.established,
    fleetSize: apiSchool.fleet_size,
    instructors: apiSchool.instructors,
    description: apiSchool.description,
    programs: apiSchool.training_programs,
    testimonials: [], // API doesn't return testimonials here yet
    features: apiSchool.features || []
  };
};

export interface FetchSchoolsResponse {
  schools: FlyingSchool[];
  total: number;
  hasMore: boolean;
}

/**
 * Fetch schools with pagination
 * @param limit - Number of schools to fetch
 * @param offset - Starting index
 * @returns Promise with schools array, total count, and hasMore flag
 */
export const fetchSchools = async (limit: number = 6, offset: number = 0): Promise<FetchSchoolsResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/schools?limit=${limit}&offset=${offset}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        throw new Error('Failed to fetch schools');
    }
    const data = await response.json();
    
    // Calculate hasMore
    const total = data.total || 0;
    const hasMore = (offset + limit) < total;
    
    return {
        schools: (data.schools || []).map(mapApiSchoolToAppSchool),
        total: total,
        hasMore: hasMore
    };
  } catch (error) {
      console.error("Error fetching schools:", error);
      // Fallback to empty or throw
      return { schools: [], total: 0, hasMore: false };
  }
};

/**
 * Search schools by query (name, location, certifications)
 * @param query - Search query string
 * @returns Promise with matching schools array
 */
export const searchSchools = async (query: string): Promise<FlyingSchool[]> => {
  if (!query.trim()) {
      const res = await fetchSchools(100, 0); // Get default list
      return res.schools;
  }
  
  try {
      const response = await fetch(`${API_URL}/api/schools?search=${encodeURIComponent(query)}`, {
          headers: getAuthHeaders()
      });
       if (!response.ok) {
        throw new Error('Failed to search schools');
    }
    const data = await response.json();
    return (data.schools || []).map(mapApiSchoolToAppSchool);
  } catch(error) {
      console.error("Error searching schools:", error);
      return [];
  }
};

/**
 * Fetch a single school by ID
 * @param id - School ID
 * @returns Promise with school data or null if not found
 */
export const fetchSchoolById = async (id: number | string): Promise<FlyingSchool | null> => {
  try {
    const response = await fetch(`${API_URL}/api/schools/${id}`, {
        headers: getAuthHeaders()
    });
    if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error('Failed to fetch school');
    }
    const data = await response.json();
    return data.school ? mapApiSchoolToAppSchool(data.school) : null;
  } catch (error) {
      console.error("Error fetching school:", error);
      return null;
  }
};
