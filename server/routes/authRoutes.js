const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser} = require('../controllers/authController');
const {createOrder, getOrder} = require('../controllers/orderController');
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

//user auth routes
router.get('/', test);
router.get('/profile', getProfile);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);



//order routes
router.post('/order', createOrder);
router.get('/getorder', getOrder);


module.exports = router;