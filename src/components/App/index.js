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
import { Snackbar, Button, Slide, styled } from "@material-ui/core";
import {
  getMatches,
  createTableData,
  stopPolling,
  startPolling,
  hideNotification,
} from "./actions";

import Layout from "../Layout";

const notificationColorMap = {
  info: "#2196F3",
  success: "#4CAF50",
  error: "#F44336",
  warn: "#FF9800",
};

const NotificationBar = styled(({ message, ...other }) => (
  <Snackbar message={message.message} {...other} />
))({
  "& .MuiSnackbarContent-root": {
    backgroundColor: (props) => {
      console.log(props);
      if (props.message.type && notificationColorMap[props.message.type]) {
        return notificationColorMap[props.message.type];
      }
      return "#fff";
    },
    color: (props) => {
      if (props.message.type && notificationColorMap[props.message.type]) {
        return "#fff";
      }
      return "#000";
    },
    "& .MuiSnackbarContent-action": {
      "& .MuiButton-label": {
        color: (props) => {
          if (props.message.type && notificationColorMap[props.message.type]) {
            return "#fff";
          }
          return "#f50057";
        },
      },
    },
  },
});

const mapStateToProps = (state) => {
  return {
    matches: state.matches,
    lastUpdate: state.lastUpdate,
    playerRatingData: state.playerRatingData,
    ratingTableColumns: state.ratingTable.columns,
    ratingTableRowData: state.ratingTable.rowData,
    notification: state.notification,
    notificationType: state.notificationType,
    notificationMessage: state.notificationMessage,
  };
};

function App({
  matches,
  playerRatingData,
  ratingTableColumns,
  ratingTableRowData,
  notification,
  notificationType,
  notificationMessage,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatches());
  }, []);

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
              open={notification}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              autoHideDuration={5000}
              TransitionComponent={(props) => (
                <Slide {...props} direction="right" />
              )}
              message={message}
              onClose={handleSnackbarClose}
              action={
                <React.Fragment>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={handleSnackbarClose}
                  >
                    Dismiss
                  </Button>
                </React.Fragment>
              }
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
