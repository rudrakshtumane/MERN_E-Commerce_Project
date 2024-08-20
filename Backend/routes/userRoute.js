const  express = require('express');
const router = express.Router();
const {registerUser,loginUser} = require('../controllers/userController');
// const {protect, admin} = require('../middlewares/auth');


// user
router.post('/registerUser', registerUser);

router.post('/loginUser', loginUser);

module.exports = router;