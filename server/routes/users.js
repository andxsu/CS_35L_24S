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

router.get("/:id", async (req, res) => {
    let query = { _id: new ObjectId(req.params.id) };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
});


//handles incoming http "post" requests
router.post("/add", async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const address = req.body.address;
    const email = req.body.email;
    const phoneNum = Number(req.body.phoneNum);
    const venmo = req.body.venmo;
    const type = req.body.type;
    const previous_orders = req.body.type === "buyer" ? [] : undefined;
    const previous_deliveries = req.body.type === "delivery" ? [] : undefined;

    const newEntry = {
        username,
        password,
        address,
        email,
        phoneNum,
        venmo,
        type,
        previous_orders,
        previous_deliveries
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

router.patch("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      const updates = {
        $set: {
            username: req.body.username,
            password: req.body.password,
            address: req.body.address,
            email: req.body.email,
            phoneNum: Number(req.body.phoneNum),
            venmo: req.body.venmo,
            type: req.body.type,
            previous_orders: req.body.type === "buyer" ? [] : undefined,
            previous_deliveries: req.body.type === "delivery" ? [] : undefined,
        },
      };
  
      let collection = await collection;
      let result = await collection.updateOne(query, updates);
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error updating record");
    }
  });
  
  // This section will help you delete a user
  router.delete("/:id", async (req, res) => {
    try {
      const query = { _id: new ObjectId(req.params.id) };
      let result = await collection.deleteOne(query);
  
      res.send(result).status(200);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error deleting record");
    }
  });

export default router;

