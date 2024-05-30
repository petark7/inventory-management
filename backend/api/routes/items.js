const express = require('express');
const router = express.Router();
const Item = require('../models/item');

// Get All Items
router.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add New Item
router.post('/', async (req, res) => {
    const { name, quantity, description, price } = req.body;
    try {
        const newItem = new Item({ name, quantity, description, price });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update Item
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, quantity, description, price } = req.body;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        item.name = name || item.name;
        item.quantity = quantity || item.quantity;
        item.description = description || item.description;
        item.price = price || item.price;

        await item.save();
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete Item
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        await item.deleteOne();
        res.json({ message: 'Item removed' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
        console.log(error)
    }
});

module.exports = router;
