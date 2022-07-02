//dependencies
const express = require("express");
const { connectDB } = require("./mongoDB");
const postRoute = require("./routes/postRouteHandlers");

//app initialize
const app = express();

app.use(express.json());
app.use("/post", postRoute);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
  connectDB().catch((error) => console.log(error));
});
