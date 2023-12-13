// vehicle.js
const express = require('express');
const vehicleController = require('../Controllers/vehicleController');

const router = express.Router();

router.post('/add', vehicleController.addVehicleData);

module.exports = router;