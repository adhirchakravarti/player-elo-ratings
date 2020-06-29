import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouteMatch, useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import tableIcons from "../../utils/tableIcons";
const { SkipPrevious } = tableIcons;

const SkipPreviousIcon = () => <SkipPrevious />;
SkipPreviousIcon.displayName = "SkipPreviousIcon";

export default function PlayerMatchesTable({
  playerName,
  tableColumns,
  tableRowData,
}) {
  // console.log("props at PlayerTable", playerName, tableColumns, tableRowData);
  const { path, url } = useRouteMatch();
  // console.log("path & url =", path, url);
  const history = useHistory();
  // console.log(history);

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={tableColumns}
        data={tableRowData}
        isLoading={tableRowData.length <= 0}
        actions={[
          {
            icon: () => SkipPreviousIcon(),
            tooltip: "Back to Player Ratings",
            isFreeAction: true,
            onClick: (event) => {
              // console.log(event, path, url, history);
              history.push("/ratings");
            },
          },
        ]}
        options={{
          // filtering: true,
          sorting: true,
          pageSize: 10,
          // paging: false,
        }}
        title={playerName}
      />
    </>
  );
}

PlayerMatchesTable.propTypes = {
  playerName: PropTypes.string,
  tableColumns: PropTypes.array,
  tableRowData: PropTypes.array,
};
