const User = require("../models/Users");

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
      return res.status(400).json({ error })
    } 
    res.json({user})
  })
};
