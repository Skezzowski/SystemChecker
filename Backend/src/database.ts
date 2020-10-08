import mongoose from "mongoose";

const databaseUrlLocal = "mongodb://localhost:27017/system-checker";

mongoose.connect(databaseUrlLocal, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Database connection error:"));

db.once("open", function () {
  console.log("Database connection ready!");
});
