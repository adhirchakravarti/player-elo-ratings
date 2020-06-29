import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  BrowserRouter as Router,
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import {
  getMatches,
  createTableData,
  stopPolling,
  startPolling,
} from "./actions";

import Layout from "../Layout";

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    lastUpdate: state.lastUpdate,
    playerRatingData: state.playerRatingData,
    ratingTableColumns: state.ratingTable.columns,
    ratingTableRowData: state.ratingTable.rowData,
  };
};

function App({
  matches,
  playerRatingData,
  ratingTableColumns,
  ratingTableRowData,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatches());
  }, []);

  useEffect(() => {
    dispatch(createTableData());
  }, [playerRatingData]);

  // useEffect(() => {
  //   dispatch(startPolling());
  //   return () => dispatch(stopPolling());
  // }, []);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/ratings" />
        </Route>
        <Route path="/ratings">
          <Layout
            ratingTableColumns={ratingTableColumns}
            ratingTableRowData={ratingTableRowData}
            playerRatingData={playerRatingData}
          />
        </Route>
      </Switch>
    </Router>
  );
}

App.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string,
      standings: PropTypes.arrayOf(PropTypes.string),
    })
  ),
  playerRatingData: PropTypes.object,
  ratingTableColumns: PropTypes.array,
  ratingTableRowData: PropTypes.array,
};

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(App);
