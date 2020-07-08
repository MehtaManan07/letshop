const User = require("../models/Users");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return res.json({ error: `User not found` });
    }
    req.profile = user;
    next();
  });
};
