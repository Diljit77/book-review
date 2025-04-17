import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
const BookCard = ({ title, author, rating, price, image,_id }) => {
    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 hover:shadow-xl transition">
        <Link to={`/book/${_id}`} >
        <img src={image} alt={title} className="w-full h-58 object-cover rounded mb-4" />
        </Link>
       
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600">by {author}</p>
        <p className="mt-1 text-yellow-500 font-medium">      <Rating name="read-only" value={rating} size='small' readOnly />
        </p>
        <p className="mt-1 text-green-600 font-semibold">${price.toFixed(2)}</p>
        <Link
        to={`/book/${_id}`}
        className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Details
      </Link>
      </div>
    );
  };
  
  export default BookCard;