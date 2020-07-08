const User = require("../models/Users");
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt') // for authorization verification
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
    if(error) {
      return res.status(400).json({ error: `Email already exists` })
    } 
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({user})
  })
};

exports.login = (req,res) => {

}