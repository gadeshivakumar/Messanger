const API_BASE_URL = "https://messanger-backend-cu42.onrender.com/api";

// Helper function to get auth headers
const getAuthHeaders = (includeContentType = true) => {
  const token = localStorage.getItem('authToken');
  const headers = {};
  if (includeContentType) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

// Authentication API calls
export const authAPI = {
  login: async (phone, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Keep for initial login to set cookies
      body: JSON.stringify({ phone, password })
    });
    return response;
  },

  register: async (username, phone, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Keep for initial registration
      body: JSON.stringify({ username, phone, password })
    });
    return response;
  },

  logout: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'DELETE',
      headers: getAuthHeaders(false),
      credentials: 'include'
    });
    return response;
  },

  checkLogin: async () => {
    const response = await fetch(`${API_BASE_URL}/user/islogin`, {
      headers: getAuthHeaders(false),
      credentials: 'include'
    });
    return response;
  }
};

// User API calls
export const userAPI = {
  getContacts: async () => {
    const response = await fetch(`${API_BASE_URL}/user/con`, {
      method: 'GET',
      headers: getAuthHeaders(false)
    });
    return response;
  },

  addContact: async (name, phone) => {
    const response = await fetch(`${API_BASE_URL}/user/add`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ name, phone })
    });
    return response;
  },

  deleteContact: async (phone) => {
    const response = await fetch(`${API_BASE_URL}/user/delete/${phone}`, {
      method: 'DELETE',
      headers: getAuthHeaders(false)
    });
    return response;
  },

  getUserDetails: async (phone) => {
    const response = await fetch(`${API_BASE_URL}/user/getDetails/${phone}`, {
      method: 'GET',
      headers: getAuthHeaders(false)
    });
    return response;
  },

  updateProfile: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: 'POST',
      headers: getAuthHeaders(false), // Don't set Content-Type for FormData
      body: formData
    });
    return response;
  },

  getMessages: async (phone) => {
    const response = await fetch(`${API_BASE_URL}/user/getMessages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ phone })
    });
    return response;
  },

  deleteMessage: async (phone, messageType, messageId) => {
    const response = await fetch(`${API_BASE_URL}/user/${phone}/delMessage/${messageType}/${messageId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(false)
    });
    return response;
  }
};