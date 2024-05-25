import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
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

//handles incoming http "post" requests
router.post("/add", async (req, res) =>{
    const username = req.body.username;
    const address = req.body.address;
    const email = req.body.email;
    const phoneNum = Number(req.body.phoneNum);

    const newEntry = {
        username,
        address,
        email,
        phoneNum
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