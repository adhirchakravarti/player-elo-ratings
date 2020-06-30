import React from "react";
import PropTypes from "prop-types";
import { useRouteMatch, useHistory } from "react-router-dom";
import DataTable from "../DataTable";

export default function RatingsTable({
  tableColumns,
  tableRowData,
  addNewMatch,
}) {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  const handleDetailedView = (rowData) => {
    const { name } = rowData;
    const encodedName = encodeURIComponent(name);
    history.push(`${path}/${encodedName}`);
  };

  const handleFreeAction = () => {
    addNewMatch();
  };

  const actionsArray = [
    {
      icon: "pageview",
      tooltip: "View Details",
      onClick: (event, rowData) => {
        handleDetailedView(rowData);
      },
    },
    {
      icon: "add",
      tooltip: "Add a New Random Match",
      isFreeAction: true,
      onClick: (event) => {
        handleFreeAction();
      },
    },
  ];

  return (
    <>
      <DataTable
        tableColumns={tableColumns}
        tableRowData={tableRowData}
        actionsArray={actionsArray}
        title="Player Ratings"
      />
    </>
  );
}

RatingsTable.propTypes = {
  tableColumns: PropTypes.array,
  tableRowData: PropTypes.array,
  addNewMatch: PropTypes.func,
};
