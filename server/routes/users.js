//Note for Aryan: if "nodemon server" doesn't work, try "nodemon ./server/server.js" 

import express from "express";
import db from "../db/connection.js";
import nodemailer from 'nodemailer';
import { xxHash32 } from 'js-xxhash';
const router = express.Router();

//let User = require('../models/users.model');
//import User from "../models/users.model.js"

let collection = db.collection("users"); //retrieves the "users" collection from the database.

//Route that actually handles incoming http "get" requests
//if the end of our url is just 'users/' and we have a get request:
router.get("/", async (req, res) => {
    try {
        let results = await collection.find({}).toArray();
        res.status(200).send(results);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});

router.get("/login/:username/:enteredPassword", async (req, res) => {
    try{
        let result = await collection.findOne({ username: req.params.username });
        let enteredPassword = req.params.enteredPassword;

        if (result){
            let storedPassword = result.password;
            if (enteredPassword != storedPassword)
                res.status(500).send("Incorrect password")
            else
                res.status(200).send(result);
        }
        else{
            res.status(500).send("User not found");
        }
    }
    catch (error){
        res.status(500).send(error.message)
    }
});

router.get("/:username/forgotPassword", async (req, res) => {
    //nodemailer setup for emailing functionality
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ucla.cs35w.s24@gmail.com',
          pass: 'iizapqhxbgnomszd'
        }
    });

    //main logic for handling this specific get request
    try{
        //retrieve user information based on username
        let query = await collection.findOne({ username: req.params.username });
        if (query){ //ensure document exists, otherwise throw error
            let newPassword = hashPassword(query.username);
            const updates = {$set: {
                    password: newPassword,
                },
            };

            //Send email
            transporter.sendMail({
                from: 'ucla.cs35w.s24@gmail.com',
                to: query.email.toString(),
                subject: 'Your password was reset!',
                html: "Hi from CS35W! We've received a request to rest your password. Your temporary password is: <b>" + newPassword + "</b>.<br>If this wasn't you, please login to your account using this password as soon as possible and change your password.<hr>All the best,<br>The CS35W team."
              }, function(error, info){
                if (error) {
                    res.status(500).send("Error: " + info);
                } else {
                    let toSend = collection.updateOne({ username: query.username }, updates); //update database with their new password
                    res.send(toSend).status(200);
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
});

//handles incoming http "post" requests
router.post("/", async (req, res) =>{
    const username = req.body.username;
    const address = req.body.address;
    const email = req.body.email;
    const phoneNum = Number(req.body.phoneNum);
    const password = req.body.password;

    const newEntry = {
        username,
        address,
        email,
        phoneNum,
        password
    };

    try {
        const result = await collection.insertOne(newEntry);
        if (result.acknowledged)
            res.status(200).send(result);
        else
            res.status(500).send("Failed to add entry");
    }
    catch (error) {
        res.status(500).send("Error adding entry: " + error.message);
    }
});

export default router;

//helper functions:
function hashPassword(username){
    let currentdate = new Date();
    let time = currentdate.getUTCMilliseconds().toString();
    let hashNum = xxHash32(username + time, 0);
    return hashNum.toString(16);
