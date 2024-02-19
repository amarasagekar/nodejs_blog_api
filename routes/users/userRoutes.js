const express = require("express");
const storage = require("../../config/cloudinary");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userCtrl,
  userProfileCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
  whoViewMyProfileCtrl,
  follwoingCtrl,
  unFollowCtrl,
  blockUserCtrl,
  unblockUserCtrl,
  adminBlockUserCtrl,
  adminUnBlockUserCtrl,
  updatePasswordCtrl,
  deleteUserAccountCtrl,
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");
const multer = require("multer");
const isAdmin = require("../../middlewares/isAdmin");
const userRouter = express.Router();

//Instance of multer
const upload = multer({ storage });

//POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

//POST /api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//POST /api/v1/users/
userRouter.get("/", userCtrl);

//GET /api/v1/profile/:id
userRouter.get("/profile/", isLogin, userProfileCtrl);

//PUT /api/v1/users/:id
userRouter.put("/:id", isLogin, updateUserCtrl);

//GEt /api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewMyProfileCtrl);

//GEt /api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, follwoingCtrl);

//GEt /api/v1/users/unfollow/:id
userRouter.get("/unfollowing/:id", isLogin, unFollowCtrl);

//GEt /api/v1/users/block/:id
userRouter.get("/block/:id", isLogin, blockUserCtrl);

//GEt /api/v1/users/unblock/:id
userRouter.get("/unblock/:id", isLogin, unblockUserCtrl);

//PUT /api/v1/users/admin-block/:id
userRouter.put("/admin-block/:id", isLogin, isAdmin, adminBlockUserCtrl);

//PUT /api/v1/users/admin-unblock/:id
userRouter.put("/admin-unblock/:id", isLogin, isAdmin, adminUnBlockUserCtrl);

//PUT /api/v1/users/update-password
userRouter.put("/update-password", isLogin, updatePasswordCtrl);

//PUT /api/v1/users/delete-account
userRouter.put("/delete-account", isLogin, deleteUserAccountCtrl);

//profile /api//v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadCtrl
);

module.exports = userRouter;
