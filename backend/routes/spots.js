const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Get all spots (with optional geospatial query)
router.get('/', spotController.getSpots);
// Get a single spot by ID
router.get('/:id', spotController.getSpotById);
// Create a new spot (with image upload)
router.post('/', upload.array('photos'), spotController.createSpot);
// Rate a spot
router.post('/:id/rate', spotController.rateSpot);
// Add a comment/story
router.post('/:id/comment', spotController.addComment);
// Update a spot
router.put('/:id', spotController.updateSpot);
// Delete a spot
router.delete('/:id', spotController.deleteSpot);

module.exports = router; 