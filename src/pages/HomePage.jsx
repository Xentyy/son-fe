import React, { useState, useEffect } from 'react';
import { getBooks } from '../services/api';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import AddBookModal from '../components/AddBookModal';
import { FaSearch } from 'react-icons/fa';

const HomePage = () => {
  const [books, setBooks] = useState([]);
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

  if (loading && !books.length) return <div className="min-h-screen flex items-center justify-center">Yükleniyor...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="bg-light-bg min-h-screen font-sans">
      <Header onAddBookClick={() => setIsModalOpen(true)} />
      
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <header className="mb-8 p-8 bg-gradient-to-r from-primary to-accent rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="flex items-center space-x-4">
              <div className="bg-white/20 p-3 rounded-lg">
                  <FaBook className="w-8 h-8 text-white"/>
              </div>
              <div>
                  <h1 className="text-3xl sm:text-4xl font-bold">BookSense</h1>
                  <p className="mt-1 text-md sm:text-lg opacity-90">Yapay zeka destekli kitap yorum analizi sistemi</p>
              </div>
          </div>
        </header>

        <div className="mb-8 p-2 bg-white rounded-2xl shadow-lg flex items-center">
           <div className="relative w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FaSearch /></span>
              <input 
                type="text"
                placeholder="Kitap adı ile arama yapın..."
                className="w-full p-4 pl-12 border-none rounded-lg focus:ring-2 focus:ring-primary transition"
              />
           </div>
           <button className="bg-primary text-white font-bold py-4 px-6 sm:px-8 rounded-lg hover:bg-accent transition whitespace-nowrap ml-2">Ara</button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Filtreler</h2>
                    <p className="text-gray-400 text-sm">Filtreleme özellikleri yakında eklenecektir.</p>
                </div>
            </aside>
            <main className="lg:col-span-3">
              {books.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-lg p-10 text-center text-gray-500">
                    <p>Gösterilecek kitap bulunamadı. Lütfen giriş yapıp yeni bir kitap ekleyin.</p>
                </div>
              )}
            </main>
        </div>
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