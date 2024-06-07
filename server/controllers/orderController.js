const Order = require("../models/order");
const User = require("../models/user")
const jwt = require("jsonwebtoken");

const createOrder = async (req, res) => {
    try {
        const {dining_hall, creator_username, food_order, notes_for_deliverer} = req.body;
        const user = await User.findOne({username: creator_username});
        const order = await Order.create({
            dining_hall,
            creator_username,
            creator_address: user.address,
            creator_phone: user.phoneNum,
            creator_venmo: user.venmo,
            food_order,
            notes_for_deliverer,
            active: false,
            completed: false,
            deliverer_username: '',

        });
        user.active_orders.push(order)
        await user.save();
        jwt.sign({email: user.email, id: user._id, username: user.username, active_orders: user.active_orders, user_type: user.user_type}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({user: user, order: order});

        })
        // return res.json({order: order, user: user});

        
    } catch (error) {
        console.log(error)
        
    }
}



const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({});
        res.json(orders)
        
    } catch (error) {
        console.log(error)
        
    }
}

const acceptOrder = async (req, res) => {
    try {
        const {actualOrderId, delivery_username} = req.body
        const user = await User.findOne({username: delivery_username});

        const order = await Order.findByIdAndUpdate(actualOrderId, {
            active: true,
            deliverer_username: delivery_username,
        }, {new: true});


        user.active_orders.push(order);
        await user.save()
        jwt.sign({email: user.email, id: user._id, username: user.username, active_orders: user.active_orders, user_type: user.user_type}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({user: user, order: order});

        })
    
    }catch(error){
        console.log(error)
    }
}

const completeOrder = async (req, res) => {
    try {
        const {actualOrderId} = req.body
        const order = await Order.findByIdAndUpdate(actualOrderId, {
            completed: true,
        }, {new: true});

        const user = await User.findOne({username: order.deliverer_username});

        jwt.sign({email: user.email, id: user._id, username: user.username, active_orders: user.active_orders, user_type: user.user_type}, process.env.JWT_SECRET, {}, (err, token) => {
            if(err) throw err;
            res.cookie('token', token).json({user: user, order: order});

        })
    
    }catch(error){
        console.log(error)
    }
}

const getOrder = async (req, res) => {
    try {
        const{orderId} = req.query;
        const order = await Order.findOne({_id: orderId});
        const user = await User.findOne({username: order.creator_username});
        res.json({orderId: orderId, orderDetails: order, creator: user});
    } catch (error) {
        console.log(error);
        
    }
}

const getSearchedOrders = async (req, res) => {
    try {
        const {searchQuery} = req.query;
        const orders = await Order.find({dining_hall: searchQuery});
        res.json(orders);
    } catch (error) {
        console.log(error);
        
    }
}

const toggleFavoriteOrder = async (req, res) => {
    try {
        const {orderId} = req.body;
        const order = await Order.findById(orderId);
        order.favorite = !order.favorite;
        await order.save();
        res.json(order);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

module.exports = {
    createOrder,
    getOrder,
    getAllOrders,
    acceptOrder,
    completeOrder,
    toggleFavoriteOrder,
}

