const fs = require("fs");
const moment = require("moment");

const CHARACTERS = [
  "Black shy guy",
  "Baby peach",
  "Dry bones",
  "Villager",
  "Mario",
  "Luigi",
  "Waluigi",
  "Bowser",
];
const TOTAL_MATCHES = 100;
const currentDate = moment();

function pickRandomCharacters(count) {
  var result = [];
  if (count > CHARACTERS.length) {
    throw (
      "Cannot pick " +
      count +
      " distinct characters from a pool of " +
      CHARACTERS.length
    );
  }

  while (result.length < count) {
    var chosen = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
    if (!result.includes(chosen)) {
      result.push(chosen);
    }
  }
  return result;
}

var result = {
  updatedAt: currentDate.toISOString(),
  list: [],
};

for (var i = 0; i < TOTAL_MATCHES; i++) {
  var matchCharacters = pickRandomCharacters(4);
  result.list.push({
    createdAt: moment(currentDate)
      .subtract(TOTAL_MATCHES - (i + 1), "days")
      .toISOString(),
    standings: matchCharacters,
  });
}

console.log(JSON.stringify(result, null, 4));
