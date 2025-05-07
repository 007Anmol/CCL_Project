import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { ArrowLeft, BookOpen, Save, Loader2 } from 'lucide-react';

import Spinner from '../components/Spinner';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [originalData, setOriginalData] = useState(null);
  
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setFetchLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const bookData = response.data;
        setAuthor(bookData.author);
        setPublishYear(bookData.publishYear);
        setTitle(bookData.title);
        setOriginalData(bookData);
        setFetchLoading(false);
      })
      .catch((error) => {
        setFetchLoading(false);
        enqueueSnackbar('Failed to fetch book details', { variant: 'error' });
        console.log(error);
      });
  }, [id, enqueueSnackbar]);
  
  const handleEditBook = () => {
    if (!title || !author || !publishYear) {
      enqueueSnackbar('Please fill all required fields', { variant: 'warning' });
      return;
    }

    const data = {
      title,
      author,
      publishYear,
    };
    
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book updated successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error updating book', { variant: 'error' });
        console.log(error);
      });
  };

  const hasChanges = () => {
    if (!originalData) return false;
    return (
      title !== originalData.title ||
      author !== originalData.author ||
      publishYear !== originalData.publishYear
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header with Back Button */}
      <div className="flex items-center mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <BookOpen className="mr-2" size={24} />
          Edit Book
        </h1>
      </div>

      {fetchLoading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <form className="space-y-6">
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Book Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter book title"
                  required
                />
              </div>

              {/* Author Field */}
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  id="author"
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter author name"
                  required
                />
              </div>

              {/* Publish Year Field */}
              <div>
                <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700 mb-1">
                  Publish Year *
                </label>
                <input
                  id="publishYear"
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter publish year"
                  required
                />
              </div>

              {/* Book Cover Preview (if available in original data) */}
              {originalData && originalData.imageUrl && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Cover Image
                  </label>
                  <div className="w-40 h-56 overflow-hidden rounded-lg border border-gray-200">
                    <img 
                      src={originalData.imageUrl} 
                      alt={`${title} cover`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    To change the cover image, please use the main edit page
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditBook}
                  disabled={loading || !hasChanges()}
                  className={`px-6 py-2 flex items-center gap-2 font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                    hasChanges() 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <Loader2 className="animate-spin mr-2" size={24} />
            <span>Updating book...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBook;