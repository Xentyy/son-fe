import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaBook } from 'react-icons/fa'; // Logo için ikon

const Header = ({ onAddBookClick }) => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <FaBook className="text-primary text-3xl" />
          <span className="text-2xl font-bold text-gray-800">BookSense</span>
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={onAddBookClick}
                className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-accent transition text-sm sm:text-base"
              >
                Kitap Ekle
              </button>
              <button
                onClick={handleLogout}
                className="font-semibold text-gray-600 hover:text-red-500 transition text-sm sm:text-base"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-semibold text-gray-600 hover:text-primary transition px-3 py-2 text-sm sm:text-base">
                  Giriş Yap
              </Link>
              <Link to="/register" className="bg-primary text-white font-semibold px-4 py-2 rounded-lg hover:bg-accent transition text-sm sm:text-base">
                  Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;