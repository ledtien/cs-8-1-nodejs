const express = require("express");
const app = express();
const logger = require("morgan");
const port = 5000;

app.use(logger("dev"));

require("dotenv").config();

function Middleware(req, res, next) {
  console.log("middleware");
  next();
}

app.use((req, res, next) => {
  console.log("I'm everywhere!");
  next();
});

app.get("/", Middleware, (req, res, next) => {
  res.send("Hello World");
  console.log("This is my homepage");
});

app.get("/users", (req, res) => {
  res.send("Hello Users");
  console.log("This is users page");
});

app.get("/users/:id", (req, res) => {
  res.send("Hello Users " + req.params.id);
  console.log("This is users page");
});

app.post("/newUser", (req, res) => {
  res.send("This is a new User");
});

app.use((req, res, next) => {
  const error = new Error("Resource Not Found");
  error.statusCode = 404;
  next(error);
});

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500);
  res.send(err.message);
}

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:5000`);
});
