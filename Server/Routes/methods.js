const express = require('express');
const router = express.Router();
const Players = require('../Models/rolePlayers');
const WOTD = require('../Models/wordOfTheDay');

router.get('/admin', async (req, res) => {
    try {
        const players = await Players.find();
        const wordOfTheDay = await WOTD.find();
        res.status(200).json(players);
        res.status(200).json(wordOfTheDay);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/admin/:id', async (req, res) => {
    try {
        const player = await Players.findById(req.params.id);
        const wordOfTheDay = await WOTD.findById(req.params.id);
        if (!player) return res.status(404).json({ error: 'Players not found' });
        res.status(200).json(player);
        if (!wordOfTheDay) return res.status(404).json({ error: 'Data not found' });
        res.status(200).json(wordOfTheDay);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;