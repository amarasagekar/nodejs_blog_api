const express = require("express");

const postRouter = express.Router();

//POST

postRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post created",
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

//==========
//GET posts
postRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET  all posts
postRouter.get("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all post",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//DELETE user
postRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete posts route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT user
postRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update posts route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = postRouter;
