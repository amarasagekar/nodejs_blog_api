const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");
const { appErr } = require("../../utils/appErr");

//Create Post
const createPostsCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    //Find the user
    const author = await User.findById(req.userAuth);
    //Check if user is blocked
    if (author.isBlocked) {
      return next(appErr("Access denied, account is blocked", 403));
    }

    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
      category,
      photo: req?.file?.path,
    });
    // Associate user to a post push the post in to the user post field
    author.posts.push(postCreated);

    //save
    await author.save();
    res.json({
      status: "success",
      data: postCreated,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//get All posts
const allPostsCtrl = async (req, res, next) => {
  try {
    //Find all posts
    const posts = await Post.find({})
      .populate("user")
      .populate("category", "title");

    // Check if the user is blocked by the post owner
    const filteredposts = posts.filter((post) => {
      //get all blocked users
      const blockedUsers = post.user.blocked;
      const isBlocked = blockedUsers.includes(req.userAuth);

      //return isBlocked ? null : post;

      return !isBlocked;
    });
    res.json({
      status: "success",
      data: filteredposts,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//toggleLikes
const toggleLikePostCtrl = async (req, res, next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already likes the post
    const isLiked = post.likes.includes(req.userAuth);
    //3. In the user has already liked the post, unclike the post
    if (isLiked) {
      post.likes = post.likes.filter(
        (like) => like.toString() != req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. Inf the user has not liked the post, like the post
      post.likes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//toggleDislikes
const toggleDislikePostCtrl = async (req, res, next) => {
  try {
    //1. Get the post
    const post = await Post.findById(req.params.id);
    //2. Check if the user has already unlikes the post
    const isUnliked = post.disLikes.includes(req.userAuth);
    //3. In the user has already liked the post, unclike the post
    if (isUnliked) {
      post.disLikes = post.disLikes.filter(
        (disLike) => disLike.toString() != req.userAuth.toString()
      );
      await post.save();
    } else {
      //4. Inf the user has not liked the post, like the post
      post.disLikes.push(req.userAuth);
      await post.save();
    }

    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};
//Get single posts
const getPostsCtrl = async (req, res, next) => {
  try {
    //Find the post
    const post = await Post.findById(req.params.id);
    //number of view
    //Check if uer viewed this post
    const isViewed = post.numViews.includes(req.userAuth);
    if (isViewed) {
      res.json({
        status: "success",
        data: post,
      });
    } else {
      // push the user in to numOfViews
      post.numViews.push(req.userAuth);
      //save
      await post.save();
      res.json({
        status: "success",
        data: "post route",
      });
    }
  } catch (error) {
    next(appErr(error.message));
  }
};

//Delete Posts
const deletePostsCtrl = async (req, res, next) => {
  try {
    // check if the user belongs to the post
    // find the post
    const post = await Post.findById(req.params.id);
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to delete this post", 403));
    }
    await Post.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      data: "Post deleted successfully..",
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

//Put/ update poste
const updatePostsCtrl = async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    // find the post
    const post = await Post.findById(req.params.id);
    // check if the user belongs to the post
    if (post.user.toString() !== req.userAuth.toString()) {
      return next(appErr("You are not allowed to update this post", 403));
    }
    await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        photo: req?.file?.path,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      data: post,
    });
  } catch (error) {
    next(appErr(error.message));
  }
};

module.exports = {
  createPostsCtrl,
  getPostsCtrl,
  allPostsCtrl,
  deletePostsCtrl,
  updatePostsCtrl,
  toggleLikePostCtrl,
  toggleDislikePostCtrl,
};
