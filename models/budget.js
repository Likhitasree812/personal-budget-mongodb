const mongoose = require("mongoose");

const budgetsSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true,
        minLength: [6, 'The color code should be in hex code']
    }
}, {collection: 'budgets'});

module.exports = mongoose.model('budgets',budgetsSchema);