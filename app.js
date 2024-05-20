const express = require('express');
const app = express();
const morgan = require ('morgan');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
app.use(morgan('dev'));

const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users')
const itemRoutes = require('./api/routes/items')
const transactionRoutes = require('./api/routes/transactions')
const { verifyToken } = require('./utils/jwt');

mongoose.connect('mongodb+srv://petark7:'+ 
process.env.MONGO_ATLAS_PASSWORD + 
    '@nodejs-tutorial.pivaveq.mongodb.net/?retryWrites=true&w=majority&appName=nodejs-tutorial'
)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }

    next();
})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

// Routes which should handle requests
app.use('/users', userRoutes)
app.use('/orders', verifyToken, orderRoutes);
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