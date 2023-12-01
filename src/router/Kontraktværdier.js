const express = require('express');
const kontraktVærdierController = require('../Controllers/kontraktVærdierController');

const router = express.Router();

// Define your API routes
router.post('/add', kontraktVærdierController.addKontraktværdier);

module.exports = router;