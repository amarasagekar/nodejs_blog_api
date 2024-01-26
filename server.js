const express = require("express");
const userRouter = require("./routes/users/userRoutes");
const postRouter = require("./routes/posts/postRoutes");
const categoryRouter = require("./routes/categories/categoryRoute");
const commentRouter = require("./routes/comments/commentRoute");
const dotenv = require("dotenv").config();

require("./config/dbConnect");

const app = express();

//middlewares

//routes

//users route
app.use("/api/v1/users/", userRouter);

//posts route
app.use("/api/v1/posts", postRouter);

//comments route
app.use("/api/v1/comments", commentRouter);

//categories route
app.use("/api/v1/categories", categoryRouter);

//Error handlers middleware
//listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and running on ${PORT}`));

