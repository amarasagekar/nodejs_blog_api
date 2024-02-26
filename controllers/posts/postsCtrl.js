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
const allPostsCtrl = async (req, res) => {
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
    res.json(error.message);
  }
};

//toggleLikes
const toggleLikePostCtrl = async (req, res) => {
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
    res.json(error.message);
  }
};

//toggleDislikes
const toggleDislikePostCtrl = async (req, res) => {
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
    res.json(error.message);
  }
};
//Get single posts
const getPostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Delete Posts
const deletePostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "delete posts route",
    });
  } catch (error) {
    res.json(error.message);
  }
};

//Put/ update poste
const updatePostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "update posts route",
    });
  } catch (error) {
    res.json(error.message);
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
