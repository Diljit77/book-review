import Book from "../models/Book.js";

// GET /books - Retrieve all books (with optional pagination)
export const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();
 

    res.status(200).json({ books, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Failed to fetch books', error });
  
  }
};
// for searching functionality 
export const getbookbysearch=async (req,res) => {
  try {
      const query=req.query.search
      if(!query){
          return res.status(400).json({msg:"Query is required"})
      }
      const book=await Book.find({
          $or:[
              {
                title:{$regex:query,$options:"i"}
              },
              {
                author:{$regex:query,$options:"i"}
              },
             
          ]
      });
    return  res.status(200).json({message:"search succesfully",success:true,book:book })
      
  } catch (error) {
    console.log(error);
      res.status(500).json({msg:"server error"})

      
  }
}

// GET /books/:id - Retrieve a specific book
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Failed to fetch book', error });
  }
};


export const createBook = async (req, res) => {
  try {
    const { title, author, description, genre, year } = req.body;
    const newBook = new Book({ title, author, description, genre, year, addedBy: req.user.id });
    const savedBook = await newBook.save();
    res.status(201).json({ success: true, message: 'Book created successfully', book: savedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create book', error });
  }
};


export const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, message: 'Book updated successfully', book: updatedBook });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update book', error });
  }
};

// DELETE /books/:id
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    if (book.addedBy.toString() !== req.user.id) return res.status(403).json({ success: false, message: 'Not authorized' });

    await book.deleteOne();
    res.status(200).json({ success: true, message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete book', error });
  }
};
