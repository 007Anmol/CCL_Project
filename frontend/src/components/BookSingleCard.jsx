import { Link } from 'react-router-dom';
import { Book, User, Eye, Info, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import BookModal from './BookModal';

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Card Header with Year Badge */}
      <div className="relative p-6 pb-3 border-b border-gray-100">
        <span className="absolute top-4 right-4 bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full text-sm">
          {book.publishYear}
        </span>
        
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 pr-16 mb-1">
          {book.title}
        </h3>
        
        <div className="flex items-center text-gray-500 text-sm">
          <User size={16} className="mr-1" />
          <span>{book.author}</span>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="px-6 py-3">
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <Book size={14} className="mr-1" />
          <span className="truncate">{book._id}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Eye size={18} />
            <span>Preview</span>
          </button>
          
          <div className="flex gap-1">
            <Link 
              to={`/books/details/${book._id}`} 
              className="p-2 rounded-full hover:bg-gray-100 text-blue-600 transition-colors"
              title="Details"
            >
              <Info size={18} />
            </Link>
            <Link 
              to={`/books/edit/${book._id}`} 
              className="p-2 rounded-full hover:bg-gray-100 text-amber-600 transition-colors"
              title="Edit"
            >
              <Edit size={18} />
            </Link>
            <Link 
              to={`/books/delete/${book._id}`} 
              className="p-2 rounded-full hover:bg-gray-100 text-red-600 transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      {showModal && (
        <BookModal book={book} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default BookSingleCard;