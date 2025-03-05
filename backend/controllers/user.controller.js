const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/users.service");
const blankList = require("../models/blankList.model");

module.exports.registeruser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, roll } = req.body;

  const isUserExist = await userModel.findOne({ roll });

  if (isUserExist) {
    if (
      isUserExist.email != email ||
      isUserExist.name.toLowerCase() != name.toLowerCase()
    ) {
      return res.status(401).json({ message: "Recheck roll,name or email" });
    }

    if (isUserExist.isRegistered === true) {
      return res.status(401).json({ message: "User already register." });
    }

    try {
      const hashedPassword = await userModel.hashPassword(password);
      await userService.register(isUserExist, hashedPassword);
      const token = isUserExist.generateAuthToken();
    
      return res.status(201).json({ token, isUserExist });
    } catch (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

module.exports.loginuser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }


  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user || user.isRegistered != true) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMached = await user.comparePassword(password);

  if (!isMached) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  user.password = undefined;

  const token = user.generateAuthToken();
  res.cookie("token", token);


  return res.status(200).json({ user });
};

module.exports.userprofile = async (req, res, next) => {
  return await res.status(200).json(req.user);
};

module.exports.logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blankList.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Log out" });
};

