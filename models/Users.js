const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  about: {
    type: String,
    trim: true,
  },
  salt: String,
  role: {
    type: Number,
    default: 0, // normal users - 0 and admin - 1
  },
  history: {
      type: Array,
      default: []
  }
}, {
    timestamps: true,
});
