// kontraktVærdierService.js
const { execute } = require('../../Database/database.js');

module.exports = {
  addKontraktværdier: async (data) => {
    const excludedFields = ['Id'];
    
    const values = [];
    for (const key in data) {
    if (!excludedFields.includes(key)) {
    values.push(data[key]);
  }
} 
    const placeholders = values.map(() => '?').join(', ');

    // Use parameterized queries to prevent SQL injection
    //Udsalgspris, Kostpris, Handelsværdi_DK, Restværdihæftelse, Kontantpris, Løbetid, Kontraktens_Løbetid, Rente, Kontraktoprettelse, Engangsydelse, Depositum, Afskrivning, Privat_Andel, Registeringsafgift 
    var query = `
    INSERT INTO kontrakt_værdier
    (${Object.keys(data).filter(key => !excludedFields.includes(key)).join(', ')})
    VALUES (${placeholders} )`;

    // Use an array to pass values securely
    var valuesArray = [...values];
//return valuesArray;
    try {
        const response = await execute(query, valuesArray);
        console.log('Data saved successfully', response);
        return response;
      } catch (error) {
        console.error('Error saving data:', error);
        throw error;
      }
  },
};