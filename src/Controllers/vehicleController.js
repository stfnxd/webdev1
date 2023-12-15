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
  
  updateVehicleData: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedValues = req.body;

      // Logic to handle updating vehicle data
      const result = await vehicleService.updateVehicleData(id, updatedValues);
      res.json(result);
    } catch (error) {
      console.error('Error updating vehicle data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

};
