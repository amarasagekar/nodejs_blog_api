//Create Post
const createPostsCtrl = async (req, res) => {
  try {
    res.json({
      status: "success",
      data: "post created",
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
