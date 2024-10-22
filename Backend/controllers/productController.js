const Product = require("../model/productModel");
const Category = require("../model/categoryModel");

async function createProduct(req, res) {
  try {
    const { name, category, price, inStock, quantity } = req.body;
    const image = req.file ? req.file.path : null;

    // Validate required fields
    if (!name || !category || !price || !quantity) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if the product already exists (optional)
    let product = await Product.findOne({ name });
    if (product) {
      return res.status(400).json({ msg: "Product already exists" });
    }

    // Create a new product instance
    product = new Product({
      name,
      image,
      category,
      price,
      inStock,
      quantity,
      createdBy: req.user.id,
    });

    // Save the product to the database
    await product.save();
    // Fetch all products to update the frontend
    const products = await Product.find();
    res.status(201).json("Product added successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

async function updateProduct(req, res) {
  try {
    const { name, category, price, inStock, quantity } = req.body;
    const { id } = req.params;

    // Log the incoming request data
    console.log("Update product request data:", req.body);
    console.log("Product ID:", id);

    // Validate required fields
    if (!id || !name || !category ||  !price || !quantity) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        price,
        inStock,
        quantity,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ msg: "Internal server error", error: err.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send({ msg: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getAllProduct(req, res) {
  try {
    const products = await Product.find();

    const modifiedProducts = products.map((product) => ({
      id: product._id, // Use _id here
      name: product.name,
      image: product.image ? `http://localhost:5002/${product.image}` : null,
      category: product.category,
      price: product.price,
      inStock: product.inStock ? "InStock" : "OutOfStock",
      quantity: product.quantity,
    }));

    res.status(200).send(modifiedProducts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

async function getProductByCategory(req, res) {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const products = await Product.find({ category: category._id });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ msg: "No products found for this category" });
    }

    const modifiedProducts = products.map((product) => ({
      _id: product._id, // Use _id here as well
      name: product.name,
      image: product.image ? `http://localhost:5002/${product.image}` : null,
      category: product.category,
      price: product.price,
    }));

    res.status(200).json(modifiedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error", error });
  }
}

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
};
