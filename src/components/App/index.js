import React from "react";
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
  Box,
  Paper,
} from "@material-ui/core";

import StickyHeadTable from "../Table";

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

export default function App() {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl">
        <Grid
          container
          disableGutters
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
              <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
                <StickyHeadTable />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
