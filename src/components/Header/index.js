import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SideDrawer from "../SideDrawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header({ title }) {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => {
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
            onClick={() => toggleDrawer("left", true)}
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6">{title}</Typography>
        </Toolbar>
      </AppBar>
      <SideDrawer
        open={drawerState["left"]}
        onClose={() => toggleDrawer("left", false)}
      />
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

export default Header;
