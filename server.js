const express = require('express');
var cors = require('cors')
const bodyParser = require('body-parser');
const kontraktVærdierRouter = require('./src/router/Kontraktværdier.js');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/kontraktVaerdier', kontraktVærdierRouter);


const PORT = process.env.PORT || 5174;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});