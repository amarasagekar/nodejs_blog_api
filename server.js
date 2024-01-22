const express = require("express");
const dotenv = require("dotenv").config();

require("./config/dbConnect");

const app = express();

const PORT = process.env.PORT || 9000;

app.listen(PORT, console.log(`server is up and running on ${PORT}`));
