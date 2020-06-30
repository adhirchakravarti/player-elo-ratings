import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, useHistory } from "react-router-dom";
import MaterialTable from "material-table";

export default function RatingsTable({
  tableColumns,
  tableRowData,
  addNewMatch,
}) {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  return (
    <>
      <MaterialTable
        columns={tableColumns}
        data={tableRowData}
        isLoading={tableRowData.length <= 0}
        actions={[
          {
            icon: "pageview",
            tooltip: "View Details",
            onClick: (event, rowData) => {
              const { name } = rowData;
              const encodedName = encodeURIComponent(name);
              history.push(`${path}/${encodedName}`);
            },
          },
          {
            icon: "add",
            tooltip: "Add a New Random Match",
            isFreeAction: true,
            onClick: (event) => {
              addNewMatch();
            },
          },
        ]}
        options={{
          sorting: true,
          pageSize: 10,
        }}
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
