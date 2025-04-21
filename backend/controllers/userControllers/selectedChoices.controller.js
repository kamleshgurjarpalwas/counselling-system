exports.pushSelectedChoices = async (req, res) => {
  try {
    const user = req.user;
    const newSelectedChices = req.body.selectedChoices; // Array of selected choices from the request body
    user.choosedChoices = newSelectedChices; // Update the user's selected choices
    await user.save(); // Save the updated user document
    res.status(200).json({
      message: "Selected choices saved successfully"
    });
  } catch (error) {
    console.error("Error saving selected choices:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.selectedChoices = async (req, res) => {
  try {
    const user = req.user; // Get the user from the request
    const selectedChoices = user.choosedChoices; // Get the selected choices from the user document
    res.status(200).json({
      message: "Selected choices retrieved successfully",
      selectedChoices: selectedChoices,
    });
  } catch (error) {
    console.error("Error retrieving selected choices:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
