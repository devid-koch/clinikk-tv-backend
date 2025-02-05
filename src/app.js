const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const mediaRoutes = require("./routes/mediaRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/media", mediaRoutes);

// Error Handler Middleware
app.use(errorHandler);

module.exports = app;
