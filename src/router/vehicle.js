// vehicle.js
const express = require('express');
const vehicleController = require('../Controllers/vehicleController');

const router = express.Router();

// Vehicle add API route
router.post('/add', vehicleController.addVehicleData);

// Vehicle update data API route
router.put('/update/:id', vehicleController.updateVehicleData);

module.exports = router;