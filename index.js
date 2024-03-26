require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const githubUserRouter = require("./routes/githubUser.routes");
const PORT = process.env.PORT || 5000;
app.use(express.json());

//* GitHub User Data Storage
app.use("/api/save-user", githubUserRouter);
//* Mutual Followers as Friends
app.use("/api/find-mutual-followers", githubUserRouter);
//* Search Functionality
app.use("/api/search-user", githubUserRouter);
//* delete
app.use("/api/delete-user", githubUserRouter);

//! Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});
//! mongoose connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB ;)...");
  })
  .catch((err) => {
    console.log("err", err);
  });

//* app connection
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

//route-> controller -> service -> models
