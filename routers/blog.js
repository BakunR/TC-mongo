const express = require("express");
const router = express.Router();
const createError = require("http-errors");

router.get("/", (req, res) => {
  //all authors
  res.json(authors);
});

function findDuplicate(req, res, next) {
  const dudlicate = authors.find((item) => item.id === req.body.id);
  console.log("dub", dudlicate);
  if (dudlicate) {
    return next(createError(409, "duplicates are prohibited  !"));
  } else {
    next();
  }
}

router.post("/", findDuplicate, (req, res, next) => {
  //add author
  authors.push({ id: req.body.id, name: req.body.name });
  res.json({ authors });
});

router.delete("/:id", (req, res) => {
  //del author by id
  const { id } = req.params;
  const authorId = authors.findIndex((idx) => idx.id == id);
  authors.splice(authorId, 1);
  return res.json(authors);
});

function valid(req, res, next) {
  const { id } = req.params;
  const itemAuthor = authors.find((item) => item.id == id);
  if (!itemAuthor) {
    return next(createError(404, "not found!!"));
  } else {
    req.itemAuthor = itemAuthor;
    next();
  }
}

router.get("/:id", valid, (req, res) => {
  //get author by id
  console.log("search user", req.itemAuthor);
  res.json(req.itemAuthor);
});

router.get("/:id/posts/", (req, res) => {
  //get posts by id author
  const { id } = req.params;
  const authorId = authors.findIndex((idx) => idx.id == id);
  const post = authors[authorId];

  res.json(post.posts);
});

// router.param("id", (req, res, next, id) => {
//   req.author = authors[id];
//   next();
// });

let authors = [
  {
    id: "1",
    name: "John Doe",
    posts: [
      { id: "1", text: "Hello world" },
      { id: "2", text: "Who am i?" },
    ],
  },
  {
    id: "2",
    name: "Agent Smith",
    posts: [
      { id: "1", text: "Hello mr. Anderson" },
      { id: "2", text: "Post number 2" },
    ],
  },
  {
    id: "3",
    name: "Neo",
    posts: [
      { id: "1", text: "I'm the One" },
      { id: "2", text: "Only One!" },
    ],
  },
];

module.exports = router;
