import React, { useState } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import TabPanel from "../TabPanel";

function PlayerDetails({ children }) {
  return (
    <Grid item xl={8} lg={8} md={10} sm={12} xs={12}>
      <Grid container spacing={2}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TabPanel />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
}

PlayerDetails.propTypes = {
  children: PropTypes.any,
};

PlayerDetails.defaultProps = {
  children: null,
};

export default PlayerDetails;
