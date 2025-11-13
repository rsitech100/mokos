// utils/api.ts
import Cookies from 'js-cookie';

export class ApiService {
    private baseURL: string;

    constructor(baseURL: string = process.env.NEXT_PUBLIC_BASE_API as string) {
        this.baseURL = baseURL;
    }

    // Generic GET request
    async   get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
        const url = this.constructUrl(endpoint, params);
        return this.request<T>('GET', url);
    }

    // Generic POST request
    async post<T>(endpoint: string, body?: Record<string, any>): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        return this.request<T>('POST', url, body);
    }

    // Generic PUT request
    async put<T>(endpoint: string, body?: Record<string, any>): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        return this.request<T>('PUT', url, body);
    }

    // Generic DELETE request
    async delete<T>(endpoint: string): Promise<T> {
        const url = `${this.baseURL}${endpoint}`;
        return this.request<T>('DELETE', url);
    }

    // Core request handler using fetch API
    private async request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        url: string,
        body?: Record<string, any>
    ): Promise<T> {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+Cookies.get('token')
            },
            ...(body ? { body: JSON.stringify(body) } : {}),
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                // return response as T
                const errorBody = await response.json();
                throw new Error(errorBody.message || 'API request failed');
            }
            return (await response.json()) as T;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Helper method to construct URLs with query parameters
    private constructUrl(endpoint: string, params?: Record<string, any>): string {
        const url = new URL(`${this.baseURL}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) =>
                url.searchParams.append(key, String(value))
            );
        }
        return url.toString();
    }
}

// Export a singleton instance
const apiService = new ApiService();
export default apiService;