const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['Romantic', 'Serene', 'Creative'], required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  photos: [String], // Cloudinary URLs
  stories: [{ userId: String, text: String, public: Boolean, createdAt: Date }],
  ratings: {
    vibe: { type: Number, default: 0 },
    safety: { type: Number, default: 0 },
    uniqueness: { type: Number, default: 0 },
    crowd: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  },
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
});

SpotSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Spot', SpotSchema); 