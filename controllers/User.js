const User = require("../models/Users");

exports.userById = (req, res, next, id) => {
  User.findOne({_id: id}).exec((error, user) => {
    if (error || !user) {
      console.log(error, user)
      return res.status(400).json({ error: `User not found` });
    }
    req.profile = user;
    next();
  });
};

exports.getProfile = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  return res.json(req.profile);
};

exports.updateProfile = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (error, user) => {
      if(error) {
        return res.status(400).json({ error: 'Unauthorized to perform these actions' })
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.json({ user})
    }
  );
};
