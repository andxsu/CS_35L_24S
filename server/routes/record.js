import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

const collection = db.collection("order_list")

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /order.
const router = express.Router();

// This section will help you get a list of all the orders.
router.get("/", async (req, res) => {
  // let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single order by id
router.get("/:id", async (req, res) => {
  // let collection = await db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new order.
router.post("/", async (req, res) => {
  try {
    let newDocument = {
      dining_hall: req.body.dining_hall,
      food_item: req.body.food_item,
      food_order: req.body.food_order,
      notes_for_deliverer: req.body.notes_for_deliverer,
      creator: req.body.creator,
      completed: req.body.completed
    };
    // let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding order");
  }
});

// This section will help you update a order by id.
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        dining_hall: req.body.dining_hall,
        food_item: req.body.food_item,
        food_order: req.body.food_order,
        notes_for_deliverer: req.body.notes_for_deliverer,
        creator: req.body.creator,
        completed: req.body.completed
      },
    };

    // let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating order");
  }
});

// This section will help you delete a order
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };

    // const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting order");
  }
});

export default router;