const express = require("express");
const {
  createCommentsCtrl,
  getCommentsCtrl,
  updateCommentsCtrl,
  deleteCommentsCtrl,
} = require("../../controllers/comments/commentsCtrl");
const isLogin = require("../../middlewares/isLogin");
const commentRouter = express.Router();

//Create comments
commentRouter.post("/:id", isLogin, createCommentsCtrl);

//DELETE comments
commentRouter.delete("/:id", deleteCommentsCtrl);

//PUT/update comments
commentRouter.put("/:id", isLogin, updateCommentsCtrl);

module.exports = commentRouter;
