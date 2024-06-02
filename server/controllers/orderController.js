const Order = require("../models/order");

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
        return res.json(order);

        
    } catch (error) {
        console.log(error)
        
    }
}

module.exports = {
    createOrder,
}