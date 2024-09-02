const  express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authorize = require('../middlewares/authorize')
// const {protect, admin} = require('../middlewares/auth');

// PRODUCT
router.post('/createProduct',authorize.auth, authorize.admin, productController.createProduct);
// router.put('/updateProduct/:id', productController.updateProduct);
// router.delete('/deleteProduct/:id', productController.deleteProduct);
router.get('/getAllProduct',authorize.auth, productController.getAllProduct)
// router.get('/getProductByCategoryname/:categoryName', productController.getProductByCategoryname);

module.exports = router;

