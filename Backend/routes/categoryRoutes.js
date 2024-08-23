const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/createCategory',categoryController.createCategory);
router.get('/getCategories',categoryController.getCategories);
router.put('/updateCategory/:id',categoryController.updateCategoryById);
router.delete('/deleteCategory/:id',categoryController.deleteCategoryById);



module.exports = router;