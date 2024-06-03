const { response } = require("express");
const User = require("../models/user");
const { hashPassword, comparePassword} = require('../helpers/auth');
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

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

        const hashedPassword = hashPassword(password);

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
        const match = await comparePassword(hashPassword(password), user.password);
        if(match){
            // res.json("Success!")
            jwt.sign({email: user.email, id: user._id, username: user.username, active_orders: user.active_orders}, process.env.JWT_SECRET, {}, (err, token) => {
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
const logoutUser = async(req, res) => {
    res.clearCookie('token');
    res.json({message: 'Logged out successfully'})
}

//reset password feature
const forgotPassword = async(req, res) => {
    //nodemailer setup for emailing functionality
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ucla.cs35w.s24@gmail.com',
          pass: 'tjziqdddvmpwqsop'
        }
    });

    //main logic for handling this specific get request
    try{
        //retrieve user information based on username
        let query = await User.findOne({ email: req.body.email });

        if (query){ //ensure document exists, otherwise throw error
            let seconds = new Date().getTime() / 1000; //number of seconds since January 1, 1970
            //console.log(query.email.toString() + seconds.toString());
            let newPassword = hashPassword(query.email.toString() + seconds.toString());
            const updates = {$set: {
                    password: hashPassword(newPassword),
                },
            };
            //Send email
            transporter.sendMail({
                from: 'ucla.cs35w.s24@gmail.com',
                to: query.email.toString(),
                subject: 'Your password was reset!',
                html: "Hi from CS35W! We've received a request to rest your password. Your temporary password is: <b>" + newPassword + "</b>.<br>If this wasn't you, please login to your account using this password as soon as possible and change your password.<hr>All the best,<br>The CS35W team."
            }, async function(error, info){
                //console.log("an attempt to send the email was made");
                if (error) {
                    res.status(500).send("YOU MESSED UP: " + info);
                } else {
                    try{
                        await User.updateOne({email: query.email}, updates);
                        return res.status(200).send("Update successful");
                    }
                    catch (error){
                        return res.status(500).send("HUH?????,?? " + error);
                    }
                }
              });
        }
        else{
            res.status(500).send("User not found");
        }
    }
    catch (error){
        res.status(500).send(error.message)
    }
}

//updating user information
const updateUser = async(req, res) => {
    try {
        //Check if user exists
        const query = await User.findOne({email: req.body.email});
        if(!query){
            return res.json({error: "No user found"});
        }
        //Check if passwords match
        const match = await comparePassword(hashPassword(req.body.password.toString()), query.password.toString());
        if(match){
            
            let updates = {$set:{}};
            if(req.body.new_password){
                updates = {$set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: hashPassword(req.body.new_password),
                    address: req.body.address,
                    phoneNum: req.body.phoneNum,
                    venmo: req.body.venmo,
                }};
            }
            else{
                updates = {$set: {
                    username: req.body.username,
                    email: req.body.email,
                    address: req.body.address,
                    phoneNum: req.body.phoneNum,
                    venmo: req.body.venmo,
                }};
            }

            try{
                await User.updateOne({email: query.email}, updates);
                jwt.sign({email: req.body.email, id: req.body._id, username: req.body.username, active_orders: req.body.active_orders}, process.env.JWT_SECRET, {}, (err, token) => {
                    if(err) throw err;
                    res.cookie('token', token).json(query);
                });
            }
            catch (error){
                return res.status(500).send("w h a t?????,?? " + error);
            }
        }
        if(!match){
            res.json({error: "Incorrect password"})
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteUser = async(req, res) => {
    try {
        //Check if user exists
        const query = await User.findOne({email: req.body.email});
        if(!query){
            return res.json({error: "No user found"});
        }
        //Check if passwords match
        const match = await comparePassword(hashPassword(req.body.password.toString()), query.password.toString());
        if(match){
            var deleteUsr = await User.deleteOne({email: req.body.email});
            res.send(deleteUsr).status(200);
        }
        if(!match){
            res.json({error: "Incorrect password"})
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
}



module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    forgotPassword,
    updateUser,
    deleteUser,
}