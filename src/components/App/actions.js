import {
  GET_MATCHES,
  GET_MATCHES_SUCCESS,
  CALCULATE_PLAYER_RATINGS,
  CALCULATE_PLAYER_RATINGS_SUCCESS,
  CREATE_RATING_TABLE_DATA,
} from "./constants";

export function getMatches() {
  return {
    type: GET_MATCHES,
  };
}

export function getMatchesSuccess(matchData) {
  console.log(matchData);
  return {
    type: GET_MATCHES_SUCCESS,
    payload: {
      matchData,
    },
  };
}

export function calculatePlayerRatings(matchData) {
  return {
    type: CALCULATE_PLAYER_RATINGS,
    payload: {
      matchData,
    },
  };
}

export function calculatePlayerRatingsSuccess(playerRatings) {
  return {
    type: CALCULATE_PLAYER_RATINGS_SUCCESS,
    payload: {
      playerRatings,
    },
  };
}

export function createTableData() {
  return {
    type: CREATE_RATING_TABLE_DATA,
  };
}
