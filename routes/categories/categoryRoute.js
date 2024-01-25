const express = require("express");
const categoryRouter = express.Router();

categoryRouter.post("/", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "categories created",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET categories
categoryRouter.get("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "categories route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//DELETE categories
categoryRouter.delete("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete categories route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT categories
categoryRouter.put("/:id", async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update categories route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = categoryRouter;
