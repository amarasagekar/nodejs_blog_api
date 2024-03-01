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

//GET comments
commentRouter.get("/:id", getCommentsCtrl);

//DELETE comments
commentRouter.delete("/:id", deleteCommentsCtrl);

//PUT/update comments
commentRouter.put("/:id", updateCommentsCtrl);

module.exports = commentRouter;
