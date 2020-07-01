import React from "react";
import PropTypes from "prop-types";
import MaterialTable from "material-table";
import tableIcons from "../../utils/tableIcons";

export default function DataTable({
  tableColumns,
  tableRowData,
  actionsArray,
  title,
}) {
  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={tableColumns}
        data={tableRowData}
        isLoading={tableRowData.length <= 0}
        actions={actionsArray}
        options={{
          sorting: true,
          pageSize: 10,
        }}
        title={title}
      />
    </>
  );
}

DataTable.propTypes = {
  tableColumns: PropTypes.array,
  tableRowData: PropTypes.array,
  actionsArray: PropTypes.array,
  title: PropTypes.string,
};
