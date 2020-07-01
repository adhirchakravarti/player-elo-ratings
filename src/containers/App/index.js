import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { compose } from "redux";
import {
  createTableData,
  stopPolling,
  startPolling,
  hideNotification,
} from "./actions";

import Layout from "../../components/Layout";
import NotificationBar from "../../components/NotificationBar";

const mapStateToProps = (state) => ({
  matches: state.matches,
  lastUpdate: state.lastUpdate,
  playerRatingData: state.playerRatingData,
  ratingTableColumns: state.ratingTable.columns,
  ratingTableRowData: state.ratingTable.rowData,
  notification: state.notification,
  notificationType: state.notificationType,
  notificationMessage: state.notificationMessage,
});

function App({
  playerRatingData,
  ratingTableColumns,
  ratingTableRowData,
  notification,
  notificationType,
  notificationMessage,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createTableData());
  }, [playerRatingData]);

  useEffect(() => {
    dispatch(startPolling());
    return () => dispatch(stopPolling());
  }, []);

  const handleSnackbarClose = () => {
    dispatch(hideNotification());
  };

  const message = {
    type: notificationType,
    message: notificationMessage,
  };

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/ratings" />
        </Route>
        <Route path="/ratings">
          <>
            <Layout
              ratingTableColumns={ratingTableColumns}
              ratingTableRowData={ratingTableRowData}
              playerRatingData={playerRatingData}
            />
            <NotificationBar
              notification={notification}
              message={message}
              handleClose={handleSnackbarClose}
            />
          </>
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
  notification: PropTypes.bool,
  notificationType: PropTypes.string,
  notificationMessage: PropTypes.string,
};

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(App);
