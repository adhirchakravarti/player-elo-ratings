import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

function LinkTab({ link, label, ...restProps }) {
  const history = useHistory();
  const match = useRouteMatch();
  const {
    params: { name },
  } = match;
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
        const encodedName = encodeURIComponent(name);
        history.push(`/ratings/${encodedName}/${link}`);
      }}
      label={label}
      {...restProps}
    />
  );
}

LinkTab.propTypes = {
  link: PropTypes.string,
  label: PropTypes.string,
};

export default LinkTab;
