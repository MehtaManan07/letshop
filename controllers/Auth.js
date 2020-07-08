const User = require("../models/Users");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization verification
// const { errorHandler } = require("../helpers/dbErrorHandlers");

exports.register = (req, res) => {
  // const { name, email, password } = req.body;

  // User.findOne({ email }).exec((user, error) => {
  //   if (user) {
  //     return res.status(400).json({
  //       error: "User already exists",
  //     });
  //   }

  //   const newUser = new User.create(req.body)
  //   newUser.save((err, user) => {
  //       if (err) {
  //           return res.status(400).json({
  //               error
  //           });
  //       }
  //       res.json({
  //           user
  //       });
  //   });
  // });
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
  algorithms: ['RS256'] 
});

exports.logout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: `Logout Success` });
};
