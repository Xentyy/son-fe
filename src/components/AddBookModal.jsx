import React, { useState } from 'react';
import { createBook } from '../services/api';

const AddBookModal = ({ isOpen, onClose, onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const newBook = { title, author, category };
      const response = await createBook(newBook);
      onBookAdded(response.data);
      setTitle(''); setAuthor(''); setCategory(''); // Formu temizle
      onClose();
    } catch (err) {
      setError('Kitap eklenirken bir hata oluştu. Lütfen giriş yaptığınızdan emin olun.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md m-4">
        <h2 className="text-2xl font-bold mb-6">Yeni Kitap Ekle</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Kitap Başlığı</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Yazar</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required className="w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Kategori</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border border-gray-300 rounded"/>
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded text-gray-600 bg-gray-200 hover:bg-gray-300">İptal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400">
              {loading ? 'Ekleniyor...' : 'Ekle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;