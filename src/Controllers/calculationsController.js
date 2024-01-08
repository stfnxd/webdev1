// calculationsController.js
const calculationsService = require('../services/calculationsService');

module.exports = {
  addCalculations: async (req, res) => {
    try {
      // Logik for at håndtere add Calculations
      const result = await calculationsService.addCalculations(req.body);
      res.json(result);
    } catch (error) {
        console.error('Error adding calculations:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
};