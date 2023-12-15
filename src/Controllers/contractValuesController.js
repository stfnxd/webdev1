// contractValuesController.js
const contractValuesService = require('../services/contractValuesService');

module.exports = {
  addContractValues: async (req, res) => {
    try {
      // Logic to handle adding contractValues
      const result = await contractValuesService.addContractValues(req.body);
      res.json(result);
    } catch (error) {
        console.error('Error adding contractValues:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  updateContractValues: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedValues = req.body;

      // Logic to handle updating contractValues
      const result = await contractValuesService.updateContractValues(id, updatedValues);
      res.json(result);
    } catch (error) {
      console.error('Error updating contractValues:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};
