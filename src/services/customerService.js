// customerService.js
const { execute } = require('../../Database/database.js');

module.exports = {
  addCustomerData: async (data) => {
    const excludedFields = ['Id'];
    const values = [];

    for (const key in data) {
    if (!excludedFields.includes(key)) {
    values.push(data[key]);
  }
} 

    // Use parameterized queries to prevent SQL injection
    var query = `
    INSERT INTO leasingtager
    (Id_Kontraktværdier, Navn, Email, Under_25, Kundetype, Kontrakttype, Tilbudsdato, Sæson, Import )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    var valuesArray = [...values];
    
    try {
        const response = await execute(query, valuesArray);
        console.log('Data customer saved successfully', response);
        return response;
      } catch (error) {
        console.error('Error saving customer data:', error);
        throw error;
      }
  },

  // Function to get customer, contractValues and vehicle data, by customer Id
  getAllByCustomerId: async (id) => {
    const query = `
      SELECT leasingtager.*, kontrakt_værdier.*, køretøjdata.*
      FROM leasingtager
      LEFT JOIN kontrakt_værdier ON leasingtager.Id_Kontraktværdier = kontrakt_værdier.Id
      LEFT JOIN køretøjdata ON kontrakt_værdier.Id_Køretøjdata = køretøjdata.Id
      WHERE leasingtager.Id = ?`;
  
    try {
      const response = await execute(query, [id]);
      console.log('Data customer, contractValues, and vehicle retrieved successfully', response);
      return response;
    } catch (error) {
      console.error('Error retrieving customer, contractValues, and vehicle by Id:', error);
      throw error;
    }
  },
};