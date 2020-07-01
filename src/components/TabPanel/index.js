import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { Tabs, Paper } from "@material-ui/core";
import LinkTab from "../LinkTab";

function TabPanel({ tabs }) {
  const { url } = useRouteMatch();
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
        {tabs.length > 0 &&
          tabs.map(({ label, link }) => (
            <LinkTab key={label} label={label} link={link} />
          ))}
      </Tabs>
    </Paper>
  );
}

TabPanel.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export default TabPanel;
