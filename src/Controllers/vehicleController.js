// vehicleController.js
const vehicleService = require('../services/vehicleService');

module.exports = {
  addVehicleData: async (req, res) => {
    try {
      const result = await vehicleService.addVehicleData(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error adding vehicle data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Add other controller functions if needed...
};
