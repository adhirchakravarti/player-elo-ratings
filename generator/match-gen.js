// const moment = require("moment");
import moment from "moment";

export default class MatchGenerator {
  CHARACTERS = [
    "Black shy guy",
    "Baby peach",
    "Dry bones",
    "Villager",
    "Mario",
    "Luigi",
    "Waluigi",
    "Bowser",
  ];
  // TOTAL_MATCHES = 100;
  currentDate = moment();

  pickRandomCharacters = (count) => {
    var result = [];
    if (count > this.CHARACTERS.length) {
      throw (
        "Cannot pick " +
        count +
        " distinct characters from a pool of " +
        this.CHARACTERS.length
      );
    }

    while (result.length < count) {
      var chosen = this.CHARACTERS[
        Math.floor(Math.random() * this.CHARACTERS.length)
      ];
      if (!result.includes(chosen)) {
        result.push(chosen);
      }
    }
    return result;
  };

  result = {
    updatedAt: this.currentDate.toISOString(),
    list: [],
  };

  generateMatches = (numberOfMatches) => {
    for (let i = 0; i < numberOfMatches; i++) {
      var matchCharacters = this.pickRandomCharacters(4);
      this.result.list.push({
        createdAt: moment(this.currentDate)
          .subtract(numberOfMatches - (i + 1), "days")
          .toISOString(),
        standings: matchCharacters,
      });
    }
    console.log(JSON.stringify(this.result, null, 4));
    return this.result;
  };

  generateSingleMatch = () => {
    var matchCharacters = this.pickRandomCharacters(4);
    return {
      createdAt: moment(this.currentDate).toISOString(),
      standings: matchCharacters,
    };
  };
}

// module.exports = new MatchGenerator();
