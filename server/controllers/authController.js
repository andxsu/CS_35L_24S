const { response } = require("express");
const User = require("../models/user")

const test = (req,res) => {
    res.json('test is working')
}

const registerUser = async (req,res) => {
    try {
        const {username, email, password, address, phoneNum, venmo} = req.body;
        //checks
        if(!username){
            return res.json({
                error: 'username is required'
            })
        };
        if(!password){
            return res.json({
                error: 'password is required'
            })
        };
        if(!email){
            return res.json({
                error: 'Email is required'
            })
        }; 
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is already in use'
            })
        }
        if(!venmo){
            return ResizeObserver.json({
                error: 'Venmo is required'
            })
        }; 
        if(!address){
            return res.json({
                error: 'Address is required'
            })
        }; 
        if(!phoneNum){
            return res.json({
                error: 'Phone number is required'
            })
        }; 

        const user = await User.create({
            username, email, password, venmo, address, phoneNum
        });

        return res.json(user)
        

    } catch (error) {
        console.log(error)
        
    }

}
module.exports = {
    test,
    registerUser
}