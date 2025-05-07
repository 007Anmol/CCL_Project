import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';

const BooksTable = ({ books }) => {
  return (
    <div className="w-full overflow-hidden shadow-sm rounded-lg">
      {/* Table Header with Add Book Action */}
      <div className="flex justify-between items-center mb-4 px-2">
        <h2 className="text-xl font-semibold text-gray-800">Your Books</h2>
        <Link to="/books/create" className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md transition-colors duration-200">
          <Plus size={18} />
          <span>Add Book</span>
        </Link>
      </div>
      
      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm tracking-wider">#</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm tracking-wider">Title</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm tracking-wider max-md:hidden">Author</th>
              <th className="py-3 px-4 text-left text-gray-600 font-medium text-sm tracking-wider max-md:hidden">Year</th>
              <th className="py-3 px-4 text-center text-gray-600 font-medium text-sm tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {books.map((book, index) => (
              <tr 
                key={book._id} 
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                <td className="py-3 px-4 text-gray-800">{index + 1}</td>
                <td className="py-3 px-4 text-gray-800 font-medium">{book.title}</td>
                <td className="py-3 px-4 text-gray-600 max-md:hidden">{book.author}</td>
                <td className="py-3 px-4 text-gray-600 max-md:hidden">{book.publishYear}</td>
                <td className="py-3 px-4">
                  <div className="flex justify-center gap-2">
                    <Link 
                      to={`/books/details/${book._id}`}
                      className="p-1.5 bg-green-50 text-green-600 hover:bg-green-100 rounded-md transition-colors duration-200"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link 
                      to={`/books/edit/${book._id}`}
                      className="p-1.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-md transition-colors duration-200"
                      title="Edit Book"
                    >
                      <Edit size={18} />
                    </Link>
                    <Link 
                      to={`/books/delete/${book._id}`}
                      className="p-1.5 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition-colors duration-200"
                      title="Delete Book"
                    >
                      <Trash2 size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Empty State */}
      {books.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No books found</p>
          <Link 
            to="/books/create" 
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
          >
            <Plus size={18} />
            Add Your First Book
          </Link>
        </div>
      )}
    </div>
  );
};

export default BooksTable;