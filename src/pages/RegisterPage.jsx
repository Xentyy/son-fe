import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if(password.length < 6) {
        setError('Şifre en az 6 karakter olmalıdır.');
        setLoading(false);
        return;
    }

    try {
      await registerUser({ email, password });
      // Kayıt başarılı olunca kullanıcıyı giriş sayfasına yönlendir
      navigate('/login');
    } catch (err) {
      setError('Bu e-posta adresi zaten kullanılıyor veya bir hata oluştu.');
      console.error(err);
    } finally {
        setLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Kayıt Ol</h2>
        {error && <p className="text-red-500 text-center mb-4 bg-red-100 p-3 rounded-lg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Şifre</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition"/>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400">
            {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
          </button>
        </form>
        <p className="text-center mt-6 text-gray-600">
          Zaten bir hesabın var mı? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;