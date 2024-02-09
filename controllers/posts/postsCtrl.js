const Post = require("../../model/Post/Post");
const User = require("../../model/User/User");

//Create Post
const createPostsCtrl = async (req, res) => {
  const { title, description } = req.body;
  try {
    //Find the user
    const author = await User.findById(req.userAuth);
    //Create the post
    const postCreated = await Post.create({
      title,
      description,
      user: author._id,
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
    res.json({ error: error.message });
  }
};

//Get posts
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

//get All posts
const allPostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "all post",
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
};
