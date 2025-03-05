const userModel = require("../models/user.model");

module.exports.createUser = async function ({ name, email, password }) {
  const user = userModel.create({ name, email, password });
  return user;
};

//This is for registering user
module.exports.register = async function ( isUserExist, hashedPassword ) {
  isUserExist.password = hashedPassword;
  isUserExist.isRegistered = true;
  await isUserExist.save();
};
