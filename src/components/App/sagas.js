import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import { GET_MATCHES, CALCULATE_PLAYER_RATINGS } from "./constants";
import axiosGetRequest from "../../utils/axiosGetRequest";
import {
  getMatchesSuccess,
  calculatePlayerRatings,
  calculatePlayerRatingsSuccess,
} from "./actions";
import ELOMatch from "../../utils/EloMatch";

function* getMatches() {
  const path = "matches";
  try {
    const response = yield call(axiosGetRequest, path);
    console.log("AXIOS response! = ", response);
    if (response.error) {
      throw response.error;
    }
    const matchData = response;
    yield put(getMatchesSuccess(matchData));
    yield put(calculatePlayerRatings(matchData));
  } catch (error) {
    console.warn(error);
  }
}

function* calculatePlayerELORatings(action) {
  console.log(action);
  const {
    matchData: { list: matches },
  } = action.payload;
  const playerData = {};
  const matchSubset = matches.slice(0, 4);
  console.log(matchSubset);
  matchSubset.forEach((match) => {
    const eloM = new ELOMatch();
    const numberOfPlayers = match.standings.length;
    for (let i = 0; i < numberOfPlayers; i++) {
      const player = match.standings[i];
      const existingELOscore = playerData[player] !== undefined;
      if (existingELOscore) {
        eloM.addPlayer(player, i, playerData[player].postRating);
      } else {
        eloM.addPlayer(player, i, 1000);
      }
    }
    eloM.calculateELOs();
    eloM.getPlayers().forEach((player) => {
      if (!playerData[player.name]) {
        playerData[player.name] = {};
        playerData[player.name].preRating = player.eloPre;
        playerData[player.name].postRating = player.eloPost;
        playerData[player.name].change = player.eloChange;
        playerData[player.name].matches = [];
        playerData[player.name].matches.push({
          createdAt: match.createdAt,
          place: player.place,
          standings: match.standings,
          points: player.eloChange,
        });
      } else {
        playerData[player.name].change += player.eloChange;
        playerData[player.name].postRating += player.eloChange;
        playerData[player.name].matches.push({
          createdAt: match.createdAt,
          place: player.place,
          standings: match.standings,
          points: player.eloChange,
        });
      }
    });
  });
  console.log(playerData);
  yield put(calculatePlayerRatingsSuccess(playerData));
}

export default function* rootSaga() {
  yield takeLatest(GET_MATCHES, getMatches);
  yield takeLatest(CALCULATE_PLAYER_RATINGS, calculatePlayerELORatings);
}
