const Order = require("../models/order");
const User = require("../models/user")

const createOrder = async (req, res) => {
    try {
        const {dining_hall, creator_username, food_order, notes_for_deliverer} = req.body;
        const order = await Order.create({
            dining_hall,
            creator_username,
            food_order,
            notes_for_deliverer,
            active: true,
            out_for_delivery: false,
        });
        const user = await User.findOne({username: creator_username});
        user.active_orders.push(order)
        await user.save();
        return res.json({order: order, user: user});

        
    } catch (error) {
        console.log(error)
        
    }
}

const getOrder = async (req, res) => {
    try {
        const{orderId} = req.query;
        const order = await Order.findOne({_id: orderId});
        res.json({orderId: orderId, orderDetails: order});
    } catch (error) {
        console.log(error);
        
    }
}

module.exports = {
    createOrder,
    getOrder,
}