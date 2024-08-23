const  express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
// const {protect, admin} = require('../middlewares/auth');

// PRODUCT
router.post('/createProduct', productController.createProduct);
router.put('/updateProduct/:id', productController.updateProduct);
router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getAllProduct', productController.getAllProduct)
// router.get('/getProductByCategoryname/:categoryName', productController.getProductByCategoryname);

module.exports = router;

