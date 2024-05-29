const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));

module.exports = app;
