const express = require('express');
const authMiddleware = require('../middleware/auth');
const Gadget = require('../models/gadgets'); // Import the Gadget model
const router = express.Router();

// Protect all gadget routes
router.use(authMiddleware);

// 1. GET /gadgets - Retrieve all gadgets
router.get('/', async (req, res) => {
    try {
        // Retrieve 'status' from query parameters
        const { status } = req.query;

        // Prepare the condition for filtering
        const whereCondition = status ? { status } : {};

        // Fetch gadgets with the filtering condition
        const gadgets = await Gadget.findAll({ where: whereCondition });

        // Include random mission success probability
        res.json(
            gadgets.map((gadget) => ({
                ...gadget.toJSON(),
                successProbability: `${Math.floor(Math.random() * 100)}%`,
            }))
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// 2. POST /gadgets - Add a new gadget
router.post('/', async (req, res) => {
    const { name } = req.body;
    const randomCodenames = ['The Nightingale', 'The Kraken', 'The Phantom', 'The Falcon'];
    const codename = randomCodenames[Math.floor(Math.random() * randomCodenames.length)];

    try {
        const newGadget = await Gadget.create({ name: name || codename });
        res.status(201).json(newGadget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to add gadget' });
    }
});

// 3. PATCH /gadgets/:id - Update a gadget
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;

    try {
        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found' });
        }

        gadget.name = name || gadget.name;
        gadget.status = status || gadget.status;
        await gadget.save();
        res.status(200).json(gadget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to update gadget' });
    }
});

// 4. DELETE /gadgets/:id - Mark gadget as decommissioned
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ message: 'Gadget not found' });
        }

        gadget.status = 'Decommissioned';
        gadget.decommissionedAt = new Date(); // Add timestamp
        await gadget.save();
        res.status(200).json(gadget);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to delete gadget' });
    }
});

// POST: Trigger the self-destruct sequence for a specific gadget
router.post('/:id/self-destruct', async (req, res) => {
    try {
        // Find the gadget by ID
        const gadget = await Gadget.findByPk(req.params.id);
        
        // Check if the gadget exists
        if (!gadget) {
            return res.status(404).json({ error: 'Gadget not found' });
        }

        // Generate a random confirmation code (for example, a 6-character code)
        const confirmationCode = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Mark the gadget as destroyed
        gadget.status = 'Destroyed'; // Update status to 'Destroyed'
        
        // Save the changes
        await gadget.save();

        // Send response with the confirmation code and gadget status
        res.json({
            message: 'Self-destruct sequence triggered successfully!',
            confirmationCode,
            gadget: {
                id: gadget.id,
                name: gadget.name,
                status: gadget.status
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});


module.exports = router;
