// calculations.js
const express = require('express');
const calculationsController = require('../Controllers/calculationsController');

const router = express.Router();

// Calculations add API route
router.post('/add', calculationsController.addCalculations);

module.exports = router;