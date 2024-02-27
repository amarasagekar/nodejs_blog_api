const express = require("express");
const {
  createPostsCtrl,
  getPostsCtrl,
  allPostsCtrl,
  deletePostsCtrl,
  updatePostsCtrl,
  toggleLikePostCtrl,
  toggleDislikePostCtrl,
} = require("../../controllers/posts/postsCtrl");

const isLogin = require("../../middlewares/isLogin");

const postRouter = express.Router();

//POST create
postRouter.post("/", isLogin, createPostsCtrl);

//GET posts
postRouter.get("/:id",isLogin, getPostsCtrl);

//GET  all posts
postRouter.get("/", isLogin, allPostsCtrl);

//Like posts
postRouter.get("/likes/:id", isLogin, toggleLikePostCtrl);

//Dislike posts
postRouter.get("/dislikes/:id", isLogin, toggleDislikePostCtrl);

//DELETE post
postRouter.delete("/:id", deletePostsCtrl);

//PUT/update post
postRouter.put("/:id", updatePostsCtrl);

module.exports = postRouter;
