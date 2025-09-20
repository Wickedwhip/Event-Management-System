// ===== Load environment variables =====
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
console.log("Loaded MONGO_URI:", process.env.MONGO_URI); // debug line

// ===== Imports =====
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

// ===== Import routes =====
const authRoutes = require('./routes/auth');   // make sure auth.js exists
const eventRoutes = require('./routes/events'); // make sure events.js exists

const app = express();

// ===== Middleware =====
app.use(express.json());                 // parse JSON
app.use(express.urlencoded({ extended: true })); // parse URL-encoded
app.use(cors());                         // enable CORS
app.use(helmet());                       // secure headers
app.use(mongoSanitize());                // prevent MongoDB injection
app.use(morgan('dev'));                  // request logging

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                 // limit each IP to 100 requests per window
});
app.use(limiter);

// ===== Routes =====
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Event Management API is running!');
});

// ===== Error handling =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// ===== Connect to MongoDB & start server =====
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env!");
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });
