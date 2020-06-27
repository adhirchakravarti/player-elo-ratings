import React from "react";
import PropTypes from "prop-types";

import { List } from "@material-ui/core";
import DetailPanel from "../DetailPanel";

export default function PanelList({ items }) {
  return (
    <>
      <List>
        {items.map((item) => {
          return (
            <DetailPanel
              key={item.timestamp}
              timestamp={item.timestamp}
              points={items.points}
              standings={items.standings}
            />
          );
        })}
      </List>
    </>
  );
}

PanelList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string,
      points: PropTypes.number,
      standings: PropTypes.arrayOf(PropTypes.string),
    })
  ),
};
