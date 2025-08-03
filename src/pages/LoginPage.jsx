import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await loginUser({ username: email, password: password });
      login(response.data.access_token);
      navigate('/');
    } catch (err) {
      setError('E-posta veya şifre hatalı.');
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-light-bg">
      <div className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Giriş Yap</h2>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Şifre</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition"/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary text-white p-3 rounded-lg font-bold hover:bg-accent transition disabled:bg-gray-400">
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Hesabın yok mu? <Link to="/register" className="text-primary font-semibold hover:underline">Hemen Kayıt Ol</Link>
        </p>
      </div>
    </div>
  );
};
export default LoginPage;