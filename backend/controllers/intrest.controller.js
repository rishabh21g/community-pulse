import Interest from '../models/intrest.model.js';
import Event from '../models/event.model.js'; 


const markInterest = async (req, res) => {
  try {
    const { eventId, name, email, phone, guests } = req.body;

    // Check if the user has already marked interest in this event
    const existingInterest = await Interest.findOne({ user: req.user._id, event: eventId });

    if (existingInterest) {
      res.status(400).json({ message: 'User has already marked interest in this event' });
      return;
    }

    const interest = await Interest.create({
      event: eventId,
      user: req.user._id,
      name,
      email,
      phone,
      guests: guests || 1,
    });

    if (interest) {
      res.status(201).json(interest);
    } else {
      res.status(400).json({ message: 'Failed to mark interest' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getInterestsByEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Check if the user is the organizer of the event or an admin
    if (event.organizerID.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized to view interests for this event' });
      return;
    }

    const interests = await Interest.find({ event: req.params.eventId }).populate('user', 'name email'); // Populate user details
    res.json(interests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getInterestsByUser = async (req, res) => {
  try {
    //  Allow user to view their own interests or admin to view all
    if (req.user._id.toString() === req.params.userId || req.user.role === 'admin') {
      const interests = await Interest.find({ user: req.params.userId }).populate('event', 'eventName startDate'); // Populate event details
      res.json(interests);
    } else {
      res.status(403).json({ message: 'Not authorized to view these interests' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  markInterest,
  getInterestsByEvent,
  getInterestsByUser,
};