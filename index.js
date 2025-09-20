const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const { PORT, MONGO_URI } = require("./config");
const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15*60*1000, max: 100 }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

// Error handler
app.use(errorHandler);

// MongoDB connect + server start
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
