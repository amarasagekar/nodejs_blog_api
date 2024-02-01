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
const userLoginCtrl = async (req, res) => {
  const { email, password } = req.body;
  try {
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
    res.json(error.message);
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
      if(isUserAlreadyFollowed){
        return next(appErr('You already followed this user'))
      }else{
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
    //const token = getTokenFromHeader(req);

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
const updateUserCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
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
};
