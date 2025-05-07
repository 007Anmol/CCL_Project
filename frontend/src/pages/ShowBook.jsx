import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Book Details</h1>
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2">
          <button 
            onClick={() => navigate(`/books/edit/${id}`)}
            className="flex items-center gap-1 px-3 py-2 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <Edit size={18} />
            <span>Edit</span>
          </button>
          <button 
            onClick={() => navigate(`/books/delete/${id}`)}
            className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Book cover and main details */}
          <div className="md:flex">
            {book.imageUrl ? (
              <div className="md:flex-shrink-0">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="h-64 w-full object-cover md:w-64"
                />
              </div>
            ) : (
              <div className="md:flex-shrink-0 bg-gray-200 flex items-center justify-center h-64 w-full md:w-64">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center">
                <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  {book.publishYear}
                </span>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-800 mt-3 mb-2">
                {book.title}
              </h2>
              
              <p className="text-lg text-gray-600 mb-4">
                by <span className="font-medium">{book.author}</span>
              </p>
              
              <div className="text-sm text-gray-500">
                Book ID: <span className="font-mono text-xs">{book._id}</span>
              </div>
            </div>
          </div>
          
          {/* Book timestamps */}
          <div className="border-t border-gray-100 px-6 py-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Book History</h3>
            
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Calendar size={16} className="text-gray-400 mr-2" />
                <div>
                  <span className="text-gray-500 mr-2">Created:</span>
                  <span className="text-gray-700">{book.createdAt && formatDate(book.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Clock size={16} className="text-gray-400 mr-2" />
                <div>
                  <span className="text-gray-500 mr-2">Last Updated:</span>
                  <span className="text-gray-700">{book.updatedAt && formatDate(book.updatedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowBook;