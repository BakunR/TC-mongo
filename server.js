const express = require("express");
const blogRouter = require("./routers/blog");
const createError = require("http-errors");

const app = express();
const port = 3000;

app.use(express.json());

app.use(function (req, res, next) {
  if (!req.headers.authorization)
    return next(createError(401, "Please login to view this page."));
  next();
});

app.get("/", (req, res) => {
  res.send("hello");
  console.log(req);
});

app.use("/blog", blogRouter);

app.listen(port, () => {
  console.log(`SERVER WORK on ${port}`);
});
