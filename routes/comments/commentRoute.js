const express = require("express");

const commentRouter = express.Router();

commentRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET posts
commentRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//DELETE user
commentRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comments route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT user
commentRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comments route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = commentRouter;
