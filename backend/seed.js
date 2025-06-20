require('dotenv').config();
const mongoose = require('mongoose');
const Spot = require('./models/Spot');

const spots = [
  {
    name: 'Rooftop Café',
    description: 'A cozy rooftop café with a beautiful sunset view over Gwalior Fort.',
    category: 'Romantic',
    location: { type: 'Point', coordinates: [78.1689, 26.2124] },
    photos: [],
    stories: [{ text: 'Perfect for a quiet date night.', public: true, createdAt: new Date() }],
    ratings: { vibe: 4.8, safety: 4.5, uniqueness: 4.7, crowd: 2.0, count: 1 },
    createdBy: 'demo',
  },
  {
    name: 'Lakeside Bench',
    description: 'A peaceful bench by the lake, ideal for solo reflection.',
    category: 'Serene',
    location: { type: 'Point', coordinates: [78.1800, 26.2180] },
    photos: [],
    stories: [{ text: 'Great for reading and relaxing.', public: false, createdAt: new Date() }],
    ratings: { vibe: 4.9, safety: 4.7, uniqueness: 4.6, crowd: 1.5, count: 1 },
    createdBy: 'demo',
  },
  {
    name: 'Mural Alley',
    description: 'A hidden alley filled with vibrant street art and murals.',
    category: 'Creative',
    location: { type: 'Point', coordinates: [78.1650, 26.2100] },
    photos: [],
    stories: [{ text: 'Inspiring place for artists.', public: true, createdAt: new Date() }],
    ratings: { vibe: 4.6, safety: 4.2, uniqueness: 4.9, crowd: 2.5, count: 1 },
    createdBy: 'demo',
  },
  {
    name: 'Secret Garden',
    description: 'A lush, quiet garden tucked away from the city noise.',
    category: 'Serene',
    location: { type: 'Point', coordinates: [78.1700, 26.2150] },
    photos: [],
    stories: [{ text: 'A hidden gem for nature lovers.', public: true, createdAt: new Date() }],
    ratings: { vibe: 4.7, safety: 4.8, uniqueness: 4.5, crowd: 1.0, count: 1 },
    createdBy: 'demo',
  },
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await Spot.deleteMany({ createdBy: 'demo' });
  await Spot.insertMany(spots);
  console.log('Seeded demo spots!');
  mongoose.disconnect();
}

seed(); 