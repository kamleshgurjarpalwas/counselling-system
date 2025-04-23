const { result } = require("../../models/resultModels/result.model");

module.exports.getUserResult = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;

    const resultEntry = await result.findOne({ id: userId });

    console.log("Result Entry:", resultEntry);

    if (!resultEntry) {
      return res.status(200).json({ success: false });
    }

    const choiceId = resultEntry.choiceId;
    console.log("Choice ID:", choiceId.toString());

    // 2. Find the college name and branch name from the result entry
    const choiceDetail = await fetch(
      "http://localhost:4000/api/colleges-info/all-choices"
    )
      .then((response) => response.json())
      .then((data) => {
        return data.data.find(
          (choice) => choice.choiceId === choiceId.toString()
        );
      })
      .catch((error) => {
        console.error("Error fetching college details:", error);
        return null;
      });

    const allotedChoiceNumber =
      user.choosedChoices.findIndex(
        (choice) => choice.toString() === choiceId.toString()
      ) + 1;

    console.log("Choice Detail:", choiceDetail);
    console.log("Alloted Choice Number:", allotedChoiceNumber);

    return res
      .status(200)
      .json({ choiceDetail, allotedChoiceNumber, success: true });
  } catch (error) {
    console.error("Error fetching user result:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
