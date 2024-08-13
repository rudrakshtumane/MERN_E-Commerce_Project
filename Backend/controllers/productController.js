const Product = require('../model/productModel');
// const Category = require('../model/categoryModel');

async function createProduct(req,res){
    const {name, Category, price, quantity} = req.body;
    try{
        const categoryExists = await Category.findById(category);
        if(!categoryExists) {
            return res.status(404).json({message: 'Category not found'});
        }
        else{
            const product = new Product({name, category, price, quantity, createdBy: req.use.id});
            await product.save();
            res.status(201).json({message: 'Product added successfully'})
        }
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}