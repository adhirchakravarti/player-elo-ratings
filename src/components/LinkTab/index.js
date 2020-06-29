import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";

function LinkTab(props) {
  console.log("Props at LinkTab = ", props);
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();
  console.log(match, location);
  const {
    params: { name },
  } = match;
  return (
    <Tab
      component="a"
      // to={props.href}
      onClick={(event) => {
        event.preventDefault();
        console.log(event);
        const encodedName = encodeURIComponent(name);
        history.push(`/ratings/${encodedName}/${props.href}`);
      }}
      {...props}
    />
  );
}

LinkTab.propTypes = {
  href: PropTypes.string,
};

export default LinkTab;
