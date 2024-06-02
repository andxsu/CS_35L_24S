const { response } = require("express");
const User = require("../models/user")
const { hashPassword, comparePassword} = require('../helpers/auth')
const test = (req,res) => {
    res.json('test is working')
}

//Register function
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

        const hashedPassword = await hashPassword(password);

        const user = await User.create({
            username, 
            email, 
            password: hashedPassword, 
            venmo, 
            address, 
            phoneNum
        });

        return res.json(user)
        

    } catch (error) {
        console.log(error)
        
    }

}

//Login user
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({error: "No user found"});
        }
        //Check if passwords match
        const match = await comparePassword(password, user.password);
        if(match){
            res.json("Success!")

        }
        if(!match){
            res.json({error: "Incorrect password"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
}
module.exports = {
    test,
    registerUser,
    loginUser
}