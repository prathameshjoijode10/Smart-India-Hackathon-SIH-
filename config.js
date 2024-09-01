const express = require("express");
const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/students");

connect
  .then(() => {
    console.log("Databse connected");
  })
  .catch(() => {
    console.log("Database connection failed");
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  standard: Number,
  mobile: Number,
  password: String,
});

const users = new mongoose.model("data", userSchema);
module.exports = users;
