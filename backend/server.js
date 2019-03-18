const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err);
  return res.send({ error: err.message });
});

app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to Voting App API Page");
});

app.get("*", function(req, res) {
  res.status(404);
  res.send("Sorry the page you're looking for does not exist!");
});

app.listen(PORT, () => {
  console.log("Server is running on PORT: ", PORT);
});
