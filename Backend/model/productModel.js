const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    image: { type: String },
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true},
    price: {type: Number, required: true},
    inStock: {type: Boolean},
    quantity: {type: Number, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdAt : {type: Date, default:Date.now}
});

module.exports = mongoose.model("Product", productSchema);


// {
//     "name": "Astronomia baguette tourbillon",
//     "category":"66d55c083d0cc59012d153b0" ,
//     "price":380000 ,
//     "quantity":5 ,
//     "createdBy": "66cf07bdf67759ef9211947e" 

// }