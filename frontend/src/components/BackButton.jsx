import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination = '/', label }) => {
  return (
    <div className='flex items-center'>
      <Link
        to={destination}
        className='bg-gradient-to-r from-sky-600 to-sky-800 text-white px-5 py-2 rounded-md w-fit flex items-center gap-3 hover:from-sky-700 hover:to-sky-900 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium'
      >
        <BsArrowLeft className='text-xl' />
        {label && <span className="text-sm uppercase tracking-wider">{label}</span>}
      </Link>
    </div>
  );
};

export default BackButton;