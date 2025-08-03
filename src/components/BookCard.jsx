import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const rating = book.average_rating.toFixed(1);

  const getSentimentDetails = () => {
    if (book.comment_count === 0) return null;
    if (book.average_rating >= 4.0) return { emoji: '😊', text: 'POZİTİF', color: 'bg-green-100 text-green-800' };
    if (book.average_rating < 3.0) return { text: 'NEGATİF', color: 'bg-red-100 text-red-800' };
    return { text: 'NÖTR', color: 'bg-yellow-100 text-yellow-800' };
  };

  const sentiment = getSentimentDetails();

  return (
    <Link to={`/books/${book.id}`} className="block">
      <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-1 h-full flex flex-col justify-between cursor-pointer">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg text-gray-900 truncate">{book.title}</h3>
              <p className="text-sm text-gray-500">{book.author}</p>
            </div>
            {sentiment && (
               <div className={`text-xs font-bold px-3 py-1 rounded-full ${sentiment.color}`}>
                 {sentiment.text}
               </div>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 my-4">
            <div 
              className="bg-green-500 h-2 rounded-full" 
              style={{ width: `${(book.average_rating / 5) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-1.5">
              <span>💬</span>
              <span>{book.comment_count} yorum</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <span>⭐</span>
              <span>{rating}/5.0</span>
            </div>
            <div className="flex items-center">
              <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize">
                {book.category || 'Diğer'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;