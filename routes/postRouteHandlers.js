//dependencies
const { Router } = require("express");
const { client } = require("../mongoDB");
const { ObjectId } = require("mongodb");

//create postRoute
const postRoute = Router();

//database & collection
const db = client.db("blogs");
const posts = db.collection("posts");

//insert post single
postRoute.post("/", async (req, res) => {
  try {
    const result = await posts.insertOne(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//insert multiple posts
postRoute.post("/multiple", async (req, res) => {
  try {
    const result = await posts.insertMany(req.body);
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get all posts
postRoute.get("/", async (req, res) => {
  try {
    const result = await posts.find().toArray();
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get single posts
postRoute.get("/:id", async (req, res) => {
  try {
    const result = await posts.findOne({ _id: ObjectId(req.params.id) });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update single posts
postRoute.put("/:id", async (req, res) => {
  try {
    const result = await posts.updateOne(
      { _id: ObjectId(req.params.id) },
      { $set: req.body },
      { upsert: true }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update multiple posts
postRoute.put("/multiple", async (req, res) => {
  try {
    const result = await posts.updateMany(
      {
        _id: { $in: req.body.map((post) => ObjectId(post._id)) },
      },
      { $set: req.body },
      { upsert: false }
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update single post & return update value
// postRoute.put("/:id/return", async (req, res) => {
//   try {
//     const result = await posts.findOneAndUpdate(
//       { _id: ObjectId(req.params.id) },
//       { $set: req.body },
//       { upsert: false, returnDocument: false }
//     );
//     res.send(result.value);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

//delete single post
postRoute.delete("/multiple", async (req, res) => {
  try {
    const result = await posts.deleteOne({ _id: ObjectId(req.params.id) });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
//delete multiple post
postRoute.delete("/:id", async (req, res) => {
  const queryStr = req.query.text;
  try {
    const result = await posts.deleteMany({
      title: { $regex: queryStr },
    });
    res.send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
module.exports = postRoute;
