import React from "react";
import PropTypes from "prop-types";
import {
  Snackbar,
  SnackbarContent,
  Button,
  Slide,
  styled,
  Typography,
  Icon,
  makeStyles,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";

const useStyles = makeStyles((theme) => ({
  snackbarMessage: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& .MuiIcon-root, & .MuiSvgIcon-root": {
      marginRight: "1rem",
    },
  },
}));

const notificationColorMap = {
  info: "#2196F3",
  success: "#4CAF50",
  error: "#F44336",
  warn: "#FF9800",
};

const notificationIconMap = {
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  error: <ErrorIcon />,
  warn: <WarningIcon />,
};

const StyledNotificationBar = styled((props) => {
  const { action, message, type, ...restProps } = props;
  return (
    <Snackbar {...restProps}>
      <SnackbarContent action={action} message={message} />
    </Snackbar>
  );
})({
  "& .MuiSnackbarContent-root": {
    backgroundColor: (props) => {
      if (props.type && notificationColorMap[props.type]) {
        return notificationColorMap[props.type];
      }
      return "#fff";
    },
    color: (props) => {
      if (props.type && notificationColorMap[props.type]) {
        return "#fff";
      }
      return "#000";
    },
    "& .MuiSnackbarContent-action": {
      "& .MuiButton-label": {
        color: (props) => {
          if (props.type && notificationColorMap[props.type]) {
            return "#fff";
          }
          return "#f50057";
        },
      },
    },
  },
});

function NotificationBar({ notification, message, handleClose }) {
  const classes = useStyles();

  return (
    <StyledNotificationBar
      key={message.message}
      open={notification}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={5000}
      TransitionComponent={(props) => <Slide {...props} direction="right" />}
      onClose={handleClose}
      action={
        <>
          <Button size="small" onClick={handleClose}>
            Dismiss
          </Button>
        </>
      }
      message={
        <div className={classes.snackbarMessage}>
          {notificationIconMap[message.type]}
          <Typography variant="subtitle2">{message.message}</Typography>
        </div>
      }
      type={message.type}
    />
  );
}

NotificationBar.propTypes = {
  notification: PropTypes.bool,
  message: PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  }),
  handleClose: PropTypes.func,
};

export default NotificationBar;
