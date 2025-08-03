import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { createCommentForBook } from '../services/api';

const CommentForm = ({ bookId, onCommentAdded }) => {
  const { isAuthenticated, token } = useAuth(); // AuthContext'ten giriş durumunu ve token'ı al
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Eğer kullanıcı giriş yapmamışsa, formu gösterme, bir "Giriş Yap" mesajı göster
  if (!isAuthenticated) {
    return (
      <div className="text-center p-6 border-2 border-dashed rounded-lg bg-gray-50">
        <p className="text-gray-700">Yorum yapmak ve diğer kullanıcıların analizlerini görmek için <Link to="/login" className="font-bold text-blue-600 hover:underline">giriş yapmanız</Link> gerekmektedir.</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (text.length < 10) {
      setError('Yorum en az 10 karakter olmalıdır.');
      setSubmitting(false);
      return;
    }

    try {
      // Artık token'ı doğrudan context'ten alıyoruz, sormuyoruz.
      const response = await createCommentForBook(bookId, { text, rating }, token);
      onCommentAdded(response.data);
      setText('');
      setRating(5);
    } catch (err) {
      setError('Yorum gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-4 text-gray-800">Bu Kitaba Yorum Yap</h3>
      {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4">{error}</p>}
      
      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-700">Puanınız:</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <span 
              key={star}
              onClick={() => setRating(star)}
              className={`text-4xl cursor-pointer transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              aria-label={`${star} yıldız`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Kitap hakkındaki düşüncelerinizi yazın..."
        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition"
        rows="4"
        required
      />
      <button 
        type="submit"
        disabled={submitting}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
      >
        {submitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
      </button>
    </form>
  );
};

export default CommentForm;