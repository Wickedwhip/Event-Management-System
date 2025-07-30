// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use(express.static('public'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.get('/', (req, res) => {
  res.send('Welcome to Event Management System API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
