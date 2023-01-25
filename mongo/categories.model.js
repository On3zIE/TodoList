const mongoose = require('mongoose');
module.exports = mongoose.model('Categories', new mongoose.Schema({
    order: { type: Number },
    name: { type: String, default: "" },
    expanded: { type: Boolean, default: false },
}, { timestamps: true }));