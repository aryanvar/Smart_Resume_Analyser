const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Example route
app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.listen(5000, () => console.log('Backend running on port 5000'));
