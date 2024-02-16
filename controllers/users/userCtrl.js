const bcrypt = require("bcryptjs");
const User = require("../../model/User/User");
const generateToken = require("../../utils/generatetoken");
const getTokenFromHeader = require("../../utils/getTokenFromHeader");
const { appErr, AppErr } = require("../../utils/appErr");

//Register
const userRegisterCtrl = async (req, res, next) => {
  const { firstname, lastname, profilePhoto, email, password } = req.body;

  try {
    //check is email exist
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(new AppErr("User Already Exist", 500));
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    //create  the user
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Login
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log("user loginnnnnnnnn");
    //Check is email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    //Verify password
    const isPasswordMatched = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordMatched) {
      return res.json({
        msg: "Invalid login credentials",
      });
    }

    res.json({
      status: "success",
      data: {
        firstname: userFound.firstname,
        lastname: userFound.lastname,
        email: userFound.email,
        isAdmin: userFound.isAdmin,
        token: generateToken(userFound._id),
      },
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Who view my profile
const whoViewMyProfileCtrl = async (req, res, next) => {
  try {
    //1. Find the original user
    const user = await User.findById(req.params.id);
    //2. Find the user who viewed the original user
    const userWhoViewed = await User.findById(req.userAuth);

    //3. Cheeck original user and who viewd are found
    if (user && userWhoViewed) {
      //4. Check if user whio viewd is alredy in ther user viewrs array
      const isUserAlredyViewed = user.viewers.find(
        (viewer) => viewer.toString() === userWhoViewed._id.toJSON()
      );
      if (isUserAlredyViewed) {
        return next(appErr("You already viewed this profile"));
      } else {
        //5. Push the userWhoViewed to the user's viewers array
        user.viewers.push(userWhoViewed._id);
        //6. save the user
        await user.save();
        res.json({
          status: "success",
          data: "You have successfully viewed this profile",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//Following
const follwoingCtrl = async (req, res, next) => {
  try {
    //1. Find the user to follow
    const userToFollow = await User.findById(req.params.id);
    //2. Find the user who is following
    const userWhoFollowed = await User.findById(req.userAuth);
    //3. Check if user adn user who followed are found
    if (userToFollow && userWhoFollowed) {
      //4. check if userWhoFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToFollow.following.find(
        (follower) => follower.toString() == userWhoFollowed._id.toString()
      );
      if (isUserAlreadyFollowed) {
        return next(appErr("You already followed this user"));
      } else {
        //5. Push userWhoFollowed to the user's followers array
        userToFollow.followers.push(userWhoFollowed._id);
        //6. push userToFollow to the userWhozFollowed's following array
        userWhoFollowed.following.push(userWhoFollowed._id);
        //7. Save
        await userWhoFollowed.save();
        await userToFollow.save();

        res.json({
          status: "success",
          data: "You have successfully followed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//unfollow
const unFollowCtrl = async (req, res, next) => {
  try {
    //1. Find the user to unfollow
    const userToBeunFollowed = await User.findById(req.params.id);
    //2. Find the user who is unfollowing
    const userWhoUnFollowed = await User.findById(req.userAuth);

    //3. Check if user adn user who unfollowed are found
    if (userToBeunFollowed && userWhoUnFollowed) {
      //4. check if userWhoUnFollowed is already in the user's followers array
      const isUserAlreadyFollowed = userToBeunFollowed.followers.find(
        (follower) => follower.toString() === userWhoUnFollowed._id.toString()
      );
      if (!isUserAlreadyFollowed) {
        return next(appErr("You have not followed by this user"));
      } else {
        //5. Remove userWhoUnFollowed from the user's followers array
        userToBeunFollowed.followers = userToBeunFollowed.followers.filter(
          (follower) => follower.toString() !== userWhoUnFollowed._id.toString()
        );

        //6. Save the user
        await userToBeunFollowed.save();

        //7. Remove userToBeUnFollowed from the userWhoUnfollowed's following array
        userWhoUnFollowed.following = userWhoUnFollowed.following.filter(
          (following) =>
            following.toString() !== userToBeunFollowed._id.toString()
        );
        //8. Save the user
        userWhoUnFollowed.save();

        res.json({
          status: "Success",
          Data: "You have successfully unfollwed this user",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

//All
const userCtrl = async (req, res, next) => {
  try {
    const user = await User.find();
    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Bloack
const blockUserCtrl = async (req, res, next) => {
  try {
    //1. Find the user to be blocked
    const userToBeBlocked = await User.findById(req.params.id);
    //2. Find the user who is blocking
    const userWhoBlocked = await User.findById(req.userAuth);
    //3. Check is userToBeBlocked and userWhoBlocked are found
    if (userToBeBlocked && userWhoBlocked) {
      //4. check is userWhoBlocked is alredy in the user's bloacked array
      const isUserAlreadyBlocked = userWhoBlocked.blocked.find(
        (blocked) => blocked.toString() === userToBeBlocked._id.toString()
      );
      if (isUserAlreadyBlocked) {
        return next(appErr("You already blocked this user"));
      }
      //7. Push userToBeBlocked to the userWhoBlocked's blocked arr
      userWhoBlocked.blocked.push(userToBeBlocked._id);
      //8. save
      await userWhoBlocked.save();

      res.json({
        status: "success",
        data: "You have successfully blocked this user",
      });
    }
  } catch (error) {
    res.json(error.message);
  }
};

//UnBlock
const unblockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params.id);
    //2. Find the user who ius unblocking
    const userWhoUnBocked = await User.findById(req.userAuth);
    //3. check if userWhoUnBocked and userToBeUnBlocked are found
    if (userToBeUnBlocked && userWhoUnBocked) {
      //4. Check if userToBeUnBlocked is alredy in the array's of userWhoUnBocked
      const isUserAlredyBlocked = userWhoUnBocked.blocked.find(
        (blocked) => blocked.toString() === userToBeUnBlocked._id.toString()
      );
      console.log(isUserAlredyBlocked);
      if (!isUserAlredyBlocked) {
        return next(appErr("You have not blocked this user"));
      }
      // 5 Remove the userToBeUnBlocked from the main user
      userWhoUnBocked.blocked = userWhoUnBocked.blocked.filter(
        (blocked) => blocked.toString !== userToBeUnBlocked._id.toString()
      );

      await userWhoUnBocked.save();
      res.json({
        status: "success",
        data: "You have successfully unblocked this user",
      });
    }
  } catch (error) {
    res.json(error.message);
  }
};

//Admin block
const adminBlockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be blocked
    const userToBeBlocked = await User.findById(req.params._id);
    //2. Check if user Found
    if (!userToBeBlocked) {
      return next(appErr("User not found"));
    }
    //3. Chnage the isBlocked to true
    userToBeBlocked.isBlocked = true;

    //4. save
    await userToBeBlocked.save();

    res.json({
      status: "success",
      data: "You have successfully blocked this user",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Admin unblock
const adminUnBlockUserCtrl = async (req, res, next) => {
  try {
    //1. find the user to be unblocked
    const userToBeUnBlocked = await User.findById(req.params._id);
    //2. Check if user Found
    if (!userToBeUnBlocked) {
      return next(appErr("User not found"));
    }
    //3. Chnage the isBlocked to false
    userToBeUnBlocked.isBlocked = false;

    //4. save
    await userToBeUnBlocked.save();

    res.json({
      status: "success",
      data: "You have successfully unblocked this user",
    });
  } catch (error) {
    res.json(error.message);
  }
};
//Profile
const userProfileCtrl = async (req, res, next) => {
  try {
    //const token = getTokenFromHeader(req);

    //option1 or we can do it in userschema
    //const user = await User.findById(req.userAuth).populate("posts");
    //option2 or we can do it in userschema
    // const user = await User.findById(req.userAuth).populate({
    //   path: "posts",
    // });
    const user = await User.findById(req.userAuth);
    res.json({
      status: "success",
      data: user,
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

//PUT update user
const updateUserCtrl = async (req, res, next) => {
  const { email, lastname, firstname } = req.body;
  try {
    // check if email is not taken
    if (email) {
      const emailTaken = await User.findOne({ email });
      if (emailTaken) {
        return next(appErr("Email is taken", 400));
      }
    }
    // update the user
    const user = User.findByIdAndUpdate(
      req.userAuth,
      {
        lastname,
        firstname,
        email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error.message);
  }
};

//PUT update password
const updatePasswordCtrl = async (req, res, next) => {
  console.log("Request data:");
  const { password } = req.body;
  try {
    // check if user is updating the password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // update user
      await User.findByIdAndUpdate(
        req.userAuth,
        { password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.json({
        status: "success",
        data: "Password has been changed successfully",
      });
    } else {
      next(appErr("Please provide password field"));
    }
  } catch (error) {
    res.json(error.message);
  }
};

//PUT deleteUserAccountCtrl
const deleteUserAccountCtrl = async (req, res, next) => {
  console.log("Request data:");

  try {
    res.send("Delete Account");
  } catch (error) {
    res.json(error.message);
  }
};

//Profile photo upload
const profilePhotoUploadCtrl = async (req, res) => {
  try {
    //1. Find the user to be updated
    const userToUpdate = await User.findById(req.userAuth);
    //2. check if user is found

    if (!userToUpdate) {
      return next(appErr("user not found", 403));
    }
    //3. Check if user is blocked

    if (userToUpdate.isBlocked) {
      return next(appErr("Action not allowes, your account is blocked", 403));
    }
    //4. Check if a user is updating their photo
    if (req.file) {
      //5. Update profile photo
      await User.findByIdAndUpdate(
        req.userAuth,
        {
          $set: {
            profilePhoto: req.file.path,
          },
        },
        {
          new: true,
        }
      );
      res.json({
        status: "success",
        data: "You have successfully updated ypour profile photo",
      });
    }
  } catch (error) {
    next(appErr(error.message, 500));
  }
};

module.exports = {
  userRegisterCtrl,
  userLoginCtrl,
  userCtrl,
  userProfileCtrl,
  deleteUserCtrl,
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
};
