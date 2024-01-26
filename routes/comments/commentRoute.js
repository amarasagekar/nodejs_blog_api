const express = require("express");
const {
  createCommentsCtrl,
  getCommentsCtrl,
  updateCommentsCtrl,
  deleteCommentsCtrl,
} = require("../../controllers/comments/commentsCtrl");

const commentRouter = express.Router();

//Create comments
commentRouter.post("/", createCommentsCtrl);

//GET comments
commentRouter.get("/:id", getCommentsCtrl);

//DELETE comments
commentRouter.delete("/:id", deleteCommentsCtrl);

//PUT/update comments
commentRouter.put("/:id", updateCommentsCtrl);

module.exports = commentRouter;
