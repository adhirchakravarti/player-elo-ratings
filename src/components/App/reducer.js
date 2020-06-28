import { original, produce, setAutoFreeze } from "immer";
setAutoFreeze(false);

import {
  GET_MATCHES,
  GET_MATCHES_SUCCESS,
  CALCULATE_PLAYER_RATINGS_SUCCESS,
  CREATE_RATING_TABLE_DATA,
} from "./constants";

const initialState = {
  matches: [],
  lastUpdate: "",
  playerRatingData: {},
  ratingTable: {
    columns: [],
    rowData: [],
  },
};

const rootReducer = produce((draft, action) => {
  switch (action.type) {
    case GET_MATCHES_SUCCESS: {
      console.log(action.payload);
      const {
        matchData: { list: matches, updatedAt },
      } = action.payload;
      draft.matches = [...matches];
      draft.lastUpdate = updatedAt;
      break;
    }
    case CALCULATE_PLAYER_RATINGS_SUCCESS: {
      console.log(action.payload);
      const { playerRatings } = action.payload;
      draft.playerRatingData = Object.assign({}, playerRatings);
      break;
    }
    case CREATE_RATING_TABLE_DATA: {
      const columns = [
        { title: "Player Name", field: "name" },
        { title: "Start Rating", field: "startRating", type: "numeric" },
        { title: "End Rating", field: "endRating", type: "numeric" },
        {
          title: "Rating Change",
          field: "change",
          type: "numeric",
        },
        {
          title: "Number of Matches",
          field: "matches",
          type: "numeric",
        },
      ];
      const { playerRatingData } = original(draft);
      const rowData = Object.keys(playerRatingData).map((key) => {
        return {
          name: key,
          startRating: playerRatingData[key].preRating,
          endRating: playerRatingData[key].postRating,
          change: playerRatingData[key].change,
          matches: playerRatingData[key].matches.length,
        };
      });
      console.log("Columns, RowData = ", columns, rowData);
      draft.ratingTable.columns = columns;
      draft.ratingTable.rowData = rowData;
      break;
    }
    case GET_MATCHES: {
      console.log("Action GET_MATCHES!");
      break;
    }
  }
}, initialState);

export default rootReducer;
