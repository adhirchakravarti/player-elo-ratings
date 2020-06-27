import React from "react";
import PropTypes from "prop-types";

import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Icon,
} from "@material-ui/core";

export default function DetailPanel({ timestamp, points, standings }) {
  return (
    <ExpansionPanel expandIcon={<Icon>expandmore</Icon>}>
      <ExpansionPanelSummary>
        <Typography variant="subtitle1">Match Time: {timestamp}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <Typography variant="body1">Points: {points}</Typography>
        <Typography variant="body1">Standings: {standings}</Typography>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

DetailPanel.propTypes = {
  timestamp: PropTypes.string,
  points: PropTypes.number,
  standings: PropTypes.array,
};
