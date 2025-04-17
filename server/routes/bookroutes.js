// routes/bookRoutes.js
import express from 'express';
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getbookbysearch
} from '../controller/Bookcontroller.js';

const router = express.Router();


router.get('/', getAllBooks);
router.get("/search",getbookbysearch);
router.get('/:id', getBookById);


router.post('/', createBook);

router.put("/:id",updateBook);

router.delete("/:id",deleteBook);


export default router;