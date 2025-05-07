import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, List, Grid, ChevronRight, Search, BookMarked, Users, BarChart3 } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Navigation */}
      <nav className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <BookOpen className="text-blue-600 mr-2" size={28} />
          <span className="font-bold text-xl text-gray-800">BookVault</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
          <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          <Link 
            to="/books" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Browse Books
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Manage Your Book Collection With Ease
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              A beautiful, modern interface to catalog, organize, and track your entire book library in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/books" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
              >
                Browse Collection
                <ChevronRight size={20} className="ml-1" />
              </Link>
              <Link 
                to="/books/create" 
                className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
              >
                Add New Book
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Main book image */}
              <div className="w-64 h-80 bg-white rounded-lg shadow-xl transform rotate-3 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-blue-500 to-indigo-600 p-4 flex items-end">
                  <div className="bg-white bg-opacity-90 p-4 rounded-lg w-full">
                    <div className="w-16 h-2 bg-blue-600 mb-2 rounded"></div>
                    <div className="w-full h-2 bg-gray-200 mb-2 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
              {/* Secondary book image */}
              <div className="w-64 h-80 bg-white rounded-lg shadow-xl absolute -top-4 -left-4 -z-10 transform -rotate-6 overflow-hidden">
                <div className="h-full w-full bg-gradient-to-br from-amber-500 to-pink-500 p-4 flex items-end">
                  <div className="bg-white bg-opacity-90 p-4 rounded-lg w-full">
                    <div className="w-16 h-2 bg-amber-600 mb-2 rounded"></div>
                    <div className="w-full h-2 bg-gray-200 mb-2 rounded"></div>
                    <div className="w-3/4 h-2 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Features</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookMarked size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Cataloging</h3>
              <p className="text-gray-600">
                Quickly add and organize your books with our intuitive interface.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Powerful Search</h3>
              <p className="text-gray-600">
                Find any book in your collection instantly with advanced search capabilities.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Author Tracking</h3>
              <p className="text-gray-600">
                Organize books by author and track your favorite writers' collections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to explore your collection?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Jump into your personal library and start managing your books today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/books" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
            >
              <List size={20} className="mr-2" />
              Table View
            </Link>
            <Link 
              to="/books" 
              className="bg-blue-800 text-white hover:bg-blue-900 font-medium px-6 py-3 rounded-lg flex items-center justify-center transition-colors"
              onClick={() => localStorage.setItem('preferredView', 'card')}
            >
              <Grid size={20} className="mr-2" />
              Card View
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <BookOpen className="text-blue-400 mr-2" size={24} />
              <span className="font-bold text-lg">BookVault</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} BookVault. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;