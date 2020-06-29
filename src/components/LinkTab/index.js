import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@material-ui/core";
import { useHistory, useRouteMatch } from "react-router-dom";

function LinkTab(props) {
  console.log("Props at LinkTab = ", props);
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
