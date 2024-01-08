// customerController.js
const customerService = require('../services/customerService');

module.exports = {
  // Logik til at tilføje customer data
  addCustomerData: async (req, res) => {
    try {
      const result = await customerService.addCustomerData(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error adding customer data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  // Logik til at håndtere at få customer, contractValues og vehicle data ud fra customer Id
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

  // Logik til at update customer data med customer Id
  updateCustomerData: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedValues = req.body;

      // Logik til at håndtere opdatering af customer data
      const result = await customerService.updateCustomerData(id, updatedValues);
      res.json(result);
    } catch (error) {
      console.error('Error updating customer data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};