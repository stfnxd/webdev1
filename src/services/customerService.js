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

    // Bruger parametriseret forespørgsler for at undgå SQL Injections
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

  // Funktion til at få customer, contractValues og vehicle data ud fra customer Id
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

  // Funktion til at opdaterer customer data, customer ID
  updateCustomerData: async (id, updatedValues) => {

    var query = `
    UPDATE leasingtager
    SET Id_Kontraktværdier = ?, Navn = ?, Email = ?, Under_25 = ?, Kundetype = ?, Kontrakttype = ?, Tilbudsdato = ?, Sæson = ?, Import = ?
    WHERE Id = ?`;

    const valuesArray = [...Object.values(updatedValues), id];

    try {
      const response = await execute(query, valuesArray);
      console.log('Customer data updated successfully', response);

      return response;
    } catch (error) {
      console.error('Error updating customer data:', error);
      throw error;
    }
  },
};