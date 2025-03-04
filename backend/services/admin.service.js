const adminModel = require("../models/admin.model");

module.exports.createAdmin = async function (name, email, password) {
  const user = await adminModel.create({ name, email, password });
  return user;
};

module.exports.adminCreateUpdate = async (doneBy, updateId) => {
  const admin = await adminModel.findOne({ _id: doneBy });
  admin.updates.push(updateId);
  admin.save();
};
