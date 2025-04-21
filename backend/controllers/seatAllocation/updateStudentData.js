const fs = require("fs");

// Read the JSON file
const data = JSON.parse(fs.readFileSync("tempStdData.json", "utf8"));

data.forEach((element) => {
  let choices = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let selectedChoices = [];
  let cnt = 10;

  // while (cnt) {
  //   let rand = Math.floor(Math.random() * cnt);
  //   cnt--;
  //   selectedChoices.push(choices[rand]);
  //   choices = choices.filter((e, i) => i != rand);
  // }

  element.choices = choices;
});

// Write the updated data back to the file
fs.writeFileSync("tempStdData.json", JSON.stringify(data, null, 2));

console.log("Updated student ranks saved.");
