const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    inStock: {type: Boolean, default: true},
    quantity: {type: Number, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt : {type: Date, default:Date.now}
});

module.exports = mongoose.model("Product", productSchema);


