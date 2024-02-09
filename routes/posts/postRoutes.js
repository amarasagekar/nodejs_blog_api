const express = require("express");
const {
  createPostsCtrl,
  getPostsCtrl,
  allPostsCtrl,
  deletePostsCtrl,
  updatePostsCtrl,
} = require("../../controllers/posts/postsCtrl");

const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

//POST create
postRouter.post("/", isLogin, createPostsCtrl);

//GET posts
postRouter.get("/:id", getPostsCtrl);

//GET  all posts
postRouter.get("/", allPostsCtrl);

//DELETE user
postRouter.delete("/:id", deletePostsCtrl);

//PUT/update user
postRouter.put("/:id", updatePostsCtrl);

module.exports = postRouter;

