const express = require("express");
const {
  userRegisterCtrl,
  userLoginCtrl,
  userCtrl,
  userProfileCtrl,
  deleteUserCtrl,
  putUserCtrl,
} = require("../../controllers/users/userCtrl");

const userRouter = express.Router();

//POST /api/v1/users/register
userRouter.post("/register", userRegisterCtrl);

//POST /api/v1/users/login
userRouter.post("/login", userLoginCtrl);

//POST /api/v1/users/
userRouter.get("/", userCtrl);

//GET /api/v1/profile/:id
userRouter.get("/profile/:id", userProfileCtrl);

//DELETE /api/v1/users/:id
userRouter.delete("/:id", deleteUserCtrl);

//PUT /api/v1/users/:id
userRouter.put("/:id", putUserCtrl);

module.exports = userRouter;
