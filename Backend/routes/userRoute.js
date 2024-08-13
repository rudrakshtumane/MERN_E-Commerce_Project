const  express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {protect, admin} = require('../middlewares/auth');


// user
router.post('/registerUser', userController.registerUser);

router.post('/loginUser', userController.loginUser);

module.exports = router;