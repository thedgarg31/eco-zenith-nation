const API_BASE_URL = '/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string | null;
  level: number;
  coolPoints: number;
  totalCo2Saved: number;
  organizationId: string | null;
  createdAt: string;
  role?: 'user' | 'admin';
}

interface LoginResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

interface RegisterResponse {
  status: string;
  token: string;
  data: {
    user: User;
  };
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'Login failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }

    try {
      const data: LoginResponse = await response.json();
      
      // Set role based on email for demonstration
      // In a real app, this would come from the backend
      data.data.user.role = email.includes('admin') ? 'admin' : 'user';
      
      return data;
    } catch (error) {
      throw new Error('Invalid response format');
    }
  },

  register: async (email: string, password: string, fullName: string): Promise<RegisterResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, fullName }),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      let errorMessage = 'Registration failed';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }

    try {
      const data: RegisterResponse = await response.json();
      data.data.user.role = 'user'; // New registrations are users by default
      return data;
    } catch (error) {
      throw new Error('Invalid response format');
    }
  },

  logout: (): void => {
    // In a real app, you might want to call an API endpoint to invalidate the token
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Unauthorized');
      }
      
      let errorMessage = 'Failed to fetch user data';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    // Check if response has content before parsing JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Invalid response format');
    }

    try {
      const data = await response.json();
      
      // Set role based on email for demonstration
      // In a real app, this would come from the backend
      data.data.user.role = data.data.user.email.includes('admin') ? 'admin' : 'user';
      
      return data.data.user;
    } catch (error) {
      throw new Error('Invalid response format');
    }
  },
};