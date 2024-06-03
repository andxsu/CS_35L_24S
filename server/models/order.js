const mongoose = require('mongoose')
const {Schema} = mongoose

const orderSchema = new Schema({
    dining_hall: String,
    creator_username: String,
    food_order: String,
    notes_for_deliverer: String,
    active: {
        type: Boolean,
        default: true,
    },
    out_for_delivery: {
        type: Boolean,
        default: false,
    }
});

const OrderModel = mongoose.model('Order', orderSchema);
module.exports = OrderModel;
