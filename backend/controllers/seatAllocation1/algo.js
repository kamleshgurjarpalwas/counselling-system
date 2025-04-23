const { Heap } = require("heap-js");
const fs = require("fs");
const { getCollegeSeats } = require("./collegeDataExtraction");
const { transformUserRankData } = require("./studentDataExtraction");
const { result } = require("../../models/resultModels/result.model");
const selectedCandidates = [];
const selectedCandidatesId = {};

function seatAllocation(clgs, students, cat = null) {
  const allotedStudent = {};
  const unallocated = [];
  const freeedStudents = Object.keys(students);
  const studentChoices = {};
  const choiceNumber = {};
  const choices = Object.keys(clgs);
  const tempSelectedStudentsInCLG = {};

  for (let i = 0; i < choices.length; i++) {
    tempSelectedStudentsInCLG[choices[i]] = new Heap((a, b) => {
      const rankA = Object.values(a)[0];
      const rankB = Object.values(b)[0];
      return rankB - rankA;
    });
  }

  for (const studentId of freeedStudents) {
    choiceNumber[studentId] = 0;
    studentChoices[studentId] = students[studentId].choices;
  }

  while (freeedStudents.length) {
    const currStudent = freeedStudents.shift();

    if (studentChoices[currStudent].length <= choiceNumber[currStudent]) {
      unallocated.push(currStudent);
      continue;
    }

    const currentChoiceId =
      studentChoices[currStudent][choiceNumber[currStudent]];
    choiceNumber[currStudent]++;

    const seats = clgs[currentChoiceId].seats;
    const choiceType = clgs[currentChoiceId].type;

    if (tempSelectedStudentsInCLG[currentChoiceId].size() < seats) {
      const tempStd = {};
      tempStd[currStudent] = students[currStudent][choiceType];
      tempSelectedStudentsInCLG[currentChoiceId].push(tempStd);
      continue;
    } else {
      const leastPreferredStudent =
        tempSelectedStudentsInCLG[currentChoiceId].pop();
      if (!leastPreferredStudent) {
        freeedStudents.push(currStudent);
        continue;
      }

      const idOfLeastPref = Object.keys(leastPreferredStudent)[0];
      const rankOfLeastPref = leastPreferredStudent[idOfLeastPref];
      const rankOfCurrStd = students[currStudent][choiceType];

      if (rankOfLeastPref < rankOfCurrStd) {
        tempSelectedStudentsInCLG[currentChoiceId].push(leastPreferredStudent);
        freeedStudents.push(currStudent);
      } else {
        const tempObj = {};
        tempObj[currStudent] = rankOfCurrStd;
        tempSelectedStudentsInCLG[currentChoiceId].push(tempObj);
        freeedStudents.push(idOfLeastPref);
      }
    }
  }

  for (const [clgId, heap] of Object.entries(tempSelectedStudentsInCLG)) {
    const arr = heap.toArray();
    const result = arr.map((obj) => {
      const stdId = Object.keys(obj)[0];
      selectedCandidates.push({ id: stdId, choiceId: clgId, usedCat: cat });
      selectedCandidatesId[stdId] = true;
      return stdId;
    });
    allotedStudent[clgId] = result;
  }

  /*console.log("\nFinal Allocation:\n====================");
  console.log(allotedStudent);
  console.log("\nUnallocated Students:", unallocated);*/
}

const main = async (req, res) => {
  // const choices = JSON.parse(fs.readFileSync("collegeData.json", "utf8"));
  // const candidates = JSON.parse(fs.readFileSync("studentData.json", "utf8"));
  const choices = await getCollegeSeats();
  const candidates = await transformUserRankData();

  console.log("Coming choices:", choices);
  console.log("Coming candidates:", candidates);

  const categories = ["Gen", "OBC", "SC", "ST"];

  const filterChoicesAccoToCat = (cat) => {
    const newChoices = {};
    choices.forEach((choice) => {
      const type = choice.type;
      const id = choice.choiceId;
      const numberOfSeats =
        choice.seats.filter((seat) => seat.cat === cat)[0]?.seats ?? 0;
      newChoices[id] = { type, seats: numberOfSeats };
    });
    return newChoices;
  };

  for (const category of categories) {
    console.log(`\n=========== Category: ${category} ===========\n`);

    const studentsInCategory = {};

    for (const student of candidates) {
      const studentId = student.id;

      if (studentId in selectedCandidatesId) {
        continue;
      }

      const studentData = {};
      const examTypes = Object.keys(student.type);
      let hasRank = false;

      for (const examType of examTypes) {
        const ranks = student.type[examType].cat;
        if (ranks[category] === undefined) continue;

        studentData[examType.toLowerCase()] = ranks[category];
        hasRank = true;
      }

      if (!hasRank) continue;

      studentData.choices = student.choices;
      studentsInCategory[studentId] = studentData;
    }

    const choicesForCat = filterChoicesAccoToCat(category);
    seatAllocation(choicesForCat, studentsInCategory, category);
  }

  // console.log("\nFinal selected candidates:", selectedCandidates);
  await result.deleteMany({});
  await result.insertMany(selectedCandidates);
  console.log("Selected candidates:", selectedCandidates);
  return res.status(200).json({ selectedCandidates });
};

module.exports = { main };

// main().catch(console.error);
