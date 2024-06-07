const express = require('express');
const router = express.Router();
const cors = require('cors');
const {test, registerUser, loginUser, getProfile, logoutUser, forgotPassword, updateUser, deleteUser} = require('../controllers/authController');
const {createOrder, getOrder, getAllOrders, acceptOrder, completeOrder, getSearchedOrders, toggleFavoriteOrder} = require('../controllers/orderController');
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
router.post('/forgot', forgotPassword)
router.patch('/update', updateUser);
router.delete('/delete', deleteUser);

//order routes
router.post('/order', createOrder);
router.post('/acceptorder', acceptOrder);
router.post('/completeorder', completeOrder)
router.get('/getorder', getOrder);
router.get('/getallorders', getAllOrders);
// router.get('/searchbar', getSearchedOrders)
router.post('/togglefavorite', toggleFavoriteOrder);

module.exports = router;

