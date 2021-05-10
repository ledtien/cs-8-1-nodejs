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

app.get("/test", (req, res) => {
  res.send("Hello Users");
  console.log("This is users page");
});

app.get("/test/:id", (req, res) => {
  res.send("Hello Users " + req.params.id);
  console.log("This is users page");
});

app.get("/posts", (req, res) => {
  const posts = req.params;
  res.send({
    posts: posts,
  });
});

app.get("/posts?order=desc", (req, res) => {
  const postsOrderD = req.query;
  res.send({ post: postsOrderD });
});

app.get("/posts?order=asc", (req, res) => {
  const postsOrderA = req.query;
  res.send({ post: postsOrderA });
});

app.get("/users", (req, res) => {
  const users = req.params;
  res.send({ users: users });
});

app.get("/users?country=vietnam", (req, res) => {
  const country = req.query;
  res.send({ users: country });
});
app.get("/users?birthMonth=July", (req, res) => {
  const birthMonth = req.query;
  res.send({ users: birthMonth });
});

app.get("/users/1", (req, res) => {
  const users1 = req.params.id;
  res.send({ users: users1 });
});
app.get("/users/2", (req, res) => {
  const users2 = req.params.id;
  res.send({ users: users2 });
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
