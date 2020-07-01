import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

import Header from "../Header";
import RatingsTable from "../RatingsTable";
import PlayerMatchesTable from "../PlayerMatchesTable";
import generateSingleMatch from "../../utils/generateSingleMatch";
import { addNewMatch } from "../../containers/App/actions";
import MyResponsiveLine from "../LineChart";
import PlayerDetails from "../PlayerDetails";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  chartContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xl")]: {
      height: "40rem",
    },
    [theme.breakpoints.down("lg")]: {
      height: "45rem",
    },
    [theme.breakpoints.down("md")]: {
      height: "45rem",
    },
    [theme.breakpoints.down("sm")]: {
      height: "50rem",
    },
    [theme.breakpoints.down("xs")]: {
      height: "50rem",
    },
  },
}));

export default function Layout({
  ratingTableColumns,
  ratingTableRowData,
  playerRatingData,
}) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleAddNewMatch = () => {
    const newMatch = generateSingleMatch();
    dispatch(addNewMatch(newMatch));
  };

  return (
    <>
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
            <Header title="Scopely Player Ratings" />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid component="div" className={classes.tableContainer} container>
              <Switch>
                <Route
                  path="/ratings"
                  exact
                  render={() => {
                    return (
                      <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                        <RatingsTable
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
                    const {
                      match: {
                        params: { name },
                      },
                    } = routeProps;
                    const player = playerRatingData[name]
                      ? playerRatingData[name]
                      : null;
                    const columns =
                      player !== null
                        ? [
                            {
                              field: "createdAt",
                              title: "Match Date / Time",
                              type: "datetime",
                              customSort: (a, b) => {
                                const timeA = moment(
                                  new Date(a.createdAt)
                                ).valueOf();
                                const timeB = moment(
                                  new Date(b.createdAt)
                                ).valueOf();
                                return timeA < timeB
                                  ? -1
                                  : timeA > timeB
                                  ? 1
                                  : 0;
                              },
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
                      <PlayerDetails>
                        {player && (
                          <PlayerMatchesTable
                            playerName={name}
                            tableColumns={columns}
                            tableRowData={rowData}
                          />
                        )}
                      </PlayerDetails>
                    );
                  }}
                />
                <Route
                  path="/ratings/:name/chart"
                  render={(routeProps) => {
                    const {
                      match: {
                        params: { name },
                      },
                    } = routeProps;
                    const player = playerRatingData[name]
                      ? playerRatingData[name]
                      : null;
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
                    return (
                      <PlayerDetails>
                        {chartPlayerData[0].data && (
                          <Paper
                            className={classes.chartContainer}
                            elevation={2}
                          >
                            <MyResponsiveLine data={chartPlayerData} />
                          </Paper>
                        )}
                      </PlayerDetails>
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
