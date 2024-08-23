const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    CategoryName: {type: 'String', required: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false},
    createdAt : {type: Date, default:Date.now}
})

module.exports = mongoose.model('Categories', CategorySchema);