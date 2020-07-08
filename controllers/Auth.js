const User = require("../models/Users");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization verification
// const { errorHandler } = require("../helpers/dbErrorHandlers");

exports.register = (req, res) => {
  const newUser = new User(req.body);
  newUser.save((error, user) => {
    if (error) {
      return res.status(400).json({ error: `Email already exists` });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({ user });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((error, user) => {
    if (!user || error) {
      return res
        .status(400)
        .json({ error: `Hmmm, I think you are new! Please register` });
    }
    // if user is found then check email and pwd;
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Incorrect password",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
  algorithms: ['HS256'] 
});

exports.logout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: `Logout Success` });
};

exports.isAuth = (req,res,next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id
  console.log(req.auth)
  if(!user) {
    res.status(403).json({
      error: "Access Denied"
    })
  }
  next()
}

exports.isAdmin = (req,res,next) => {
  if(req.profile.role === 0) {
    res.status(403).json({
      error: "Admin resource! Access Denied",
      role: req.profile.role
    })
  }
  next()
}