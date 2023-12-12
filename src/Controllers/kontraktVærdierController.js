const kontraktVærdierService = require('../services/kontraktVærdierService');

module.exports = {
  addKontraktværdier: async (req, res) => {
    try {
      // Logic to handle adding kontraktværdier
      const result = await kontraktVærdierService.addKontraktværdier(req.body);
      res.json(result);
    } catch (error) {
        console.error('Error adding kontraktværdier:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // Other controller functions...
};