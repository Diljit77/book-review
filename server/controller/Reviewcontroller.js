// controllers/reviewController.js
import Book from "../models/Book.js";
import Review from "../models/Review.js"
// GET /reviews?bookId=BOOK_ID - Get reviews for a specific book
export const getReviews = async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) return res.status(400).json({ message: 'Book ID is required' });

    const reviews = await Review.find({ book: bookId }).populate('user', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error });
  }
};
export const getReviewByuser = async (req, res) => {
  try {
    const { user } = req.query;
    if (!user) return res.status(400).json({ message: 'user ID is required' ,success:false });

    const reviews = await Review.find({ user: user}).populate('user', 'name');
    res.status(200).json({success:true,reviews:reviews});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch reviews', error,success:false });
  }
};

// POST /reviews - Add a new review
export const addReview = async (req, res) => {
  try {
    const { user, book, comment, rating } = req.body;
    if (!user || !book || !comment || !rating) {
      return res.status(400).json({ message: 'All fields are required' ,success:false});
    }

    const bookExists = await Book.findById(book);
    if (!bookExists) return res.status(404).json({ message: 'Book not found', success:false });

    const newReview = new Review({ user, book, comment, rating });
    const savedReview = await newReview.save();

    res.status(201).json({ message: 'Review added successfully', success:true, review: savedReview });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add review', success:false, error:error });
  }
};