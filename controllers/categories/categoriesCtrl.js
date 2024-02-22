const Category = require("../../model/Category/Category");
const { AppErr } = require("../../utils/appErr");

//Create
const categoriesCtrl = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.create({ title, user: req.userAuth });
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//all
const fetchCategoriesCtrl = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json({
      status: "success",
      data: categories,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//single
const getCategoriesCtrl = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//Delete
const deleteCategoriesCtrl = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Category has been deleted successfully",
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};

//Update
const updateCategoriesCtrl = async (req, res, next) => {
  const { title } = req.body;
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true, runValidators: true }
    );
    res.json({
      status: "success",
      data: category,
    });
  } catch (error) {
    return next(appErr(error.message));
  }
};
module.exports = {
  categoriesCtrl,
  getCategoriesCtrl,
  deleteCategoriesCtrl,
  updateCategoriesCtrl,
  fetchCategoriesCtrl,
};
