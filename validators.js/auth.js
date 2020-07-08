const { check } = require("express-validator");

exports.userRegisterValidator = [
  check("name", "Name is invalid").not().isEmpty(),
  check("email", "Email is invalid").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

exports.userSigninValidator = [
    check("email", "Email is invalid").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
      min: 6,
    }),
  ];
  