// src/pages/BookDetail.jsx
import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { useParams } from 'react-router-dom';
import { fetchDataFromApi, PostData } from '../utils/api';
import Rating from '@mui/material/Rating';
import { MyContext } from '../App';

// const mockBook = {
//   title: 'The Alchemist',
//   author: 'Paulo Coelho',
//   rating: 4.2,
//   price: 11.99,
//   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc77YbZpHoe11mduuXZgfrDvfo4Q43adq_Nw&s',
//   description: 'A journey of a shepherd boy to find his destiny.',
// };



const BookDetail = () => {
  const [mockBook,setmocbook]=useState([]);
  const context=useContext(MyContext);

  const [rating,setrating]=useState(1)
  const {id}=useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ user: '', comment: '', rating:0 });

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };
  const handlerating=(e)=>{
    setrating(e.target.value);
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newReview.user===""|| newReview===""){
      context.setalertbox({
        open:true,
        error:true,
        msg:"Please fill the required fields"
      })
      return ;
    }

    const user=localStorage.getItem("user");
if(!user){
  context.setalertbox({
    open:true,
    error:true,
    msg:"Please first login for adding a review"
  })
  return ;

     
    }
  const User=JSON.parse(user)
  const userId=User._id;
  console.log(userId);
  const fields={
    user:userId,
    book:id,
    comment:newReview.comment,
    rating:rating,

  }
  console.log(fields);
  PostData(`/api/review/`,fields).then((res)=>{
    if(res.success===true){
      context.setalertbox({
    open:true,
    error:false,
    msg:res.message
  });
return ;
} else{
  context.setalertbox({
    open:true,
    error:true,
    msg:res.message
  })
  return ;
}
  }).catch(err=>console.log(err))
 

  };
  useEffect(()=>{
fetchDataFromApi(`/api/book/${id}`).then((res)=>{
  setmocbook(res);
fetchDataFromApi(`/api/review?bookId=${id}`).then((res)=>{
 setReviews(res)
})
})
  });


  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <img src={mockBook.image} alt={mockBook.title} className="w-60 h-80 object-cover rounded" />
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{mockBook.title}</h2>
              <p className="text-gray-600 mb-2">by {mockBook.author}</p>
              <p className="text-yellow-500 font-medium"
              ><Rating value={mockBook?.rating || 0} precision={0.5} readOnly />
              </p>
              <p className="text-green-600 font-semibold mt-2 mb-4">${mockBook.price}</p>
              <p className="text-gray-700">{mockBook.description}</p>
            </div>
          </div>

          <section className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">💬 Reviews</h3>
            {reviews.map((review, index) => (
              <div key={index} className="border-t pt-4 pb-2">
                <p className="font-semibold text-blue-600">{review.user.name}</p>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-yellow-500">      <Rating name="read-only" value={review.rating} readOnly />
                </p>
              </div>
            ))}
          </section>

          <section className="mt-8">
            <h4 className="text-xl font-semibold mb-2">➕ Add Your Review</h4>
            <form  className="space-y-4">
              <input
                type="text"
                name="user"
                placeholder="Your Name"
                value={newReview.user}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
              <textarea
                name="comment"
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
       
               <div>
               <Rating
  name="simple-controlled"
  value={rating}
  onChange={handlerating}
/>
                </div>   
         


              <button
             onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookDetail;
