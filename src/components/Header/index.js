import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Icon,
  Typography,
  makeStyles,
} from "@material-ui/core";
import SideDrawer from "../SideDrawer";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Header() {
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
          <Typography variant="h6">Player Ratings</Typography>
        </Toolbar>
      </AppBar>
      <SideDrawer
        open={drawerState["left"]}
        onClose={() => toggleDrawer("left", false)}
      />
    </>
  );
}

export default Header;
