require('dotenv').config();
const fsPromises = require('fs').promises;
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn')

//connect to mongoDB
connectDB();

const PORT = process.env.PORT || 3500;
app.use(cors());

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} ${req.headers.origin}`);
    next();
});

console.log(__dirname);
app.use('/', require('./routes/root'));



/*
app.get('/', (req, res) => {
    res.send('hello!')
})
*/

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})