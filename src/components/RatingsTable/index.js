import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, useHistory } from "react-router-dom";
import MaterialTable from "material-table";

export default function RatingsTable({
  tableColumns,
  tableRowData,
  addNewMatch,
}) {
  // console.log("props at PlayerTable", tableColumns, tableRowData, restProps);
  const { path, url } = useRouteMatch();
  // console.log("path & url =", path, url);
  const history = useHistory();
  // console.log(history);

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
              // console.log(event, rowData);
              const { name } = rowData;
              const encodedName = encodeURIComponent(name);
              console.log(`${path}/${encodedName}`);
              history.push(`${path}/${encodedName}`);
            },
          },
          {
            icon: "add",
            tooltip: "Add a New Random Match",
            isFreeAction: true,
            onClick: (event) => {
              console.log(event, path, url, history);
              addNewMatch();
              // history.push("/ratings");
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
