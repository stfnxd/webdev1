// kontraktVærdierController.js
const kontraktVærdierService = require('../services/kontraktVærdierService');

module.exports = {
  addKontraktværdier: async (req, res) => {
    try {
      // Validate the request body (you can add more detailed validation as needed)
      if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: 'Bad Request - Empty or invalid request body' });
      }

      // Logic to handle adding kontraktværdier
      const result = await kontraktVærdierService.addKontraktværdier(req.body);

      // Assuming the service returns the result in the expected format
      res.json(result);
    } catch (error) {
      console.error('Error adding kontraktværdier:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Other controller functions...
};