import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDataFromApi } from '../utils/api';
import { useLocation } from 'react-router-dom';
// const allBooks = [
//   { title: 'The Alchemist', author: 'Paulo Coelho', rating: 4.2, price: 11.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', rating: 4.0, price: 10.49, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'The Power of Now', author: 'Eckhart Tolle', rating: 4.6, price: 14.29, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', rating: 4.1, price: 12.59, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'Deep Work', author: 'Cal Newport', rating: 4.5, price: 13.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', rating: 4.3, price: 15.49, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'Can’t Hurt Me', author: 'David Goggins', rating: 4.7, price: 16.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
//   { title: 'Start With Why', author: 'Simon Sinek', rating: 4.4, price: 13.75, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s' },
// ];

const Listing = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get('search') || '';
  const [ratingFilter, setRatingFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [allBooks,setallbooks]=useState([]);
  const authors = [...new Set(allBooks.map(book => book.author))];
  const filteredBooks = allBooks.filter((book) => {
    const matchesSearch =
      searchTerm === '' ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
  
    return (
      matchesSearch &&
      (ratingFilter === '' || book.rating >= parseFloat(ratingFilter)) &&
      (priceFilter === '' || book.price <= parseFloat(priceFilter)) &&
      (authorFilter === '' || book.author === authorFilter)
    );
  });
useEffect(()=>{
  fetchDataFromApi("/api/book/").then((res)=>{
setallbooks(res.books);
  })
})
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen flex">
        {/* Sidebar Filter */}
        <aside className="w-64 p-6 bg-white shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filter Books</h2>

          <div className="mb-6">
            <label className="block mb-2 text-gray-700">Minimum Rating</label>
            <select
              value={ratingFilter}
              onChange={e => setRatingFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Max Price ($)</label>
            <input
              type="text"
              value={priceFilter}
              onChange={e => setPriceFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block mb-2 text-gray-700">Author</label>
            <select
              value={authorFilter}
              onChange={e => setAuthorFilter(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">All Authors</option>
              {authors.map((author, idx) => (
                <option key={idx} value={author}>{author}</option>
              ))}
            </select>
          </div>
        </aside>

        {/* Book Grid */}
        <main className="flex-1 p-8">
          <h2 className="text-3xl font-semibold mb-6">📚 Book Listing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            { Array.isArray(filteredBooks) &&
            filteredBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
          {filteredBooks.length === 0 && (
            <p className="text-gray-500 mt-8">No books match your filters.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Listing;
