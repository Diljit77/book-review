import express from 'express';
import {
  getReviews,
  addReview,
  getReviewByuser
} from "../controller/Reviewcontroller.js";

const router = express.Router();
router.get("/user",getReviewByuser);

router.get('/', getReviews);


router.post('/', addReview);


export default router;