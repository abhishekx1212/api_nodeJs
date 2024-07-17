const express = require("express");
const db = require("./config/database");
const cookies = require("cookie-parser");
const { adminrouter } = require("./routers/user.router");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(cookies());

app.use("/api", adminrouter);

app.listen(8083, (err) => {
  db();
  if (!err) {
    console.log("http://localhost:8083");
  }
});
