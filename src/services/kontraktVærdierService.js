// kontraktVærdierService.js
const { execute } = require('../../Database/database.js');

module.exports = {
  addKontraktværdier: async (data) => {
    const excludedFields = ['Id'];
    const Id = 8;
    
    const values = [];
    for (const key in data) {
    if (!excludedFields.includes(key)) {
    values.push(data[key]);
  }
} 

    // Use parameterized queries to prevent SQL injection
    var query = `
    INSERT INTO kontrakt_værdier
    (Id, Udsalgspris, Kostpris, Handelsværdi_DK, Restværdihæftelse, Kontantpris, Løbetid, Kontraktens_Løbetid, Rente, Kontraktoprettelse, Engangsydelse, Depositum, Afskrivning, Privat_Andel, Registeringsafgift )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    // Use an array to pass values securely
    var valuesArray = [Id, ...values];
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