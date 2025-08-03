import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    // Bu dış sarmalayıcıyı kaldırıyoruz, çünkü her sayfa kendi arka planını yönetecek.
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/books/:bookId" element={<BookDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;