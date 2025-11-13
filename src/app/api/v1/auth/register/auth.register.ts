import apiService from "@/app/api/api";

export const registerUser = async (data: { email: string; password: string; fullName: string }) => {
      try {
            const response = await apiService.post<any>("/v1/auth/register", data)
            return response;
      } catch (error) {
            console.error('Error during registration:', error);
            throw error;
      }
};



