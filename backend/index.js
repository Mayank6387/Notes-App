const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./config/dbconnect");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("dotenv");
const { authenticate } = require("./middleware/authenticate");
const noteModel = require("./models/noteModel");

dbconnect();

app.use(cors({ origin: "*" }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ data: "hello" });
});

app.post("/createaccount", async (req, res) => {
  const { fullname, email, password } = req.body;

  if (!fullname) {
    return res
      .status(400)
      .json({ error: true, message: "Full Name is Required" });
  }
  if (!email) {
    return res.status(400).json({ error: true, message: "Email is Required" });
  }
  if (!password) {
    return res
      .status(400)
      .json({ error: true, message: "Password is Required" });
  }

  try {
    const isUser = await userModel.findOne({ email: email });

    if (isUser) {
      return res.json({ error: true, message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      fullname,
      email,
      password: hashPassword,
    });

    await user.save();
    const accesstoken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "30m",
    });

    return res.status(201).json({
      error: false,
      user,
      accesstoken,
      message: "Registration Successfull",
    });
  } catch (err) {
    console.log(err, "Error in Registering the User");
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is Required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password is Required" });
  }
  try {
    const userInfo = await userModel.findOne({ email: email });

    if (!userInfo) {
      return res.status(404).json({ message: "User not Found" });
    }
    const isMatch = await bcrypt.compare(password, userInfo.password);
    if (userInfo.email == email && isMatch) {
      const user = { user: userInfo };
      const accesstoken = jwt.sign(user, config.accesstoken, {
        expiresIn: "36000m",
      });
      return res.json({
        error: false,
        message: "Login Succesfull",
        email,
        accesstoken,
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Invalid Credentials",
      });
    }
  } catch (err) {
    console.log(err, "Failed to Login");
  }
});

app.post("/add-note", authenticate, async (req, res) => {
  const { title, tags, content } = req.body;
  const user = req.user;

  if (!title) {
    return res.status(400).json({
      error: true,
      message: "Title is required",
    });
  }
  if (!content) {
    return res.status(400).json({
      error: true,
      message: "Content is required",
    });
  }
  try {
    const note = await noteModel.create({
      title,
      tags: tags || [],
      content,
      userId: user._id,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Added Succesfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});
app.listen(3000);

module.exports = app;
