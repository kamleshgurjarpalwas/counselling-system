const { validationResult } = require("express-validator");
const adminService = require("../../services/admin.service");
const adminModel = require("../../models/adminModels/admin.model");
const blankList = require("../../models/blankList.model");

module.exports.register = async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body;
  const isAdminAlreadyExist = await adminModel.findOne({ email });

  if (isAdminAlreadyExist) {
    return res
      .status(401)
      .json({ message: "By this email already registered" });
  }
  try {
    const hashedPassword = await adminModel.hashPassword(password);
    const admin = await adminService.createAdmin(name, email, hashedPassword);
    const token = admin.genetrateAuthToken();
    res.cookie("token", token);
    res.status(200).json({ admin });
  } catch (err) {
    res.status(401).json({ message: "internalserver error" });
  }
};

module.exports.login = async function (req, res, next) {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { email, adminId, password } = req.body;
  const admin = await adminModel.findOne({ email });

  if (!admin) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMached = admin.comparePassword(password);

  if (!isMached) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = admin.genetrateAuthToken();
  res.cookie("token", token);

  res.status(200).json(admin);
};

module.exports.getprofile = async function (req, res, next) {
  res.status(200).json(req.admin);
};

module.exports.logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blankList.create({ token });

  res.clearCookie("token");
  res.status(200).json({ message: "Log out" });
};
