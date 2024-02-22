const express = require("express");
const {
  categoriesCtrl,
  getCategoriesCtrl,
  deleteCategoriesCtrl,
  updateCategoriesCtrl,
  fetchCategoriesCtrl,
} = require("../../controllers/categories/categoriesCtrl");

const isLogin = require("../../middlewares/isLogin");

const categoryRouter = express.Router();

categoryRouter.post("/", isLogin, categoriesCtrl);

//GET categories
categoryRouter.get("/:id", getCategoriesCtrl);

// fetch all categories
categoryRouter.get("/", fetchCategoriesCtrl);

//DELETE categories
categoryRouter.delete("/:id", isLogin, deleteCategoriesCtrl);

//PUT categories
categoryRouter.put("/:id", isLogin, updateCategoriesCtrl);

module.exports = categoryRouter;
