const Spot = require('../models/Spot');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

exports.getSpots = async (req, res) => {
  try {
    const { lat, lng, radius } = req.query;
    let spots;
    if (lat && lng && radius) {
      spots = await Spot.find({
        location: {
          $geoWithin: {
            $centerSphere: [
              [parseFloat(lng), parseFloat(lat)],
              parseFloat(radius) / 6378.1 // radius in km
            ]
          }
        }
      });
    } else {
      spots = await Spot.find();
    }
    res.json(spots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSpotById = async (req, res) => {
  try {
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.status(404).json({ error: 'Spot not found' });
    res.json(spot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSpot = async (req, res) => {
  try {
    // Upload images to Cloudinary
    let photos = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'hidden-spots' });
        photos.push(result.secure_url);
        fs.unlinkSync(file.path); // Remove local file
      }
    }
    const spot = new Spot({
      ...req.body,
      photos,
      location: {
        type: 'Point',
        coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
      }
    });
    await spot.save();
    res.status(201).json(spot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.rateSpot = async (req, res) => {
  try {
    const { vibe, safety, uniqueness, crowd } = req.body;
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.status(404).json({ error: 'Spot not found' });
    // Simple average update (for demo)
    spot.ratings.vibe = (spot.ratings.vibe * spot.ratings.count + vibe) / (spot.ratings.count + 1);
    spot.ratings.safety = (spot.ratings.safety * spot.ratings.count + safety) / (spot.ratings.count + 1);
    spot.ratings.uniqueness = (spot.ratings.uniqueness * spot.ratings.count + uniqueness) / (spot.ratings.count + 1);
    spot.ratings.crowd = (spot.ratings.crowd * spot.ratings.count + crowd) / (spot.ratings.count + 1);
    spot.ratings.count += 1;
    await spot.save();
    res.json(spot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { text, public: isPublic, userId } = req.body;
    const spot = await Spot.findById(req.params.id);
    if (!spot) return res.status(404).json({ error: 'Spot not found' });
    spot.stories.push({ text, public: isPublic, userId, createdAt: new Date() });
    await spot.save();
    res.json(spot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateSpot = async (req, res) => {
  try {
    const spot = await Spot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!spot) return res.status(404).json({ error: 'Spot not found' });
    res.json(spot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteSpot = async (req, res) => {
  try {
    const spot = await Spot.findByIdAndDelete(req.params.id);
    if (!spot) return res.status(404).json({ error: 'Spot not found' });
    res.json({ message: 'Spot deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}; 