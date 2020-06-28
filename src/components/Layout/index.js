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
import moment from "moment";
import PlayerTable from "../PlayerTable";
import DetailsTable from "../DetailsTable";
import SideDrawer from "../SideDrawer";

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

export default function Layout({
  ratingTableColumns,
  ratingTableRowData,
  playerRatingData,
}) {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  console.log("path & url at Layout", path, url);
  // console.log("props at Layout = ", ratingTableColumns, ratingTableRowData);
  const [drawerState, setDrawerState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => {
    console.log("Toggle drawer called!! ", anchor, open);
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }

    setDrawerState({ ...drawerState, [anchor]: open });
  };

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
                        <PlayerTable
                          tableColumns={ratingTableColumns}
                          tableRowData={ratingTableRowData}
                        />
                      </Grid>
                    );
                  }}
                />
                <Route
                  path="/ratings/:name"
                  render={(routeProps) => {
                    console.log("route props at /ratings/name", routeProps);
                    const {
                      match: {
                        params: { name },
                      },
                    } = routeProps;
                    console.log("name = ", name, playerRatingData);
                    const player = playerRatingData[name]
                      ? playerRatingData[name]
                      : null;
                    console.log("Player = ", player);
                    const columns =
                      player !== null
                        ? [
                            { field: "createdAt", title: "Matches Started" },
                            { field: "place", title: "Place", type: "numeric" },
                            { field: "standings", title: "Results" },
                            { field: "points", title: "Points Won / Lost" },
                          ]
                        : [];
                    const rowData =
                      player &&
                      player.matches.map((match) => {
                        return {
                          createdAt: moment(match.createdAt).format(
                            "MM-DD-YYYY HH:mm:ss.SSS"
                          ),
                          place: match.place + 1,
                          points: match.points,
                          standings: match.standings.join(", "),
                        };
                      });
                    console.log("Details columns, rowData", columns, rowData);

                    return (
                      <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                        {player && (
                          <DetailsTable
                            playerName={name}
                            tableColumns={columns}
                            tableRowData={rowData}
                          />
                        )}
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

Layout.propTypes = {
  ratingTableColumns: PropTypes.array,
  ratingTableRowData: PropTypes.array,
  playerRatingData: PropTypes.object,
};
