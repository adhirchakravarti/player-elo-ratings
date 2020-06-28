import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, useHistory } from "react-router-dom";
import MaterialTable from "material-table";

export default function PlayerTable({
  tableColumns,
  tableRowData,
  ...restProps
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
            tooltip: "view details",
            onClick: (event, rowData) => {
              console.log(event, rowData);
              const { name } = rowData;
              const encodedName = encodeURIComponent(name);
              console.log(`${path}/${encodedName}`);
              history.push(`${path}/${encodedName}`);
            },
          },
        ]}
        options={{
          // filtering: true,
          sorting: true,
          pageSize: 10,
          // paging: false,
        }}
        title="Player Ratings"
      />
    </>
  );
}

PlayerTable.propTypes = {
  tableColumns: PropTypes.array,
  tableRowData: PropTypes.array,
};
