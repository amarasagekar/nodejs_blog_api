const express = require("express");
const dotenv = require("dotenv").config();

require("./config/dbConnect");

const app = express();

//middlewares
//----
//routes
//------

//users route

//POST Register
app.post("/api/v1/users/register", async () => {
  try {
    res.json({
      status: "success",
      data: "user registered",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//POST Login
app.post("/api/v1/users/login", async () => {
  try {
    res.json({
      status: "success",
      data: "",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET profile
app.get("/api/v1/users/profile/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "Profile route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//GET  all users
app.get("/api/v1/users", async () => {
  try {
    res.json({
      status: "success",
      data: "all user",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//DELETE user
app.delete("/api/v1/users/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "delete user route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//PUT user
app.put("/api/v1/users/:id", async () => {
  try {
    res.json({
      status: "success",
      data: "update user route",
    });
  } catch (error) {
    res.json(error.message);
  }
});

//------------
//posts route
//-----------
//POST posts
app.post("/api/v1/posts", async () => {
    try {
      res.json({
        status: "success",
        data: "post created",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  

  //GET posts
  app.get("/api/v1/posts/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "post route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  //GET  all posts
  app.get("/api/v1/posts", async () => {
    try {
      res.json({
        status: "success",
        data: "all post",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  //DELETE user
  app.delete("/api/v1/posts/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "delete posts route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  //PUT user
  app.put("/api/v1/posts/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "update posts route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });

  //---------
//comments route
//---------
app.post("/api/v1/comments", async () => {
    try {
      res.json({
        status: "success",
        data: "comment created",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  

  //GET posts
  app.get("/api/v1/comments/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "comment route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  
  //DELETE user
  app.delete("/api/v1/comments/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "delete comments route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  //PUT user
  app.put("/api/v1/comments/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "update comments route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });


  //----------
//categories route
//-----------
app.post("/api/v1/categories", async () => {
    try {
      res.json({
        status: "success",
        data: "categories created",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  

  //GET categories
  app.get("/api/v1/categories/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "categories route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  
  //DELETE categories
  app.delete("/api/v1/categories/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "delete categories route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });
  
  //PUT categories
  app.put("/api/v1/categories/:id", async () => {
    try {
      res.json({
        status: "success",
        data: "update categories route",
      });
    } catch (error) {
      res.json(error.message);
    }
  });


//Error handlers middleware
//listen to server

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and running on ${PORT}`));
