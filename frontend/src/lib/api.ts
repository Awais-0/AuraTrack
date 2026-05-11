/**
 * API Utility for AuraTrack
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch health status:', error);
    throw error;
  }
}

export async function fetchRoot() {
  try {
    const response = await fetch(`${API_URL}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch API root:', error);
    throw error;
  }
}

async function apiCall(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('token');
  
  const headers = new Headers(options.headers || {});
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || result.detail || 'Request failed');
  }

  return result.data;
}

export async function login(formData: FormData) {
  return apiCall('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams(formData as any),
  });
}

export async function signup(userData: any) {
  return apiCall('/api/v1/auth/signup', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}
