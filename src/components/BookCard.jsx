import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegCommentDots, FaStar, FaTags } from 'react-icons/fa';
import { BsFillEmojiSmileFill, BsFillEmojiFrownFill, BsFillEmojiNeutralFill } from 'react-icons/bs';

const BookCard = ({ book }) => {
  const rating = book.average_rating.toFixed(1);

  const getSentimentDetails = () => {
    if (book.comment_count === 0) return null;
    if (book.average_rating >= 4.0) return { icon: <BsFillEmojiSmileFill/>, text: 'POZİTİF', color: 'bg-positive/10 text-positive' };
    if (book.average_rating < 3.0) return { icon: <BsFillEmojiFrownFill/>, text: 'NEGATİF', color: 'bg-negative/10 text-negative' };
    return { icon: <BsFillEmojiNeutralFill/>, text: 'NÖTR', color: 'bg-neutral/10 text-neutral' };
  };

  const sentiment = getSentimentDetails();

  return (
    <Link to={`/books/${book.id}`} className="block group">
      <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-primary/20 transition-all duration-300 h-full flex flex-col justify-between cursor-pointer transform group-hover:-translate-y-1">
        <div>
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-xl text-gray-900 truncate group-hover:text-primary transition-colors">{book.title}</h3>
              <p className="text-md text-gray-500">{book.author}</p>
            </div>
            {sentiment && (
               <div className={`text-xs font-bold px-3 py-1.5 rounded-full flex items-center space-x-1.5 ${sentiment.color}`}>
                 <span className="text-lg">{sentiment.icon}</span>
                 <span>{sentiment.text}</span>
               </div>
            )}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 my-4">
            <div className="bg-positive h-1.5 rounded-full" style={{ width: `${(book.average_rating / 5) * 100}%` }}></div>
          </div>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center space-x-1.5">
              <FaRegCommentDots className="text-gray-400" />
              <span>{book.comment_count} yorum</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FaStar className="text-yellow-400" />
              <span>{rating}/5.0</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <FaTags className="text-gray-400" />
              <span className="capitalize">{book.category || 'Diğer'}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default BookCard;