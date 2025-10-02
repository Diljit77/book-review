import express from 'express';
import {
  getReviews,
  addReview,
  getReviewByuser
} from "../controller/Reviewcontroller.js";
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();
router.get("/user",getReviewByuser);

router.get('/', getReviews);


router.post('/',verifyToken, addReview);


export default router;