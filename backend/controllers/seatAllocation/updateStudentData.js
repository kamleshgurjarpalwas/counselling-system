const fs = require("fs");

// Load your JSON data (assuming it's in a file called "data.json")
let data = require("./tempStdData.json");

// Process the data
data.forEach((student) => {
  if (student.advRank === undefined) {
    student.choices = student.choices.filter((choice) => choice % 2 === 0); // Keep only even choices
  }
});

// Optional: Print updated data
console.log(JSON.stringify(data, null, 2));

// Optional: Write back to the file
fs.writeFileSync("./tempStdData.json", JSON.stringify(data, null, 2));
