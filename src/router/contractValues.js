const express = require('express');
const contractValuesController = require('../Controllers/contractValuesController');

const router = express.Router();

// Define your API routes
router.post('/add', contractValuesController.addContractValues);

module.exports = router;