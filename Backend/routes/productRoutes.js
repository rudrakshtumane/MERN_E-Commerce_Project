const  express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authorize = require('../middlewares/authorize')
const upload = require('../middlewares/multer');

// PRODUCT
router.post('/createProduct',authorize.auth, authorize.admin, upload.single('image') , productController.createProduct);
router.put('/updateProduct/:id', authorize.auth, authorize.admin, productController.updateProduct);
router.delete('/deleteProduct/:id',authorize.auth, authorize.admin, productController.deleteProduct);
router.get('/getAllProduct',authorize.auth, productController.getAllProduct)
router.get('/getProductByCategory/:id', authorize.auth, productController.getProductByCategory);

module.exports = router;

