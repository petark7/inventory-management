const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const Item = require('../models/item');

// Get All Transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('item').populate('createdBy');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Create New Transaction
router.post('/', async (req, res) => {
    const { itemId, quantity, type, userId } = req.body;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const transaction = new Transaction({ item: itemId, quantity, type, createdBy: userId });
        await transaction.save();

        // Update item quantity
        if (type === 'sale') {
            item.quantity -= quantity;
        } else if (type === 'restock') {
            item.quantity += quantity;
        }
        await item.save();

        res.status(201).json(transaction);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;