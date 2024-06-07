// order.js:

const mongoose = require('mongoose')
const {Schema} = mongoose

const orderSchema = new Schema({
    dining_hall: String,
    creator_username: String,
    creator_address: String,
    creator_phone: String,
    creator_venmo: String,
    food_order: String,
    notes_for_deliverer: String,
    active: {
        type: Boolean,
        default: false,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    deliverer_username: String,
    favorite: { 
        type: Boolean,
        default: false,
    },
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;

