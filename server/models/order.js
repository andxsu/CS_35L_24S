const mongoose = require('mongoose')
const {Schema} = mongoose

const orderSchema = new Schema({
    dining_hall: String,
    creator_username: String,
    creator_address: String,
    food_order: String,
    notes_for_deliverer: String,
    active: { //true if chosen by a deliverer
        type: Boolean,
        default: false,
    },
    completed: { //true if done
        type: Boolean,
        default: false,
    },
    deliverer_username: String
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
