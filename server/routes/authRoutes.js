const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile} = require('../controllers/authController');
const {createOrder} = require('../controllers/orderController');
//middleware
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

//user auth routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

//order routes
router.post('/order', createOrder);


module.exports = router;