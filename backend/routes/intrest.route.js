import express from 'express';
import {
  markInterest,
  getInterestsByEvent,
  getInterestsByUser,
} from '../controllers/intrest.controller.js';
import { protect, isOrganizerOrAdmin } from '../middlewares/auth.middle.js';

const router = express.Router();

router.post('/', protect, markInterest); 
router.get('/events/:eventId', protect, isOrganizerOrAdmin, getInterestsByEvent); 
router.get('/users/:userId', protect, getInterestsByUser); 

export default router;