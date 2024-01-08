// contractValuesService.js
const { execute } = require('../../Database/database.js');

module.exports = {
  // Funktion for at add contractValues
  addContractValues: async (data) => {
    const excludedFields = ['Id'];
    const values = [];

    for (const key in data) {
      if (!excludedFields.includes(key)) {
        values.push(data[key]);
      }
    } 
    
    // Bruger parametriseret forespørgsler for at undgå SQL Injections
    var query = `
    INSERT INTO kontrakt_værdier
    (Id_Køretøjdata, Udsalgspris, Kostpris, Handelsværdi_DK, Restværdihæftelse, Kontantpris, Løbetid, Kontraktens_Løbetid, Rente, Kontraktoprettelse, Engangsydelse, Depositum, Afskrivning, Provision, Privat_Andel, Registeringsafgift )
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    var valuesArray = [...values];

    try {

      const response = await execute(query, valuesArray);
      console.log('Data contractValues saved successfully', response);

      return response;
    } catch (error) {
        console.error('Error saving contractValues data:', error);
        throw error;
    }
  },

  // Logik til at opdaterer contractValue efter ID
  updateContractValues: async (id, updatedValues) => {

    var query = `
    UPDATE kontrakt_værdier
    SET Id_Køretøjdata = ?, Udsalgspris = ?, Kostpris = ?, Handelsværdi_DK = ?, Restværdihæftelse = ?, Kontantpris = ?, Løbetid = ?, Kontraktens_Løbetid = ?, Rente = ?, Kontraktoprettelse = ?, Engangsydelse = ?, Depositum = ?, Afskrivning = ?, Provision = ?, Privat_Andel = ?, Registeringsafgift = ?
    WHERE Id = ?`;

    const valuesArray = [...Object.values(updatedValues), id];

    try {
      const response = await execute(query, valuesArray);
      console.log('ContractValues data updated successfully', response);

      return response;
    } catch (error) {
      console.error('Error updating contractValues data:', error);
      throw error;
    }
  }
};