import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_URL,
});

// Kitaplar
export const getBooks = () => apiClient.get('/books/');
export const getBookById = (id) => apiClient.get(`/books/${id}`);
export const createBook = (bookData) => apiClient.post('/books/', bookData);

// Yorumlar
export const getCommentsForBook = (bookId) => apiClient.get(`/books/${bookId}/comments/`);
export const createCommentForBook = (bookId, commentData) => {
  // Not: Bu fonksiyon çağrılmadan önce token'ın axios header'larına eklenmiş olması gerekir.
  // AuthContext bunu bizim için yapıyor.
  return apiClient.post(`/books/${bookId}/comments/`, commentData);
};

// Kullanıcılar
export const loginUser = (credentials) => {
  const formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  return apiClient.post('/users/login/token', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};
export const registerUser = (userData) => apiClient.post('/users/', userData);