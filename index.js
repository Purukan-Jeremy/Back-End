const http = require("http");
const express = require("express");
const app = express();
const moment = require("moment");
const morgan = require("morgan");
const { users } = require("./users");
const errorHandler = require("errorhandler");

//Middleware
const log = (req, res, next) => {
  console.log(
    moment().format("MMMM Do YYYY, h:mm:ss a") +
      " " +
      req.originalUrl +
      " " +
      req.ip
  );
  next();
};

app.use(log);

app.use(morgan("tiny"));

//omaygat
app.get("/users", (req, res) => {
  res.status(200).json({ users });
});
app.get("/users/:name", (req, res) => {
  const name = req.params.name.toLowerCase();
  const user = users.find((user) => user.name.toLowerCase() === name);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "Data users tidak ditemukan" });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Resource tidak ditemukan",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server",
  });
});

const hostname = "127.0.0.1";
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
