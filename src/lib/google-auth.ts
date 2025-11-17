/**
 * Google OAuth Helper Functions
 * Menangani autentikasi dengan Google OAuth 2.0
 */

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const REDIRECT_URI = typeof window !== 'undefined' ? `${window.location.origin}/auth/google/callback` : '';

/**
 * Validasi apakah Google Client ID sudah dikonfigurasi
 */
export const isGoogleOAuthConfigured = (): boolean => {
  
  return !!GOOGLE_CLIENT_ID && 
         GOOGLE_CLIENT_ID.trim() !== '' &&
         GOOGLE_CLIENT_ID !== 'your-google-client-id-here.apps.googleusercontent.com' &&
         !GOOGLE_CLIENT_ID.includes('your-google-client-id-here') &&
         !GOOGLE_CLIENT_ID.includes('your-client-id') &&
         GOOGLE_CLIENT_ID.endsWith('.apps.googleusercontent.com');
};

/**
 * Get Google OAuth URL
 */
export const getGoogleAuthUrl = (): string => {
  if (!isGoogleOAuthConfigured()) {
    throw new Error('Google OAuth belum dikonfigurasi. Silakan setup Google Client ID di .env.local');
  }
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
};

export const GOOGLE_AUTH_URL = isGoogleOAuthConfigured() ? getGoogleAuthUrl() : '';

/**
 * Redirect ke Google OAuth page
 */
export const loginWithGoogle = () => {
  if (typeof window !== 'undefined') {
    if (!isGoogleOAuthConfigured()) {
      alert('Google OAuth belum dikonfigurasi. Silakan setup Google Client ID di .env');
      return;
    }
    window.location.href = getGoogleAuthUrl();
  }
};

/**
 * Parse Google user info dari token
 */
export const parseGoogleToken = (token: string) => {
  try {
    // Decode JWT token (bagian payload)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing Google token:', error);
    return null;
  }
};
