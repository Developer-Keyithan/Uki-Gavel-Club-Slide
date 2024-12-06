const express = require('express');
const router = express.Router();
const Players = require('../Models/rolePlayers');

router.get('/admin', async (req, res) => {
    try {
        const players = await Players.find();
        res.status(200).json(players);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const player = await Players.findById(req.params.id);
        if (!player) return res.status(404).json({ error: 'Players not found' });
        res.status(200).json(player);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;