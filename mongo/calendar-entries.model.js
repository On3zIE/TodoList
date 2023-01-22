const mongoose = require('mongoose');
module.exports = mongoose.model('CalendarEntries', new mongoose.Schema({
    date: { type: String },
    content: { type: String, default: "" },
}, { timestamps: true }));