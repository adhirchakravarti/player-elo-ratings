import { calculateExpectedScore, calculateNewRating } from "../calculations";

export default function getELOrating(matches) {
  const players = {};
  matches.forEach((match) => {
    const numberOfPlayers = match.standings.length;
    for (let i = 0; i < numberOfPlayers; i++) {
      const player = match.standings[i];
      for (let j = 0; j < numberOfPlayers; j++) {
        if (i !== j) {
          const opponent = match.standings[j];
          const playerActualScore = i < j ? 1 : 0;
          if (!players[player]) {
            players[player] = {};
            players[player].rating = 1000;
            players[player].matches = 0;
          }
          if (!players[opponent]) {
            players[opponent] = {};
            players[opponent].rating = 1000;
            players[opponent].matches = 0;
          }
          const playerExpectedScore = calculateExpectedScore(
            players[player].rating,
            players[opponent].rating
          );
          const playerNewRating = calculateNewRating(
            players[player].rating,
            playerActualScore,
            playerExpectedScore
          );
          players[player].rating = playerNewRating;
        }
      }
      players[player].matches += 1;
    }
  });
  return players;
}
