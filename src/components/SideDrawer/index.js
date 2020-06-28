import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import TableChartIcon from "@material-ui/icons/TableChart";
import TimelineIcon from "@material-ui/icons/Timeline";

function SideDrawer({ open, onClose }) {
  const list = (anchor) => (
    <div role="presentation" onClick={handleClose} onKeyDown={handleClose}>
      <List>
        <ListItem button key="ratings" component={Link} to="/ratings">
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Rating Table" />
        </ListItem>
        <Divider />
        <ListItem button key="charts" component={Link} to="/ratings">
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const handleClose = () => {
    console.log("handleClose() called!!");
    onClose();
  };

  return (
    <div>
      <React.Fragment key="left">
        <Drawer anchor="left" open={open} onClose={handleClose}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

SideDrawer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default SideDrawer;
