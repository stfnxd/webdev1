// vehicleService.js
const { execute } = require('../../Database/database.js');

module.exports = {
  addVehicleData: async (data) => {
    const excludedFields = ['Id'];
    const values = [];

    for (const key in data) {
    if (!excludedFields.includes(key)) {
    values.push(data[key]);
  }
} 

    // Use parameterized queries to prevent SQL injection
    var query = `
    INSERT INTO køretøjdata
    (Køretøj, NytKøretøj, RegDato, Nypris, Momsdød, Fuld_Afgift, Kilometerafstand )
    VALUES (?, ?, ?, ?, ?, ?, ?)`;

    // Use an array to pass values securely
    var valuesArray = [...values];
//return valuesArray;
    try {
        const response = await execute(query, valuesArray);
        console.log('Data for vehicle saved successfully', response);
        return response;
      } catch (error) {
        console.error('Error saving vehicle data:', error);
        throw error;
      }
  },
};