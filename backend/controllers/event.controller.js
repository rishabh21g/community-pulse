import Event from '../models/Event.js';

const createEvent = async (req, res) => {
  try {
    const { eventName, location, description, startDate, endDate, category, photos, registrationStartDate, registrationEndDate } = req.body;

    const event = await Event.create({
      eventName:eventName,
      location: { coordinates: [req.body.longitude, req.body.latitude] },
      description:description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      category:category,
      photos: photos || [],
      registrationStartDate: new Date(registrationStartDate),
      registrationEndDate: new Date(registrationEndDate),
      organizerID: req.user._id, 
    });

    if (event) {
      res.status(201).json(event);
    } else {
      res.status(400).json({ message: 'Invalid event data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const { search, category, sortBy } = req.query;
    const query = {};
    const sortOptions = {};

    if (search) {
      query.$or = [
        { eventName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (category) {
      query.category = category;
    }

    if (sortBy === 'date') {
      sortOptions.startDate = 1;
    }

    const events = await Event.find(query).sort(sortOptions);
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizerID', 'name email'); 
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (event) {
      event.eventName = req.body.eventName || event.eventName;
      event.location.coordinates = [req.body.longitude || event.location.coordinates[0], req.body.latitude || event.location.coordinates[1]];
      event.description = req.body.description || event.description;
      event.startDate = req.body.startDate ? new Date(req.body.startDate) : event.startDate;
      event.endDate = req.body.endDate ? new Date(req.body.endDate) : event.endDate;
      event.category = req.body.category || event.category;
      event.photos = req.body.photos || event.photos;
      event.registrationStartDate = req.body.registrationStartDate ? new Date(req.body.registrationStartDate) : event.registrationStartDate;
      event.registrationEndDate = req.body.registrationEndDate ? new Date(req.body.registrationEndDate) : event.registrationEndDate;

      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      await event.remove();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getNearbyEvents = async (req, res) => {
  try {
    const { latitude, longitude, distance } = req.query;
    const maxDistance = parseInt(distance) || 5000; 

    const events = await Event.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: maxDistance,
        },
      },
    });
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateEventStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const event = await Event.findById(req.params.id);

    if (event) {
      event.status = status;
      const updatedEvent = await event.save();
      res.json(updatedEvent);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getEventsByUserHistory = async (req, res) => {
  try {
    const events = await Event.find({ organizerID: req.params.userId }).populate('organizerID', 'name email');
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getNearbyEvents,
  updateEventStatus,
  getEventsByUserHistory,
};