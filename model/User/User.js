const mongoose = require("mongoose");
const Post = require("../Post/Post");

//create schema
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: [true, "last name is required"],
    },
    profilePhoto: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["Admin", "Guest", "Editor"],
    },
    viewers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    blocked: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // Plan:
    //   {
    //     type: String,
    //     enum: ["Free", "Premium", "Pro"],
    //     default: "Free",
    //   },

    userAward: {
      type: String,
      enum: ["Bronze", "Silver", "Gold"],
      default: "Bronze",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

//Hooks
//pre-before record is saved
userSchema.pre("findOne", async function (next) {
  console.log("Pre hook called");
  console.log(this);
  //get the user id
  const userId = this.conditions._id;
  //find the post created by the user
  const posts = await Post.find({ user: userId });
  //get the last post create dby the user
  const lastPost = posts[posts.length - 1];

  //get the last post date
  const lastPostDate = new Date(lastPost.createdAt);

  // get the last post date in String format
  const lastPostDateStr = lastPostDate.toDateString();

  // add virtual properties to userschema
  userSchema.virtual("lastPostDate").get(function () {
    return lastPostDateStr;
  });

  //------------Check if user is inactive for 30 days-----------
  //get current date
  const currentDate = new Date();
  //get the difference between the last post date and the current date
  const diff = currentDate - lastPostDate;

  //get the difference in days and return less than in days
  const diffIndays = diff / (1000 * 3600 * 24);

  if (diffIndays > 30) {
    // Add virtuals isInactive to the scema to check if a user is inactivbe for 30 days
    userSchema.virtual("isInactive").get(function () {
      return true;
    });

    // find the user by ID and update -- block user
    await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
  } else {
    userSchema.virtual("isInactive").get(function () {
      return false;
    });
     // find the user by ID and update -- unblock user
     await User.findByIdAndUpdate(
      userId,
      {
        isBlocked: flase,
      },
      {
        new: true,
      }
    );
  }
  next();
});

// //post - after saving
// userSchema.post("save", function (next) {
//   console.log("Post Hook");

// });

//Get Fullname
userSchema.virtual("fullname").get(function () {
  return `${this.firstname} ${this.lastname}`;
});

//Get user initials
userSchema.virtual("initials").get(function () {
  return `${this.firstname[0]}${this.lastname[0]}`;
});

// Get postCount
userSchema.virtual("postCounts").get(function () {
  return this.posts.length;
});

//Get follower count
userSchema.virtual("followersCount").get(function () {
  return this.followers.length;
});

//get following count
userSchema.virtual("followingCount").get(function () {
  return this.following.length;
});

//get viewers count
userSchema.virtual("viewersCount").get(function () {
  return this.viewers.length;
});

//get blocked count
userSchema.virtual("blockedCount").get(function () {
  return this.blocked.length;
});
//Compile the user model
const User = mongoose.model("User", userSchema);

module.exports = User;
