const mongoose = require('mongoose');

const wordOfTheDaySchema = new mongoose.Schema({
    word_of_the_day: {type: String, required: true},
    pronounciation: {type: String, required: true},
    meaning: {type: String, required: true},
    example: {type: String, required: true}
});

const wordOfTheDay = mongoose.model('WordOfTheDay', wordOfTheDaySchema);

module.exports = wordOfTheDay;