import {
  GET_MATCHES,
  GET_MATCHES_SUCCESS,
  CALCULATE_PLAYER_RATINGS,
  CALCULATE_PLAYER_RATINGS_SUCCESS,
  CREATE_RATING_TABLE_DATA,
  START_POLLING,
  STOP_POLLING,
  ADD_NEW_MATCH,
} from "./constants";

export function getMatches() {
  return {
    type: GET_MATCHES,
  };
}

export function getMatchesSuccess(matchData) {
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

export function startPolling() {
  return {
    type: START_POLLING,
  };
}

export function stopPolling(error) {
  return {
    type: STOP_POLLING,
    payload: {
      error,
    },
  };
}

export function addNewMatch(match) {
  return {
    type: ADD_NEW_MATCH,
    payload: {
      match,
    },
  };
}
