const Categories = require('../model/categoryModel')


async function createCategory(req, res) {
    const { CategoryName, createdBy, createdAt } = req.body;

    try {
      const category = await Categories.findOne({ CategoryName });
      if (category) {
        return res.status(400).send("Category already exists");
      } else {
        const newCategory = new Categories({
            CategoryName,
          createdBy,
          createdAt,
        });
        await newCategory.save();
        res.status(201).send({ message: "Category created successfully" });
      }
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  async function updateCategoryById(req, res) {
    const  id  = req.params.id;
    const category = await Categories.findByIdAndUpdate(id, req.body);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(201).send({ message: "Category Updated successfully" });
  }
  
  async function deleteCategoryById(req, res) {
    const  id  = req.params.id;
    const category = await Categories.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send("Category not found");
    }
    res.status(201).send({ message: "Category Deleted successfully" });
  }
  
  async function getCategories(req, res) {
    try {
      const categories = await Categories.find();
      res.send(categories);
    } catch (error) {
      res.status(400).send(error);
    }
  }
  
  module.exports = {
    createCategory,
    updateCategoryById,
    deleteCategoryById,
    getCategories,
  };