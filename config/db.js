const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI"); // is gonna get the moongoURI from default.json; we can do that cuz we installed config

const connectDB = () => {
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected."))
    .catch((err) => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
