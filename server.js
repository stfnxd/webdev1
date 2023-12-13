const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const kontraktVærdierRouter = require('./src/router/Kontraktværdier.js');
const vehicleRoute = require('./src/router/vehicle');
const customerRoute = require('./src/router/customer');


const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/kontraktVaerdier', kontraktVærdierRouter);
app.use('/api/vehicle', vehicleRoute);
app.use('/api/customer', customerRoute);


const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});