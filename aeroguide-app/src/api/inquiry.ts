const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem('aeroguide_token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

export const createInquiry = async (schoolId: string, data: any) => {
    try{
        const response = await fetch(`${API_URL}/api/schools/${schoolId}/inquiries`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...getAuthHeaders()
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Failed to create inquiry' }));
            throw new Error(errorData.error || 'Failed to create inquiry');
        }
        const responseData = await response.json();
        return responseData.inquiry;
    } catch (error) {
        console.error('Error creating inquiry:', error);
        throw error;
    }
};