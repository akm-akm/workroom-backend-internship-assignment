require("dotenv").config();
const express = require("express");
const app = new express();
const cors = require("cors");
const prefix = "/api";
const path = require("path");
require("./model/mongoose");
const register_router = require("./routes/register");
const login_router = require("./routes/login");
const user_route = require("./routes/user");
app
  .use(cors())
  .use(express.json())
  .use(prefix, register_router)
  .use(prefix, login_router)
  .use(prefix, user_route)
  .use(express.static(path.join(__dirname, "..", "client", "build")))
  .use(express.static("public"))
  .get("*", (_, res) =>
    res.status(200).sendFile(path.join(__dirname, "..", "client", "build","index.html"))
  );
module.exports = { app };
