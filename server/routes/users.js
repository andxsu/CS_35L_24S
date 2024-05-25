import express from "express";
import db from "../db/connection.js";
import { ObjectId } from "mongodb";
const router = express.Router();

//let User = require('../models/users.model');
//import User from "../models/users.model.js"

//Route that actually handles incoming http "get" requests
//if the end of our url is just 'users/' and we have a get request:
router.get("/", (req, res) => {
    let collection = db.collection("users"); //retrieves the "users" collection from the database.
    let results = collection.find({});//.toArray();
    res.send(results).status(200);
});

//handles incoming http "post" requests
// router.route('/add').post((req, res) => {
//     const username = req.body.username;
//     const newUser = new User({username});
//     newUser.save()
//         .then(() => res.json('User added!'))
//         .catch(err => res.status(400).json('Error: ' + err));
// });

//module.exports = router;
export default router;