// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDataFromApi } from '../utils/api';

// const featuredBooks = [
//     {
//       title: 'The Silent Patient',
//       author: 'Alex Michaelides',
//       rating: 4.5,
//       price: 12.99,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s'
//     },
//     {
//       title: 'Atomic Habits',
//       author: 'James Clear',
//       rating: 4.7,
//       price: 15.49,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s'
//     },
//     {
//       title: '1984',
//       author: 'raman',
//       rating: 4.6,
//       price: 10.75,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s'
//     },
//     {
//       title: 'To Kill a Mockingbird',
//       author: 'Harper Lee',
//       rating: 4.8,
//       price: 13.25,
//       image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s'
//     }
//   ];

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
  fetchDataFromApi(`/api/book?page=${page}&limit=4`).then((res)=>{
    setFeaturedBooks(res.books);
    setTotalPages(res.totalPages);

  }).catch(err=>console.log(err));
  } ,[page]);
  
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <section className="bg-gradient-to-r from-blue-400 to-purple-500 text-white py-20 px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to BookVerse 📚</h1>
          <p className="text-xl">Discover, Review, and Share Your Favorite Reads</p>
        </section>

        <section className="max-w-6xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">⭐ Featured Books</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.isArray(featuredBooks) &&
             featuredBooks.length!==0 &&
            featuredBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 bg-gray-300 rounded hover:bg-gray-400`}
            >
              Prev
            </button>
            <span className="px-4 py-2 font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Next
            </button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;
