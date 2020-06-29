import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Tabs,
  Tab,
  Button,
  Typography,
  Icon,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import moment from "moment";

import Header from "../Header";
import PlayerTable from "../PlayerTable";
import DetailsTable from "../DetailsTable";
import SideDrawer from "../SideDrawer";
import TabPanel from "../TabPanel";
import LinkTab from "../LinkTab";
import generateSingleMatch from "../../utils/generateSingleMatch";
import { addNewMatch } from "../App/actions";
import MyResponsiveLine from "../LineChart";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    display: "flex",
    flex: "1 1 auto",
    height: "100%",
    overflowY: "auto",
    backgroundColor: "#f2f2f2",
  },
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30rem",
  },
}));

export default function Layout({
  ratingTableColumns,
  ratingTableRowData,
  playerRatingData,
}) {
  const dispatch = useDispatch();
  const { path, url, isExact } = useRouteMatch();
  const { pathname } = useLocation();
  const classes = useStyles();
  console.log("path & url at Layout", path, url, isExact);
  console.log("location pathname at layout = ", pathname);

  const handleAddNewMatch = () => {
    const newMatch = generateSingleMatch();
    dispatch(addNewMatch(newMatch));
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
            <Header />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid component="div" className={classes.tableContainer} container>
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
                          addNewMatch={handleAddNewMatch}
                        />
                      </Grid>
                    );
                  }}
                />
                <Route
                  path="/ratings/:name"
                  exact
                  render={(routeProps) => {
                    console.log("Route Props at /ratings/:name ", routeProps);
                    const {
                      match: {
                        params: { name },
                      },
                    } = routeProps;
                    return <Redirect to={`/ratings/${name}/matches`} />;
                  }}
                />
                <Route
                  path="/ratings/:name/matches"
                  render={(routeProps) => {
                    console.log(
                      "route props at /ratings/:name/matches",
                      routeProps
                    );
                    const {
                      match: {
                        params: { name },
                      },
                    } = routeProps;
                    const player = playerRatingData[name]
                      ? playerRatingData[name]
                      : null;
                    console.log("Player = ", player);
                    const columns =
                      player !== null
                        ? [
                            {
                              field: "createdAt",
                              title: "Match Date / Time",
                              type: "datetime",
                            },
                            { field: "place", title: "Place", type: "numeric" },
                            {
                              field: "standings",
                              title: "Standings",
                              sorting: false,
                            },
                            {
                              field: "rating",
                              title: "Rating At Match End",
                              type: "numeric",
                            },
                            {
                              field: "points",
                              title: "Points Won / Lost",
                              type: "numeric",
                              cellStyle: { textAlign: "center" },
                              headerStyle: { textAlign: "right" },
                            },
                          ]
                        : [];
                    const rowData =
                      player &&
                      player.matches.map((match) => {
                        return {
                          createdAt: moment(match.createdAt).format("lll"),
                          place: match.place + 1,
                          standings: match.standings.join(", "),
                          rating: match.rating,
                          points: match.points,
                        };
                      });

                    return (
                      <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {pathname.includes("/ratings/") &&
                              pathname !== "/ratings" && <TabPanel />}
                          </Grid>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {player && (
                              <DetailsTable
                                playerName={name}
                                tableColumns={columns}
                                tableRowData={rowData}
                              />
                            )}
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  }}
                />
                <Route
                  path="/ratings/:name/chart"
                  render={(routeProps) => {
                    console.log(
                      "route props at /ratings/:name/chart",
                      routeProps
                    );
                    const {
                      match: {
                        params: { name },
                      },
                    } = routeProps;
                    const player = playerRatingData[name]
                      ? playerRatingData[name]
                      : null;
                    console.log("Player = ", player, playerRatingData);
                    const seriesData =
                      player &&
                      player.matches.map((match) => {
                        return {
                          x: moment(match.createdAt).format(
                            "MM-DD-YYYY HH:mm:ss"
                          ),
                          y: match.rating,
                        };
                      });
                    const chartPlayerData = [
                      {
                        id: name,
                        data: seriesData,
                      },
                    ];
                    console.log(chartPlayerData);
                    return (
                      <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                        <Grid container spacing={2}>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            {pathname.includes("/ratings/") &&
                              pathname !== "/ratings" && <TabPanel />}
                          </Grid>
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                            <Paper
                              className={classes.chartContainer}
                              elevation={2}
                            >
                              {chartPlayerData[0].data && (
                                <MyResponsiveLine data={chartPlayerData} />
                              )}
                            </Paper>
                          </Grid>
                        </Grid>
                      </Grid>
                    );
                  }}
                />
              </Switch>
            </Grid>
          </Grid>
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
