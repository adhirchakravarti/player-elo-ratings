import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import DataTable from "../DataTable";
import tableIcons from "../../utils/tableIcons";
const { SkipPrevious } = tableIcons;

const SkipPreviousIcon = () => <SkipPrevious />;
SkipPreviousIcon.displayName = "SkipPreviousIcon";

export default function PlayerMatchesTable({
  playerName,
  tableColumns,
  tableRowData,
}) {
  const history = useHistory();

  const handleNavBack = () => {
    history.push("/ratings");
  };

  const actionsArray = [
    {
      icon: () => SkipPreviousIcon(),
      tooltip: "Back to Player Ratings",
      isFreeAction: true,
      onClick: (event) => {
        handleNavBack();
      },
    },
  ];

  return (
    <>
      <DataTable
        tableColumns={tableColumns}
        tableRowData={tableRowData}
        actionsArray={actionsArray}
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
