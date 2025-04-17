// src/components/Header.jsx
// src/components/Header.jsx
import React, { useContext, useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { MyContext } from '../App';
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';

import { fetchDataFromApi } from '../utils/api';
const Header = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [searchInput, setSearchInput] = useState('');
const context=useContext(MyContext);
const history=useNavigate();
const [suggestions, setSuggestions] = useState([]);
useEffect(() => {
  const fetchSuggestions = async () => {
    if (searchInput.trim().length < 1) {
      setSuggestions([]);
      return;
    }

    try {
      console.log(searchInput);
      fetchDataFromApi(`/api/book/search?search=${searchInput}`).then((res)=>{
        if(res.success===true){
          setSuggestions(res.book); 
        }
        else{
          return;
        }
      }).catch(err=>console.log(err));
     
    } catch (err) {
      console.error('Failed to fetch suggestions:', err);
      setSuggestions([]);
    }
  };

  fetchSuggestions();
}, [searchInput]);
const porfilenavigation=()=>{
  if(context.islogin===true){
history("/profile");
  }else{
    history("/login");
  }
}
const navigate = useNavigate();

const handleFullSearch = (e) => {
  e.preventDefault();
  if (!searchInput.trim()) return;

  // Navigate to listing page with search query
  navigate(`/listing?search=${encodeURIComponent(searchInput.trim())}`);
  setShowDialog(false); // optionally close the dialog
};
  const logout=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    context.setalertbox({
      open:true,
      error:false,
      msg:"logout successfully"
    })
  }

  return (
    <header className="bg-white shadow-md py-4 px-8 flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-600">📘 BookVerse</h2>

    

      <nav className="space-x-6 flex items-center">
    <button
          onClick={() => setShowDialog(true)}
          className="text-gray-700 hover:text-blue-500r"
          aria-label="Open search dialog"
        >
          <FaSearch />
        </button>

        <a href="/" className="text-gray-700 hover:text-blue-500">Home</a>

        <a href="/listing" className="text-gray-700 hover:text-blue-500">Books</a>
        <a onClick={porfilenavigation} className="text-gray-700 hover:text-blue-500">Profile</a>
        {context?.islogin === true ? (
  <button onClick={logout} className="text-gray-700 hover:text-blue-500">Logout</button>
) : (
  <a href="/login" className="text-gray-700 hover:text-blue-500">Login</a>
)}

  
      </nav>

{showDialog && (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-30 z-50 flex justify-center items-start pt-20">
    <div className="bg-white w-full max-w-2xl mx-auto p-6 rounded shadow-lg relative">
      <h3 className="text-xl font-semibold mb-4">🔍 Search Books</h3>
      <form onSubmit={handleFullSearch}>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Type to search..."
          className="w-full p-3 border border-gray-300 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Search
        </button>
        <div className="mt-2 space-y-2">
  { Array.isArray(suggestions) &&
  suggestions.map((book) => (
    <Link
      to={`/books/${book._id}`}
      key={book._id}
      className="flex items-center gap-3 p-2 border rounded hover:bg-gray-100"
      onClick={() => setShowDialog(false)} // close dialog on click
    >
      <img
        src={book.image}
        alt={book.title}
        className="w-12 h-16 object-cover rounded"
      />
      <div>
        <h4 className="font-semibold text-gray-800">{book.title}</h4>
        <p className="text-sm text-gray-600">{book.author}</p>
      </div>
    </Link>
  ))}
</div>
      </form>
      <button
        onClick={() => setShowDialog(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
      >
        <ImCross />
      </button>

    </div>


  </div>
)}
    </header>
  );
};

export default Header;