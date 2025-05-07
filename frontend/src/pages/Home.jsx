import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import { Plus, ListFilter, Layers, Grid, BookOpen, Search } from 'lucide-react';
import Spinner from '../components/Spinner';
import BooksTable from '../components/BooksTable';
import BooksCard from '../components/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);

  // Check for preferred view in localStorage or URL params
  useEffect(() => {
    const viewParam = searchParams.get('view');
    const storedView = localStorage.getItem('preferredView');
    
    if (viewParam === 'card' || viewParam === 'table') {
      setShowType(viewParam);
    } else if (storedView === 'card' || storedView === 'table') {
      setShowType(storedView);
      setSearchParams({ view: storedView });
    }
  }, [searchParams, setSearchParams]);

  // Save view preference
  useEffect(() => {
    localStorage.setItem('preferredView', showType);
    setSearchParams({ view: showType });
  }, [showType, setSearchParams]);

  // Fetch books
  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setFilteredBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Filter books based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = books.filter(
      book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query) ||
        book.publishYear.toString().includes(query)
    );
    
    setFilteredBooks(results);
  }, [searchQuery, books]);

  // Toggle view type
  const toggleView = (type) => {
    setShowType(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <BookOpen className="h-8 w-8 text-blue-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Your Book Collection</h1>
            </div>
            
            {/* Search bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-64"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
                <button
                  className={`px-3 py-1.5 rounded-md flex items-center transition-colors ${
                    showType === 'table' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleView('table')}
                >
                  <Layers size={18} className="mr-1" />
                  <span>Table</span>
                </button>
                <button
                  className={`px-3 py-1.5 rounded-md flex items-center transition-colors ${
                    showType === 'card' 
                      ? 'bg-white shadow-sm text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => toggleView('card')}
                >
                  <Grid size={18} className="mr-1" />
                  <span>Cards</span>
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-md flex items-center transition-colors">
                <ListFilter size={18} className="mr-1" />
                <span>Filter</span>
              </button>
              <Link 
                to="/books/create"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center transition-colors"
              >
                <Plus size={18} className="mr-1" />
                <span>Add Book</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700">
            {filteredBooks.length === 1 
              ? '1 book found' 
              : `${filteredBooks.length} books found`
            }
            {searchQuery && 
              <span className="font-normal"> for "{searchQuery}"</span>
            }
          </h2>
        </div>

        {/* Books Display */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner />
          </div>
        ) : filteredBooks.length > 0 ? (
          showType === 'table' ? (
            <BooksTable books={filteredBooks} />
          ) : (
            <BooksCard books={filteredBooks} />
          )
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
              <BookOpen size={96} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">No books found</h3>
            <p className="mt-1 text-gray-500">
              {searchQuery ? 'Try adjusting your search terms' : 'Add your first book to get started'}
            </p>
            
            {!searchQuery && (
              <div className="mt-6">
                <Link
                  to="/books/create"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  <Plus size={18} className="mr-1" />
                  <span>Add Your First Book</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;