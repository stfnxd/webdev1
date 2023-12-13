// vehicle.js
const express = require('express');
const vehicleController = require('../Controllers/vehicleController');

const router = express.Router();

// Vehicle add API route
router.post('/add', vehicleController.addVehicleData);

module.exports = router;