const express = require('express');
const cors = require('cors');
const app = express();

const morgan = require ('morgan');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(morgan('dev'));

const userRoutes = require('./api/routes/users')
const itemRoutes = require('./api/routes/items')
const transactionRoutes = require('./api/routes/transactions')
const { verifyToken } = require('./utils/jwt');

mongoose.connect('mongodb+srv://petark7:'+ 
process.env.MONGO_ATLAS_PASSWORD + 
    '@nodejs-tutorial.pivaveq.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-tutorial'
)

const corsOptions = {
    origin: 'http://localhost:5173', // Replace with client's origin
    credentials: true, // This allows the server to accept cookies from the client
  };
  
  app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Routes which should handle requests
app.use('/users', userRoutes)
app.use('/items', verifyToken, itemRoutes);
app.use('/transactions', verifyToken, transactionRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;