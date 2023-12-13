// customer.js
const express = require('express');
const customerController = require('../Controllers/customerController');

const router = express.Router();

router.post('/add', customerController.addCustomerData);

module.exports = router;