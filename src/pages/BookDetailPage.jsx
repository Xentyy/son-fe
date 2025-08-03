import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBookById, getCommentsForBook } from '../services/api';
import CommentForm from '../components/CommentForm';
import Header from '../components/Header';

const BookDetailPage = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Veri çekiliyor: Kitap ID ${bookId}`);

        const [bookResponse, commentsResponse] = await Promise.all([
          getBookById(bookId),
          getCommentsForBook(bookId)
        ]);
        
        console.log("Kitap verisi alındı:", bookResponse.data);
        console.log("Yorum verisi alındı:", commentsResponse.data);

        setBook(bookResponse.data);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error("Detay sayfası hatası:", err);
        setError('Veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId]);

  const handleCommentAdded = (newComment) => {
    setComments([newComment, ...comments]);
    if(book) {
      setBook(prevBook => ({...prevBook, comment_count: prevBook.comment_count + 1}));
    }
  };

  if (loading) {
    return (
        <>
            <Header />
            <div className="text-center p-20 text-2xl font-semibold text-gray-500">Yükleniyor...</div>
        </>
    );
  }

  if (error) {
    return (
        <>
            <Header />
            <div className="text-center p-20 text-2xl font-semibold text-red-500">{error}</div>
        </>
    );
  }
  
  if (!book) {
      return (
          <>
            <Header />
            <div className="text-center p-20 text-2xl font-semibold">Kitap bulunamadı.</div>
          </>
      )
  }

  return (
    <div className="bg-gray-100 min-h-screen">
        <Header />
        <div className="container mx-auto p-4 sm:p-6">
            <Link to="/" className="text-blue-600 hover:underline mb-6 inline-block">← Tüm Kitaplar</Link>
            
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{book.title}</h1>
                <p className="text-lg sm:text-xl text-gray-500 mt-2">{book.author}</p>
                 <div className="flex items-center space-x-6 mt-4 text-gray-700">
                    <span className="flex items-center"><span className="text-yellow-500 mr-1">⭐</span> {book.average_rating.toFixed(1)}/5.0</span>
                    <span className="flex items-center"><span className="mr-1">💬</span> {book.comment_count} yorum</span>
                </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg my-8">
                <CommentForm bookId={bookId} onCommentAdded={handleCommentAdded} />
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Yorumlar</h2>
                {comments && comments.length > 0 ? (
                  <div className="space-y-6">
                    {comments.map(comment => (
                      <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        {/* HATA ÖNLEYİCİ KONTROL: comment.user var mı? */}
                        <p className="font-semibold text-gray-800">{comment.user?.email.split('@')[0] || 'Anonim'}</p>
                        <p className="text-yellow-500 my-1">{'★'.repeat(comment.rating)}<span className="text-gray-300">{'★'.repeat(5 - comment.rating)}</span></p>
                        <p className="mt-2 text-gray-700">{comment.text}</p>
                        {comment.sentiment && (
                          <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-sm font-semibold text-gray-600">AI Analizi:</p>
                            <p className="text-sm"><span className="font-bold">Duygu:</span> {comment.sentiment}</p>
                            <p className="text-sm"><span className="font-bold">Özet:</span> {comment.summary}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Bu kitap için henüz yorum yapılmamış.</p>
                )}
            </div>
        </div>
    </div>
  );
};

export default BookDetailPage;