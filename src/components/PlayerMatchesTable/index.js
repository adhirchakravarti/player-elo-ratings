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
  const { path, url } = useRouteMatch();
  const history = useHistory();

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
              history.push("/ratings");
            },
          },
        ]}
        options={{
          sorting: true,
          pageSize: 10,
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
