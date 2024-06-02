const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    address: String,
    phoneNum: String,
    venmo: String
})

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
