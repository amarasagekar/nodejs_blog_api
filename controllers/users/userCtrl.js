//Register
const userRegisterCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Resgister user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Login
const userLoginCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "user login",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//All
const userCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "All user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Profile
const userProfileCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "Profile route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete user
const deleteUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//PUT
const putUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  putUserCtrl,
};
