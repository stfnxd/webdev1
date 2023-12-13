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
    ( Navn, Under_25, Kundetype, Kontrakttype, Tilbudsdato, Sæson, Import )
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Use an array to pass values securely
    var valuesArray = [...values];
//return valuesArray;
    try {
        const response = await execute(query, valuesArray);
        console.log('Data customer saved successfully', response);
        return response;
      } catch (error) {
        console.error('Error saving customer data:', error);
        throw error;
      }
  },
};