const users = require("./users");
const express = require("express");
const moment = require("moment");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "This is the homepage",
  });
});

app.get("/users", (req, res) => {
  res.status(200).json({ users });
});

app.get("/:id", (req, res) => {
  res.status(404).json({
    status: "not found",
    message: "Route tidak ditemukan",
  });
});

app.get("/about", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Response success",
    description: "Exercise #03",
    date: moment().format(),
  });
});

app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}`)
);
