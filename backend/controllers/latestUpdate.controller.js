const updateModel = require("../models/latestUpdate.model");
const updateServices = require("../services/latestUpdate.service");
const { validationResult } = require("express-validator");
module.exports.pushUpdate = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //getting admin id
    const doneBy = req.admin._id;

    const { title, content } = req.body;
    const post = await updateServices.createUpdate(doneBy, title, content);
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: "Internal servar error" });
  }
};

module.exports.showUpdates = async (req, res, next) => {
  try {
    const updates = await updateModel.find();
    res.status(200).json({ updates });
  } catch (err) {
    res.status(404).json({ message: "something wrong in server" });
  }
};

module.exports.deleteUpdate = async (req, res) => {
  try {
    const updateId = req.params.updateId;
    const updatesOfAdmin = req.admin.updates;

    if (updatesOfAdmin.includes(updateId)) {
      req.admin.updates = updatesOfAdmin.filter((i) => i != updateId);

      await req.admin.save();

      await updateModel.findOneAndDelete({ _id: updateId.toString() });

      res.status(200).json({ message: "Update deleted successfully" });
    } else {
      res.status(400).json({ message: "Update not found in admin's updates" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.update = async (req, res) => {
  const admin = req.admin;
  const { title, content, updateId } = req.body;

  try {
    if (admin.updates.includes(updateId)) {
      const update_ = await updateModel.findOne({ _id: updateId });
      update_.title = title;
      update_.content = content;
      update_.save();
      res.status(200).json({ update: update_ });
    } else {
      res.status(400).json({ message: "Update not found in admin's updates" });
    }
  } catch (error) {
    res.status(500).json({ message: "internal error" });
  }
};
