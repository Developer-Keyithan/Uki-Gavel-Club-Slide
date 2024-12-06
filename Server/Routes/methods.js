const express = require('express');
const router = express.Router();
const Players = require('../Models/rolePlayers');
const WOTD = require('../Models/wordOfTheDay');

router.get('/admin', async (req, res) => {
    try {
        const players = await Players.find();
        const wordOfTheDay = await WOTD.find();
        res.status(200).json(players || wordOfTheDay);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        await Players.findById(req.params.id);
        await WOTD.findById(req.params.id);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;