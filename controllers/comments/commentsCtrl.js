//Create Comments
const createCommentsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment created",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Get comments
const getCommentsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "comment route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete Comments
const deleteCommentsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete comments route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//PUT/update comments
const updateCommentsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update comments route",
    });
  } catch (error) {
    res.json(error.message);
  }
};
module.exports = {
  createCommentsCtrl,
  getCommentsCtrl,
  updateCommentsCtrl,
  deleteCommentsCtrl,
};
