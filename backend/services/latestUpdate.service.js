const update = require("../models/latestUpdate.model");
const adminService = require("./admin.service");

module.exports.createUpdate = async (doneBy, title, content) => {
  const newUpdate = await update.create({ doneBy, title, content });
  await adminService.adminCreateUpdate(doneBy, newUpdate._id);
  return newUpdate;
};

