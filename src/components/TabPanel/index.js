import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Tabs, Tab, Paper } from "@material-ui/core";
import LinkTab from "../LinkTab";

function TabPanel() {
  const { url } = useRouteMatch();
  console.log("Match.url at TabPanel = ", url);
  const [tabValue, setTabValue] = useState(() => {
    if (url.includes("/chart")) {
      return 1;
    }
    return 0;
  });

  const handleTabChange = (e, newVal) => {
    setTabValue(newVal);
  };

  return (
    <Paper>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <LinkTab label="Matches" href="matches" />
        <LinkTab label="Rating Progress" href="chart" />
      </Tabs>
    </Paper>
  );
}

export default TabPanel;
