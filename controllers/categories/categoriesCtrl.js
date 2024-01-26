//Categories
const categoriesCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "categories created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const getCategoriesCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "categories route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const deleteCategoriesCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete categories route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

const putCategoriesCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update categories route",
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  categoriesCtrl,
  getCategoriesCtrl,
  deleteCategoriesCtrl,
  putCategoriesCtrl,
};
