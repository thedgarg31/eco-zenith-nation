const API_BASE_URL = '/api';

interface User {
  id: string;
  email: string;
  fullName: string;
  level: number;
  coolPoints: number;
  totalCo2Saved: number;
  role: string;
  createdAt: string;
}

interface AdminService {
  getAllUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  updateUserRole: (id: string, role: string) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}

export const adminService: AdminService = {
  getAllUsers: async (): Promise<User[]> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/users`, {
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
      
      let errorMessage = 'Failed to fetch users';
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
      return data.data.users;
    } catch (error) {
      throw new Error('Invalid response format');
    }
  },

  getUser: async (id: string): Promise<User> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
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
      
      let errorMessage = 'Failed to fetch user';
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
      return data.data.user;
    } catch (error) {
      throw new Error('Invalid response format');
    }
  },

  updateUserRole: async (id: string, role: string): Promise<User> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Unauthorized');
      }
      
      let errorMessage = 'Failed to update user role';
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
      return data.data.user;
    } catch (error) {
      throw new Error('Invalid response format');
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    // Check if response is ok
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Unauthorized');
      }
      
      let errorMessage = 'Failed to delete user';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        // If JSON parsing fails, use status text
        errorMessage = response.statusText || errorMessage;
      }
      throw new Error(errorMessage);
    }
  },
};