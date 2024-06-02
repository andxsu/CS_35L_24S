const { response } = require("express");
const User = require("../models/user");
const { hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require("jsonwebtoken");

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
            return res.json({
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
            // res.json("Success!")
            jwt.sign({email: user.email, id: user._id, username: user.username}, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)

            })
    

        }
        if(!match){
            res.json({error: "Incorrect password"})
        }
        
    } catch (error) {
        console.log(error)
        
    }
}

const getProfile = async (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user);
        })
    }else{
        res.json(null)
    }
    
}
module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}