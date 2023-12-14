// vehicleService.js
const { execute } = require('../../Database/database.js');
const contractValuesService = require('./contractValuesService.js');

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
    (Id_Stelnummer, Køretøj, NytKøretøj, RegDato, Nypris, Momsdød, Type, Fuld_Afgift, Kilometerafstand )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    var valuesArray = [...values];

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