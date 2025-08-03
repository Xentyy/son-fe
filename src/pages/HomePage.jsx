import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import AddBookModal from '../components/AddBookModal';

const HomePage = () => {
  const [books, setBooks] =useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        setBooks(response.data);
      } catch (err) {
        setError("Kitaplar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleBookAdded = (newBook) => {
    setBooks([newBook, ...books]);
  };

  if (loading) return <div className="text-center p-10">Yükleniyor...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header onAddBookClick={() => setIsModalOpen(true)} />
      
      <div className="container mx-auto p-6">
        <div className="mb-8 p-6 bg-white rounded-xl shadow-sm">
           <h2 className="text-2xl font-bold">Kitapları Keşfet</h2>
           <p className="text-gray-500">Arama ve filtreleme özellikleri yakında eklenecektir.</p>
        </div>

        <main>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">Gösterilecek kitap bulunamadı.</p>
          )}
        </main>
      </div>

      <AddBookModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onBookAdded={handleBookAdded}
      />
    </div>
  );
};

export default HomePage;