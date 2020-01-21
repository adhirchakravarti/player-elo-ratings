const fs = require('fs')
const moment = require('moment')

var matches = JSON.parse(fs.readFileSync(__dirname + '/matches.json'))

class MatchService {
  list() {
    return matches
  }
  add(match) {
    if (!match.standings)
      throw "The match does not contain the standings for the match!"

    var now = moment().toISOString()
    matches.updatedAt = now
    match.createdAt = now
    matches.list.push(match)
  }
}

module.exports = new MatchService()
