const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const Item = require('../models/item');
const User = require('../models/user');


// Get All Transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().populate('item').populate('createdBy');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { itemId, quantity, type, userId } = req.body;
    try {
        const item = await Item.findById(itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the transaction is a sale and if there is enough stock
        if (type === 'sale' && item.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock for sale' });
        }

        // Record the old quantity
        const oldQuantity = item.quantity;

        // Update item quantity based on transaction type
        if (type === 'sale') {
            item.quantity -= Number(quantity);
        } else if (type === 'restock') {
            item.quantity += Number(quantity);
        }

        // Save the updated item
        await item.save();

        // Create the transaction with the required format
        const transaction = new Transaction({
            item: {
                _id: item._id,
                name: item.name
            },
            quantity,
            type,
            oldQuantity,
            newQuantity: item.quantity,
            createdBy: {
                _id: user._id,
                name: user.fullName
            }
        });
        await transaction.save();

        // Prepare the response data
        const response = {
            item: {
                _id: item._id,
                name: item.name
            },
            _id: transaction._id,
            date: transaction.date,
            type: transaction.type,
            oldQuantity: oldQuantity,
            newQuantity: item.quantity,
            createdBy: {
                _id: user._id,
                name: user.fullName
            }
        };

        // Send the response
        res.status(201).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get Item by ID
router.get('/item/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});


module.exports = router;