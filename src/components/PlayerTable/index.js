import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import MaterialTable from "material-table";
import axios from "axios";

import ELOMatch from "../../utils/EloMatch";

export default function PlayerTable(props) {
  console.log("props at table", props);
  const { path, url } = useRouteMatch();
  console.log("path & url =", path, url);
  const [matches, setMatches] = useState({});
  const [playerTableData, setPlayerTableData] = useState({});
  const [tableRowData, setTableRowData] = useState([]);
  const getMatches = async () => {
    const retrievedMatches = await axios.get("http://localhost:3000/matches");
    console.log(retrievedMatches, retrievedMatches.data);
    setMatches(retrievedMatches.data);
    return retrievedMatches.data;
  };

  const transformMatchesData = async () => {
    const playerData = {};
    const matches = await getMatches();
    const matchSubset = matches.list.slice(0, 4);
    console.log(matchSubset);
    matchSubset.forEach((match) => {
      const eloM = new ELOMatch();
      const numberOfPlayers = match.standings.length;
      for (let i = 0; i < numberOfPlayers; i++) {
        const player = match.standings[i];
        const existingELOscore = playerData[player] !== undefined;
        if (existingELOscore) {
          eloM.addPlayer(player, i, playerData[player].postRating);
        } else {
          eloM.addPlayer(player, i, 1000);
        }
      }
      eloM.calculateELOs();
      eloM.getPlayers().forEach((player) => {
        if (!playerData[player.name]) {
          playerData[player.name] = {};
          playerData[player.name].preRating = player.eloPre;
          playerData[player.name].postRating = player.eloPost;
          playerData[player.name].change = player.eloChange;
          playerData[player.name].matches = [];
          playerData[player.name].matches.push({
            createdAt: match.createdAt,
            standings: match.standings,
            points: player.eloChange,
          });
        } else {
          playerData[player.name].change += player.eloChange;
          playerData[player.name].postRating += player.eloChange;
          playerData[player.name].matches.push({
            createdAt: match.createdAt,
            standings: match.standings,
            points: player.eloChange,
          });
        }
      });
    });
    // const players = getELOrating(matchSubset);
    console.log(playerData);
    setPlayerTableData(playerData);
  };

  useEffect(() => {
    // getMatches();
    transformMatchesData();
  }, []);

  useEffect(() => {
    createTableData();
  }, [playerTableData]);

  const createTableData = () => {
    console.log(playerTableData);
    const tableData = Object.keys(playerTableData).map((key) => {
      return {
        name: key,
        startRating: playerTableData[key].preRating,
        endRating: playerTableData[key].postRating,
        change: playerTableData[key].change,
        matches: playerTableData[key].matches.length,
      };
    });
    console.log(tableData);
    setTableRowData(tableData);
  };

  return (
    <>
      {/* {tableRowData.length > 0 && ( */}
      <MaterialTable
        columns={[
          { title: "Name", field: "name" },
          { title: "Start Rating", field: "startRating", type: "numeric" },
          { title: "End Rating", field: "endRating", type: "numeric" },
          {
            title: "Rating Change",
            field: "change",
            type: "numeric",
          },
          {
            title: "Matches",
            field: "matches",
            type: "numeric",
          },
        ]}
        data={tableRowData}
        isLoading={tableRowData.length === 0}
        actions={[
          {
            icon: "pageview",
            tooltip: "view details",
            onClick: (event, rowData) => {
              // Do save operation
              console.log(event, rowData);
              const { name } = rowData;
              props.history.push(`${path}/${name}`);
            },
          },
        ]}
        options={{
          filtering: true,
          sorting: true,
          pageSize: 10,
          // paging: false,
        }}
        title="Player Ratings"
      />
      {/* )} */}
    </>
  );
}

PlayerTable.propTypes = {
  history: PropTypes.objectOf(PropTypes.func),
};
