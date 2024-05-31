const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    item: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    quantity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['sale', 'restock'],
        required: true
    },
    oldQuantity: {
        type: Number,
        required: true
    },
    newQuantity: {
        type: Number,
        required: true
    },
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId,
        name: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
