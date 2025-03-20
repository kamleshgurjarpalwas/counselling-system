module.exports.pushChoice = async (req, res, next) => {
  const user = req.user;
  user.choosedChoices.push(req.body.choiceId);
  user.save();
  return res.status(200).json({ user, message: "successfully added choice" });
};

//this is for deleting selected choice
module.exports.deleteSelected = async (req, res, next) => {
  const choices = req.user.choosedChoices;
  if (choices.includes(req.body.choiceId)) {
    req.user.choosedChoices = choices.filter((i) => i != req.body.choiceId);
    req.user.save();
    return res
      .status(200)
      .json({ user: req.user, message: "successfully deleted choice" });
  } else {
    return res
      .status(400)
      .json({ message: "Choice not found in user's choices" });
  }
};

//this is for do upward choice
module.exports.upChoice = async (req, res, next) => {
  const choices = req.user.choosedChoices;
  const index = choices.indexOf(req.body.choiceId);
  if (index > 0) {
    const temp = choices[index];
    choices[index] = choices[index - 1];
    choices[index - 1] = temp;
    req.user.choosedChoices = choices;
    req.user.save();
    return res
      .status(200)
      .json({ user: req.user, message: "successfully moved up" });
  }
  if (index === 0) {
    return res.status(400).json({ message: "Choice is already at top" });
  } else {
    return res
      .status(400)
      .json({ message: "Choice not found in user's choices" });
  }
};

//this is for do downward choice
module.exports.upChoice = async (req, res, next) => {
  const choices = req.user.choosedChoices;
  const index = choices.indexOf(req.body.choiceId);
  if (index < choices.length - 1) {
    const temp = choices[index];
    choices[index] = choices[index - 1];
    choices[index - 1] = temp;
    req.user.choosedChoices = choices;
    req.user.save();
    return res
      .status(200)
      .json({ user: req.user, message: "successfully moved down" });
  }
  if (index === choices.length - 1) {
    return res.status(400).json({ message: "Choice is already at bottom" });
  } else {
    return res
      .status(400)
      .json({ message: "Choice not found in user's choices" });
  }
};

//this is for swap two choices
module.exports.swapChoice = async (req, res, next) => {
  const choices = req.user.choosedChoices;
  const index1 = choices.indexOf(req.body.choiceId1);
  const index2 = choices.indexOf(req.body.choiceId2);
  if (index1 === -1 || index2 === -1) {
    return res
      .status(400)
      .json({ message: "One or both choices not found in user's choices" });
  }
  const temp = choices[index1];
  choices[index1] = choices[index2];
  choices[index2] = temp;
  req.user.choosedChoices = choices;
  req.user.save();
  return res
    .status(200)
    .json({ user: req.user, message: "successfully swapped choices" });
};