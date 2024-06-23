require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const problemRoutes = require('./routes/problems');
const runRoutes = require('./routes/run');

//database connection
connection();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));  // To handle URL-encoded data
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/problems', problemRoutes);
app.use('/api/run', runRoutes);
app.use('/api/submit', runRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
