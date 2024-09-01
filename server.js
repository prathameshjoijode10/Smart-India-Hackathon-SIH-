const express = require("express");
const { url } = require("inspector");
const path = require("path");
const port = 3019;
// const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));

// mongoose.connect("mongodb://127.0.0.1:27017/students");

// const db = mongoose.connection;
// db.once("open", () => {
//   console.log("Connection success");
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "signup.html"));
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "signin.html"));
// });

app.post("/signup", async (req, res) => {
  const { name, email, standard, mobile, password } = req.body;
  const user = {
    name,
    email,
    standard,
    mobile,
    password,
  };

  const existUser = await collection.findOne({
    name: user.name,
    email: user.email,
  });
  if (existUser) {
    res.send("User already exist");
  } else {
    // const saltRounds = 10;
    // const hashPass = await bcrypt.hash(user.password, saltRounds);
    // user.password = hashPass;
    await collection.insertMany(user);
    res.sendFile(path.join(__dirname, "course.html"));
  }
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (!check) {
      res.send("user not found");
    } else {
      res.sendFile(path.join(__dirname, "course.html"));
    }

    // const isPassword = await bcrypt.compare(req.body.password, check.password);
    // if (isPassword) {
    // } else {
    //   res.send("password is incorrect");
    // }
  } catch {
    res.send("wrong user details");
  }
});

app.listen(port, () => {
  console.log("server is running");
});
