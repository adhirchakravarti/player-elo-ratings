import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import TableChartIcon from "@material-ui/icons/TableChart";

function SideDrawer({ open, onClose }) {
  const list = () => (
    <div role="presentation" onClick={handleClose} onKeyDown={handleClose}>
      <List>
        <ListItem button key="ratings" component={Link} to="/ratings">
          <ListItemIcon>
            <TableChartIcon />
          </ListItemIcon>
          <ListItemText primary="Rating Table" />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  const handleClose = () => {
    onClose();
  };

  return (
    <div>
      <React.Fragment key="left">
        <Drawer anchor="left" open={open} onClose={handleClose}>
          {list()}
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
