// calculationsService.js
const { execute } = require('../../Database/database.js');

module.exports = {
  addCalculations: async (data) => {
    const excludedFields = ['Id'];
    const values = [];

        for (const key in data) {
        if (!excludedFields.includes(key)) {
        values.push(data[key]);
      }
    } 

    // Use parameterized queries to prevent SQL injection
    var query = `
    INSERT INTO beregninger
    (Restværdi, MånedligLeasing_Privat, Aktivperiode, Bekastingsgrundlag, Privatandel, Forsinkring, Engangsydelse_Privat, Depositum, Afskrivning, Engangsydelse_Erhverv, MånedligLeasing_Erhverv, Friskadedækning, GPS, Kontraktoprettelse, Finasering, Indtægter_Ialt, Dækningsbidrag, Stålgevinst/Valutakursgevinst, Samlet_Dækningsbidrag, Forholdsmæssig_Afgift_under3, Forholdsmæssig_Afgift_4-36, Forholdsmæssig_Afgift_+36, Forholdsmæssig_Rente, Forholdsmæssig_Ialt )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    var valuesArray = [...values];

    try {
        const response = await execute(query, valuesArray);
        console.log('Data calculations saved successfully', response);
        return response;
      } catch (error) {
        console.error('Error saving calculations data:', error);
        throw error;
      }
  },
};