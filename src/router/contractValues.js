// contractValues.js
const express = require('express');
const contractValuesController = require('../Controllers/contractValuesController');

const router = express.Router();

// ContractValues add API route
router.post('/add', contractValuesController.addContractValues);

// ContractValues update API route
router.put('/update/:id', contractValuesController.updateContractValues);

module.exports = router;