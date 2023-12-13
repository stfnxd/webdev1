// customerController.js
const customerService = require('../services/customerService');

module.exports = {
  addCustomerData: async (req, res) => {
    try {
      const result = await customerService.addCustomerData(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error adding customer data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Add other controller functions if needed...
};