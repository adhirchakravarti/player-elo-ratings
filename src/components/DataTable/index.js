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
  console.log(
    "Props at DataTable ",
    actionsArray,
    tableRowData,
    tableColumns,
    title
  );
  return (
    <>
      <MaterialTable
        icons={tableIcons}
        columns={tableColumns}
        data={tableRowData}
        isLoading={tableRowData.length <= 0}
        actions={actionsArray}
        // actions={[
        //   {
        //     icon: "pageview",
        //     tooltip: "View Details",
        //     onClick: (event, rowData) => {
        //       const { name } = rowData;
        //       const encodedName = encodeURIComponent(name);
        //       history.push(`${path}/${encodedName}`);
        //     },
        //   },
        //   {
        //     icon: "add",
        //     tooltip: "Add a New Random Match",
        //     isFreeAction: true,
        //     onClick: (event) => {
        //       // addNewMatch();
        //       onFreeAction();
        //     },
        //   },
        // ]}
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
