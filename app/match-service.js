const fs = require("fs");
const path = require("path");
const moment = require("moment");

var matches = JSON.parse(fs.readFileSync(__dirname + "/matches.json"));

class MatchService {
  list() {
    return matches;
  }
  getTimeStamp() {
    return matches.updatedAt;
  }
  add(match) {
    if (!match.standings)
      throw "The match does not contain the standings for the match!";

    var now = moment().toISOString();
    matches.updatedAt = now;
    match.createdAt = now;
    matches.list.push(match);
    console.log(matches.list[matches.list.length - 1]);
    fs.writeFileSync(
      path.join(__dirname, "matches.json"),
      JSON.stringify(matches)
    );
  }
}

module.exports = new MatchService();
