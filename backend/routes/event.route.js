import express from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNearbyEvents,
  updateEventStatus,
  getEventsByUserHistory,
} from '../controllers/event.controller.js';
import { protect, admin, isOrganizerOrAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllEvents); // Get all events (with search, filter, sort)
router.get('/nearby', getNearbyEvents); // Get nearby events
router.get('/:id', getEventById); // Get event by ID

// Private Routes (Organizer or Admin)
router.post('/', protect, createEvent); // Create a new event
router.put('/:id', protect, isOrganizerOrAdmin, updateEvent); // Update an event
router.delete('/:id', protect, isOrganizerOrAdmin, deleteEvent); // Delete an event

// Admin-Only Routes
router.put('/:id/status', protect, admin, updateEventStatus); // Update event status (approve/reject)
router.get('/history/user/:userId', protect, admin, getEventsByUserHistory); // Get event history by user

export default router;