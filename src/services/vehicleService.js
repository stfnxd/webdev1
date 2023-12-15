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

  // Function to update vehicle data, vehicle Id
  updateVehicleData: async (id, updatedValues) => {

    var query = `
    UPDATE køretøjdata
    SET Id_Stelnummer = ?, Køretøj = ?, NytKøretøj = ?, RegDato = ?, Nypris = ?, Momsdød = ?, Type = ?, Fuld_Afgift = ?, Kilometerafstand = ?
    WHERE Id = ?`;

    const valuesArray = [...Object.values(updatedValues), id];

    try {
      const response = await execute(query, valuesArray);
      console.log('Vehicle data updated successfully', response);

      return response;
    } catch (error) {
      console.error('Error updating vehicle data:', error);
      throw error;
    }
  },
};