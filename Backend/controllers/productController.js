const Product = require("../model/productModel");
const Category = require("../model/categoryModel");

async function createProduct(req, res) {
  try {
    const { name, category, price, description, inStock, quantity } = req.body;
   

    // Check if the product already exists (optional)
    let product = await Product.findOne({ name });
    if (product) {
      return res.status(400).json({ msg: "Product already exists" });
    }
    // Create a new product instance
    product = new Product({
      name,
      category,
      price,
      description,
      inStock,
      quantity,
      createdBy: req.user.id,
    });

    // Save the product to the database
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

async function updateProduct(req, res) {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send();
    }
    res.status(200).send(deletedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getAllProduct(re, res) {
  try {
    const products = await Product.find();
     // Modify each person object to include fullName, profileImage, and other necessary fields
const modifiedProducts = products.map(product => ({
    id: product._id,
    name:product.name,
    category:product.category,
    price:product.price,
    description:product.description,
    inStock:product.inStock ? 'InStock' : 'OutOfStock',
    quantity:product.quantity,
  }));

  // Send the modified response
  res.status(200).send(modifiedProducts);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
}
}

module.exports = { createProduct, updateProduct, deleteProduct, getAllProduct };
