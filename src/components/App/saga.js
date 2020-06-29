import { call, put, takeEvery, takeLatest, all } from "redux-saga/effects";
import {
  SERVER_PATH,
  GET_MATCHES,
  CALCULATE_PLAYER_RATINGS,
  ADD_NEW_MATCH,
} from "./constants";
import axiosGetRequest from "../../utils/axiosGetRequest";
import axiosPostRequest from "../../utils/axiosPostRequest";
import {
  getMatchesSuccess,
  calculatePlayerRatings,
  calculatePlayerRatingsSuccess,
} from "./actions";
import ELOMatch from "../../utils/EloMatch";

function* getMatches() {
  const path = SERVER_PATH;
  try {
    const response = yield call(axiosGetRequest, path);
    if (response.error) {
      throw response.error;
    }
    yield put(getMatchesSuccess(response));
    yield put(calculatePlayerRatings(response));
  } catch (error) {
    console.warn(error);
  }
}

function* calculatePlayerELORatings(action) {
  const {
    matchData: { list: matches },
  } = action.payload;
  const playerData = {};
  matches.forEach((match) => {
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
          rating: player.eloPost,
        });
      } else {
        playerData[player.name].change += player.eloChange;
        playerData[player.name].postRating += player.eloChange;
        playerData[player.name].matches.push({
          createdAt: match.createdAt,
          place: player.place,
          standings: match.standings,
          points: player.eloChange,
          rating: player.eloPost,
        });
      }
    });
  });
  yield put(calculatePlayerRatingsSuccess(playerData));
}

function* submitNewMatch(action) {
  const { match } = action.payload;
  const path = SERVER_PATH;
  try {
    const response = yield call(axiosPostRequest, path, match);
    if (response.error) {
      throw response.error;
    }
  } catch (error) {
    console.warn(error);
  }
}

export default function* appSaga() {
  yield takeLatest(GET_MATCHES, getMatches);
  yield takeLatest(CALCULATE_PLAYER_RATINGS, calculatePlayerELORatings);
  yield takeLatest(ADD_NEW_MATCH, submitNewMatch);
}
