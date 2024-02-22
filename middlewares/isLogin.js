const getTokenFromHeader = require("../utils/getTokenFromHeader");
const verifyToken = require("../utils/verifyToken");

const { appErr } = require("../utils/appErr");
const isLogin = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);

  //verify the token
  const decodedUser = verifyToken(token);

  //save the user into req obj
  req.userAuth = decodedUser.id;
  if (!decodedUser) {
    return next(appErr("Invalid/Expired token, please login back", 500));
  } else {
    console.log("islogin next");
    next();
  }
};

module.exports = isLogin;
