const userModel = require("../models/user.model");

module.exports.createUser = async function ({ name, email, password }) {
  console.log("come to serviceses", name, email, password);
  const user = userModel.create({ name, email, password });
  return user;
};
