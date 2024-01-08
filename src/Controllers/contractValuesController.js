// contractValuesController.js
const contractValuesService = require('../services/contractValuesService');

module.exports = {
  addContractValues: async (req, res) => {
    try {
      // Logik for at håndtere add ContractValues
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

      // Logik for at håndterer opdatering af ContractValues
      const result = await contractValuesService.updateContractValues(id, updatedValues);
      res.json(result);
    } catch (error) {
      console.error('Error updating contractValues:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};
