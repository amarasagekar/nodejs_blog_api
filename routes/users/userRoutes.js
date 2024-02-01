const express = require("express");
const storage = require("../../config/cloudinary");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
  profilePhotoUploadCtrl,
  whoViewMyProfileCtrl,
  follwoingCtrl,
} = require("../../controllers/users/userCtrl");
const isLogin = require("../../middlewares/isLogin");

const multer = require("multer");
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

//DELETE /api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);

//PUT /api/v1/users/:id
userRouter.put("/:id", updateUserCtrl);

//GEt /api/v1/users/profile-viewers/:id
userRouter.get("/profile-viewers/:id", isLogin, whoViewMyProfileCtrl);

//GEt /api/v1/users/following/:id
userRouter.get("/following/:id", isLogin, follwoingCtrl);

whoViewMyProfileCtrl;
//profile /api//v1/users/:id
userRouter.post(
  "/profile-photo-upload",
  isLogin,
  upload.single("profile"),
  profilePhotoUploadCtrl
);

module.exports = userRouter;
