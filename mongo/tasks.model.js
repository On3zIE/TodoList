const mongoose = require('mongoose');
module.exports = mongoose.model('Tasks', new mongoose.Schema({
    categoryId: { type: String },
    content: { type: String, default: "" },
}, { timestamps: true }));