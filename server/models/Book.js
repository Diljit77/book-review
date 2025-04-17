// models/Book.js
import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  description: { type: String, required: true },
  image: { type: String, required: true },
}, { timestamps: true });

const Book=mongoose.model('Book', bookSchema);

export default Book;
 