//dependencies
const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("Successfully connect to DB");
  } catch (error) {
    console.log(error);
  }
}

module.exports = { client, connectDB };
