import React from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Button,
  Typography,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import PlayerTable from "../PlayerTable";
import PanelList from "../PanelList";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
    overflowY: "auto",
    backgroundColor: "#f2f2f2",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Layout() {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  console.log("path & url at Layout", path, url);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="stretch"
          alignContent="stretch"
          xl={12}
          spacing={5}
        >
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  className={classes.menuButton}
                >
                  <Icon>menu</Icon>
                </IconButton>
                <Typography variant="h6">Player Ratings</Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid component="div" className={classes.tableContainer} container>
              {/* <Paper elevation={1} /> */}
              <Switch>
                {/* <Route exact path="/">
                  <Redirect to="/ratings" />
                </Route> */}
                <Route
                  path="/ratings"
                  exact
                  render={(routeProps) => {
                    console.log("route props at /ratings", routeProps);
                    return (
                      <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                        <PlayerTable {...routeProps} />
                      </Grid>
                    );
                  }}
                />
                <Route
                  path="/ratings/:name"
                  render={(routeProps) => {
                    console.log("route props at /ratings/name", routeProps);
                    return (
                      <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                        <PanelList />
                      </Grid>
                    );
                  }}
                />
              </Switch>
            </Grid>
          </Grid>
          {/* <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid component="div" className={classes.tableContainer} container>
              <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                <StickyHeadTable />
              </Grid>
            </Grid>
          </Grid> */}
        </Grid>
      </Container>
    </>
  );
}
