const mongoose = require('mongoose')
const {Schema} = mongoose
const Order = require('./order')

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    address: String,
    phoneNum: String,
    venmo: String,
    active_orders: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order'
        }],
        default: []
    },
    user_type: String,
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
