const express = require("express");
const app = express();
const cors = require("cors");
const dbconnect = require("./config/dbconnect");
const userModel = require("./models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("./config/config");
const { authenticate } = require("./middleware/authenticate");
const noteModel = require("./models/noteModel");

dbconnect();

app.use(cors({ origin: "*" }));

app.use(express.json());

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

app.get("/get-user", authenticate, async (req, res) => {
  const { user } = req.user;

  const isUser = await userModel.findOne({ _id: user._id });
  if (!isUser) {
    return res.sendStatus(401);
  }
  return res.json({
    user: {
      fullname: isUser.fullname,
      email: isUser.email,
      _id: isUser._id,
      createdOn: isUser.createdOn,
    },
    message: "",
  });
});

app.post("/add-note", authenticate, async (req, res) => {
  const { title, tags, content } = req.body;
  const id = req.user;
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
      userId: id.user._id,
      title,
      tags: tags || [],
      content,
    });

    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Added Succesfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.put("/edit-note/:noteId", authenticate, async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;

  if (!title && !content && !tags) {
    return res.status(400).json({
      error: true,
      message: "No changes Provided",
    });
  }

  try {
    const note = await noteModel.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not Found" });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get("/get-all-notes/", authenticate, async (req, res) => {
  const { user } = req.user;

  try {
    const notes = await noteModel
      .find({ userId: user._id })
      .sort({ isPinned: -1 });

    return res.json({
      error: false,
      notes,
      message: "All notes retrieved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.delete("/delete-note/:noteId", authenticate, async (req, res) => {
  const noteId = req.params.noteId;
  const { user } = req.user;

  try {
    const note = await noteModel.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not Found" });
    }

    await noteModel.deleteOne({ _id: noteId, userId: user._id });

    return res.json({
      error: false,
      message: "Note deleted Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.put("/update-note-pinned/:noteId", authenticate, async (req, res) => {
  const noteId = req.params.noteId;
  const { isPinned } = req.body;
  const { user } = req.user;
  try {
    const note = await noteModel.findOne({ _id: noteId, userId: user._id });
    if (!note) {
      return res.status(404).json({ error: true, message: "Note not Found" });
    }
    note.isPinned = isPinned;
    await note.save();

    return res.json({
      error: false,
      note,
      message: "Note Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
});

app.get("/search-note",authenticate,async(req,res)=>{
  const {user}=req.user;
  const {query}=req.query;

  if(!query){
    return res.status(400).json({error:true,message:"Search Query is Required"})
  }
  try{
    const matchingNotes=await noteModel.find({
      userId:user._id,
      $or:[
        {title:{$regex:new RegExp(query,"i")}},
        {content:{$regex:new RegExp(query,"i")}},
      ]
    })

    return res.json({
      error:false,
      notes:matchingNotes,
      message:"Notes matching the search query retrieved successfully"
    })
  }catch(error){
    return res.status(500).json({
      error:true,
      message:"Internal Server Error"
    })
  }
})

app.listen(3000);

module.exports = app;
