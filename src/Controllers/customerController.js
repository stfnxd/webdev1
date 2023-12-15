// customerController.js
const customerService = require('../services/customerService');

module.exports = {
  // Logic to adding customer data
  addCustomerData: async (req, res) => {
    try {
      const result = await customerService.addCustomerData(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error adding customer data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Logic to handle getting  customer, contractValues and vehicle data, by customer Id
  getAllByCustomerId: async (req, res) => {
    try {
      const { id } = req.params;
      const result = await customerService.getAllByCustomerId(id);
      res.json(result);
    } catch (error) {
      console.error('Error getting customer, contractValues and vehicle data, by customer Id:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Logic to update customer data, by customer Id
  updateCustomerData: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedValues = req.body;

      // Logic to handle updating customer data
      const result = await customerService.updateCustomerData(id, updatedValues);
      res.json(result);
    } catch (error) {
      console.error('Error updating customer data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};