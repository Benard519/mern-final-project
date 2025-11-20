import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('recipehub-token', token);
  } else {
    delete apiClient.defaults.headers.common.Authorization;
    localStorage.removeItem('recipehub-token');
  }
};

const responseBody = (res) => res.data;

export const authApi = {
  register: (payload) => apiClient.post('/auth/register', payload).then(responseBody),
  login: (payload) => apiClient.post('/auth/login', payload).then(responseBody),
  profile: () => apiClient.get('/auth/me').then(responseBody),
  update: (payload) => apiClient.put('/auth/me', payload).then(responseBody),
};

export const recipeApi = {
  list: (params) => apiClient.get('/recipes', { params }).then(responseBody),
  detail: (id) => apiClient.get(`/recipes/${id}`).then(responseBody),
  create: (payload) => apiClient.post('/recipes', payload).then(responseBody),
  update: (id, payload) => apiClient.put(`/recipes/${id}`, payload).then(responseBody),
  remove: (id) => apiClient.delete(`/recipes/${id}`).then(responseBody),
  toggleLike: (id) => apiClient.post(`/recipes/${id}/like`).then(responseBody),
  addComment: (id, payload) => apiClient.post(`/recipes/${id}/comments`, payload).then(responseBody),
  deleteComment: (id, commentId) =>
    apiClient.delete(`/recipes/${id}/comments/${commentId}`).then(responseBody),
};

export const flashcardApi = {
  generate: ({ recipeId }) => apiClient.post('/flashcards', { recipeId }).then(responseBody),
  byRecipe: (recipeId) => apiClient.get(`/flashcards/${recipeId}`).then(responseBody),
};

