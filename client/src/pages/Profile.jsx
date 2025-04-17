// src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDataFromApi } from '../utils/api';
import { Rating } from '@mui/material';
const mockUser = {
  name: 'John Doe',
  email: 'johndoe@example.com',
};

const mockUserReviews = [
  { book: 'The Alchemist', comment: 'Loved the message!', rating: 5 },
  { book: 'Deep Work', comment: 'Helped me focus better.', rating: 4 },
];

const UserProfile = () => {
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });
const [mockUserReviews,setMockuserReview]=useState([])
  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };


  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(updatedUser);
    setEditing(false);
  };
  useEffect(()=>{
    const getuserdetails=()=>{
      const User=JSON.parse(localStorage.getItem("user"));
      setUser({
        name:User.name,
        email:User.email
      }
      

      )
    }
    const fetchuserreview=()=>{
      const User=JSON.parse(localStorage.getItem("user"));
      const userid=User._id;
      fetchDataFromApi(`/api/review/user?user=${userid}`).then((res)=>{
        if(res.success===true){
          setMockuserReview(res.reviews)
        }
      })
    }
  fetchuserreview();
    getuserdetails();
  })

  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-6">👤 User Profile</h2>

          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-4 mb-6">
              <input
                type="text"
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <input
                type="email"
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
          ) : (
            <div className="mb-6">
              <p className="text-lg font-medium">Name: {user.name}</p>
              <p className="text-lg font-medium">Email: {user.email}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </div>
          )}

          <div>
            <h3 className="text-2xl font-semibold mb-4">📝 Your Reviews</h3>
            {mockUserReviews.map((review, index) => (
              <div key={index} className="border-t pt-4 pb-2">
                <p className="font-semibold text-gray-800">{review.book}</p>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-yellow-500"> <Rating name="read-only" value={review.rating} readOnly /></p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;