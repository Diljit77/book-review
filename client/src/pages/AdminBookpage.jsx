// src/pages/AdminBookPage.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AdminBookPage = () => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    price: '',
    rating: '',
    image: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would normally send a POST request to your backend (e.g., axios.post('/books', book))
    console.log('Book submitted:', book);
    setSuccessMessage('✅ Book added successfully!');
    setBook({ title: '', author: '', price: '', rating: '', image: '', description: '' });
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-6">📚 Add a New Book</h2>

          {successMessage && <div className="mb-4 text-green-600 font-medium">{successMessage}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              placeholder="Book Title"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={book.price}
              onChange={handleChange}
              placeholder="Price ($)"
              className="w-full p-2 border border-gray-300 rounded"
              required
              min="0"
              step="0.01"
            />
            <input
              type="number"
              name="rating"
              value={book.rating}
              onChange={handleChange}
              placeholder="Rating (1-5)"
              className="w-full p-2 border border-gray-300 rounded"
              required
              min="1"
              max="5"
              step="0.1"
            />
            <input
              type="text"
              name="image"
              value={book.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            <textarea
              name="description"
              value={book.description}
              onChange={handleChange}
              placeholder="Book Description"
              className="w-full p-2 border border-gray-300 rounded"
              rows={4}
              required
            ></textarea>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminBookPage;