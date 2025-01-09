export const registerUser = async (data: { email: string; password: string; fullName: string }) => {
      try {
            const response = await fetch('http://47.245.95.207:8000/api/v1/auth/register', {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(data),
            });

            if (!response.ok) {
                  const error = await response.json();
                  throw new Error(error.message || 'Failed to register');
            }

            return await response.json(); // Mengembalikan response jika berhasil
      } catch (error) {
            console.error('Error during registration:', error);
            throw error;
      }
};




