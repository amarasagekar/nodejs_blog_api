const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoute");
const commentRouter = require("./routes/comments/commentRoute");
const globalErrHandler = require("./middlewares/globalErrhandler");
const isAdmin = require("./middlewares/isAdmin");
const dotenv = require("dotenv").config();

require("./config/dbConnect");

const app = express();

//------
//middlewares
//------
app.use(express.json()); //pass incoming payload
// app.use(isAdmin);
//------
//routes
//------
//users route
app.use("/api/v1/users/", userRouter);

//posts route
app.use("/api/v1/posts", postRouter);

//comments route
app.use("/api/v1/comments", commentRouter);

//categories route
app.use("/api/v1/categories", categoryRouter);

//Error handlers middleware
app.use(globalErrHandler);

//404 error- *- catch any route
app.use("*", (req, res) => {
  res.status(404).json({
    message: `${req.originalUrl} route not found`,
  });
});
//listen to server
const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and running on ${PORT}`));
