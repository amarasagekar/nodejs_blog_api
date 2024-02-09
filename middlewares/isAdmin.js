const User = require("../model/User/User");
const { appErr } = require("../utils/appErr");
const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifytoken = require("../utils/verifyToken");

const isAdmin = async (req, res, next) => {
  //get token form header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifytoken(token);
  //save the user into req obj
  req.userAuth = decodedUser.id;

  // find the user in DB
  const user = await User.findById(decodedUser.id);

  if (user) {
    //Check if admin
    if (user.isAdmin) {
      return next();
    } else {
      next(appErr("Access Denied, Admin Only", 403));
    }
  } else {
    next();
  }
};

module.exports = isAdmin;
