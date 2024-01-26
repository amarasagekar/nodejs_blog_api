const express = require("express");
const {
  categoriesCtrl,
  getCategoriesCtrl,
  deleteCategoriesCtrl,
  putCategoriesCtrl,
} = require("../../controllers/categories/categoriesCtrl");

const categoryRouter = express.Router();

categoryRouter.post("/", categoriesCtrl);

//GET categories
categoryRouter.get("/:id", getCategoriesCtrl);

//DELETE categories
categoryRouter.delete("/:id", deleteCategoriesCtrl);

//PUT categories
categoryRouter.put("/:id", putCategoriesCtrl);

module.exports = categoryRouter;
