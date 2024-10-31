const express = require('express');
const router = express.Router();
const InventoryEntry = require('../models/InventoryEntry');
const Product = require('../models/Product');

// Add inventory entry
router.post('/entry', async (req, res) => {
    try {
        const { productId, quantity, expirationDate } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const entry = new InventoryEntry({
            product: productId,
            quantity,
            expirationDate
        });
        await entry.save();
        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Remove inventory (simulate a sale or disposal)
router.post('/remove', async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const entries = await InventoryEntry.find({ product: productId }).sort({ expirationDate: 1 });
        let remainingQuantity = quantity;
        for (let entry of entries) {
            if (entry.quantity >= remainingQuantity) {
                entry.quantity -= remainingQuantity;
                await entry.save();
                break;
            } else {
                remainingQuantity -= entry.quantity;
                entry.quantity = 0;
                await entry.save();
            }
        }
        res.json({ message: 'Inventory updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get inventory status
router.get('/status', async (req, res) => {
    try {
        const entries = await InventoryEntry.find().populate('product');
        const now = new Date();
        const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

        const status = entries.map(entry => ({
            product: entry.product.name,
            quantity: entry.quantity,
            expirationDate: entry.expirationDate,
            status: entry.expirationDate < now ? 'Vencido' :
                entry.expirationDate <= threeDaysFromNow ? 'Por vencer' : 'Vigente'
        }));

        res.json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;