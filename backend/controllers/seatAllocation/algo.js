const fs = require("fs");

const choices = JSON.parse(fs.readFileSync("collegeData.json", "utf8"));
const candidates = JSON.parse(fs.readFileSync("tempStdData.json", "utf8"));
// const result = JSON.parse(fs.readFileSync("result.json", "utf8"));

function allocateSeats(candidates, choices) {
  // Initialize data structures
  const choiceMap = new Map();
  const candidateMap = new Map();

  // Prepare choices with quota tracking
  choices.forEach((choice) => {
    choiceMap.set(choice.choiceId, {
      ...choice,
      quotas: {
        UR: {
          total: choice.seats.find((s) => s.cat === "UR")?.seats || 0,
          filled: 0,
          candidates: [],
        },
        A: {
          total: choice.seats.find((s) => s.cat === "A")?.seats || 0,
          filled: 0,
          candidates: [],
        },
        B: {
          total: choice.seats.find((s) => s.cat === "B")?.seats || 0,
          filled: 0,
          candidates: [],
        },
      },
    });
  });

  // Prepare candidates with tracking
  candidates.forEach((candidate) => {
    candidateMap.set(candidate.id, {
      ...candidate,
      allocated: false,
      currentPreference: 0,
      allocation: null,
    });
  });

  // Phase 1: UR allocation (all students compete)
  allocatePhase(Array.from(candidateMap.values()), "UR");

  // Phase 2: Category allocation (remaining students)
  allocatePhase(
    Array.from(candidateMap.values()).filter(
      (c) => !c.allocated && c.cat === "A"
    ),
    "A"
  );
  allocatePhase(
    Array.from(candidateMap.values()).filter(
      (c) => !c.allocated && c.cat === "B"
    ),
    "B"
  );

  // Phase 3: Ensure minimum category seats are filled
  ensureCategoryMinimums();

  // Prepare results
  const results = prepareResults();
  return results;

  // Helper functions
  function allocatePhase(candidatesToAllocate, category) {
    // Sort candidates based on choice type (IIT: advRank, non-IIT: mainRank)
    const sorted = candidatesToAllocate
      .map((candidate) => {
        const currentChoiceId = candidate.choices[candidate.currentPreference];
        const choice = choiceMap.get(currentChoiceId);
        const rank =
          choice?.type === "iit" ? candidate.advRank : candidate.mainRank;
        return { candidate, rank };
      })
      .sort((a, b) => a.rank - b.rank);

    for (const { candidate } of sorted) {
      if (candidate.allocated) continue;

      while (candidate.currentPreference < candidate.choices.length) {
        const choiceId = candidate.choices[candidate.currentPreference++];
        const choice = choiceMap.get(choiceId);
        if (!choice) continue;

        const quotaCategory = category === "UR" ? "UR" : candidate.cat;
        const quota = choice.quotas[quotaCategory];

        if (quota.filled < quota.total) {
          // Accept candidate
          quota.filled++;
          quota.candidates.push({
            id: candidate.id,
            rank:
              choice.type === "iit" ? candidate.advRank : candidate.mainRank,
          });
          candidate.allocated = true;
          candidate.allocation = {
            choiceId,
            category: quotaCategory,
            rankUsed: choice.type === "iit" ? "advRank" : "mainRank",
            rankValue:
              choice.type === "iit" ? candidate.advRank : candidate.mainRank,
          };
          break;
        } else {
          // Check if candidate is better than worst in quota
          const worst = quota.candidates[quota.candidates.length - 1];
          const candidateRank =
            choice.type === "iit" ? candidate.advRank : candidate.mainRank;

          if (candidateRank < worst.rank) {
            // Replace worst candidate
            const replaced = candidateMap.get(worst.id);
            replaced.allocated = false;
            replaced.allocation = null;

            quota.candidates.pop();
            quota.filled--;

            quota.candidates.push({
              id: candidate.id,
              rank: candidateRank,
            });
            quota.filled++;
            candidate.allocated = true;
            candidate.allocation = {
              choiceId,
              category: quotaCategory,
              rankUsed: choice.type === "iit" ? "advRank" : "mainRank",
              rankValue: candidateRank,
            };

            quota.candidates.sort((a, b) => a.rank - b.rank);
            break;
          }
        }
      }
    }
  }

  function ensureCategoryMinimums() {
    choiceMap.forEach((choice) => {
      // Check A category minimum
      if (choice.quotas.A.filled < choice.quotas.A.total) {
        const needed = choice.quotas.A.total - choice.quotas.A.filled;
        const available = Array.from(candidateMap.values())
          .filter((c) => c.cat === "A" && !c.allocated)
          .filter((c) => c.choices.includes(choice.choiceId))
          .sort((a, b) => a.catAdvRank - b.catAdvRank)
          .slice(0, needed);

        available.forEach((candidate) => {
          choice.quotas.A.filled++;
          candidate.allocated = true;
          candidate.allocation = {
            choiceId: choice.choiceId,
            category: "A",
            rankUsed: "catAdvRank",
            rankValue: candidate.catAdvRank,
          };
        });
      }

      // Similar logic for B category
      if (choice.quotas.B.filled < choice.quotas.B.total) {
        const needed = choice.quotas.B.total - choice.quotas.B.filled;
        const available = Array.from(candidateMap.values())
          .filter((c) => c.cat === "B" && !c.allocated)
          .filter((c) => c.choices.includes(choice.choiceId))
          .sort((a, b) => a.catAdvRank - b.catAdvRank)
          .slice(0, needed);

        available.forEach((candidate) => {
          choice.quotas.B.filled++;
          candidate.allocated = true;
          candidate.allocation = {
            choiceId: choice.choiceId,
            category: "B",
            rankUsed: "catAdvRank",
            rankValue: candidate.catAdvRank,
          };
        });
      }
    });
  }

  function prepareResults() {
    const results = {
      allocations: [],
      unallocated: [],
      choiceStats: {},
    };

    candidateMap.forEach((candidate) => {
      if (candidate.allocated) {
        results.allocations.push({
          id: candidate.id,
          cat: candidate.cat,
          allocatedChoice: candidate.allocation.choiceId,
          allocatedCategory: candidate.allocation.category,
          rankUsed: candidate.allocation.rankUsed,
          rankValue: candidate.allocation.rankValue,
          choiceType: choiceMap.get(candidate.allocation.choiceId).type,
          preference:
            candidate.choices.indexOf(candidate.allocation.choiceId) + 1,
        });
      } else {
        results.unallocated.push({
          id: candidate.id,
          cat: candidate.cat,
          advRank: candidate.advRank,
          mainRank: candidate.mainRank,
          catAdvRank: candidate.catAdvRank,
        });
      }
    });

    choiceMap.forEach((choice, choiceId) => {
      results.choiceStats[choiceId] = {
        type: choice.type,
        UR: {
          filled: choice.quotas.UR.filled,
          total: choice.quotas.UR.total,
          candidates: choice.quotas.UR.candidates.map((c) => c.id),
        },
        A: {
          filled: choice.quotas.A.filled,
          total: choice.quotas.A.total,
          candidates: choice.quotas.A.candidates.map((c) => c.id),
        },
        B: {
          filled: choice.quotas.B.filled,
          total: choice.quotas.B.total,
          candidates: choice.quotas.B.candidates.map((c) => c.id),
        },
      };
    });

    return results;
  }
}

const results = allocateSeats(candidates, choices);
// console.log(results);

fs.writeFileSync("result.json", JSON.stringify(results.choiceStats, null, 2));

// Output the results
// console.log(
//   "Allocation Results:",
//   JSON.stringify(allocationResults.allocations, null, 2)
// );
