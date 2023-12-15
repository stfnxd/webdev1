// customer.js
const express = require('express');
const customerController = require('../Controllers/customerController');

const router = express.Router();

// Customer add API route
router.post('/add', customerController.addCustomerData);

// New route to get customer, contractValues and vehicle data, by customer Id
router.get('/:id', customerController.getAllByCustomerId);

// PUT route for updating contract values
router.put('/update/:id', customerController.updateCustomerData);

module.exports = router;