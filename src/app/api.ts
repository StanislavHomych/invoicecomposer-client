// Use environment variable for API URL
// In development, use relative path to leverage Vite proxy (empty string = relative)
// In production, use VITE_API_URL if set (for separate deployments), otherwise use relative path
// For separate client/server deployments, set VITE_API_URL to your server URL
// Get API URL with proper formatting (no trailing slash)
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) {
    // Remove trailing slash if present
    return envUrl.replace(/\/$/, '');
  }
  // Production fallback - use server URL
  if (import.meta.env.PROD) {
    return 'https://invoicecomposer-server.vercel.app';
  }
  return '';
};
const API_URL = getApiUrl();

export interface ApiError {
  error: string;
  details?: any;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('accessToken');
  
  // Check if token exists for protected routes (except auth routes)
  if (!token && !endpoint.includes('/auth/')) {
    // Clear any stale data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    // Redirect to login if not already there
    if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      window.location.href = '/login';
    }
    throw new Error('Please log in to continue');
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        // Clear auth data
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // Dispatch event to notify other tabs
        window.dispatchEvent(new StorageEvent('storage', {
          key: 'accessToken',
          oldValue: token || null,
          newValue: null,
          storageArea: localStorage,
        }));
        // Redirect to login if not already there
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          window.location.href = '/login';
        }
        throw new Error('Invalid or expired token. Please log in again.');
      }

      let errorMessage = 'Request failed';
      try {
        const error: ApiError = await response.json();
        errorMessage = error.error || errorMessage;
        
        // If there are validation details, include them
        if (error.details && Array.isArray(error.details) && error.details.length > 0) {
          const firstDetail = error.details[0];
          if (firstDetail.message) {
            errorMessage = firstDetail.message;
          }
        }
      } catch {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || `Server error (${response.status})`;
      }
      
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (error) {
    // Re-throw if it's already an Error with a message
    if (error instanceof Error) {
      throw error;
    }
    // Otherwise, wrap in a generic error
    throw new Error('Network error. Please check your connection and try again.');
  }
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint),
  
  post: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  patch: <T>(endpoint: string, data?: any) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
  
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, {
      method: 'DELETE',
    }),
};
