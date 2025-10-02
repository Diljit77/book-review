import express from 'express';
import { getAllBooks, getBookById, createBook, updateBook, deleteBook, getbookbysearch } from '../controller/Bookcontroller.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllBooks);
router.get("/search", getbookbysearch);
router.get('/:id', getBookById);

router.post('/', verifyToken, createBook); // only logged-in users
router.put("/:id", verifyToken, updateBook); // only creator
router.delete("/:id", verifyToken, deleteBook); // only creator

export default router;
