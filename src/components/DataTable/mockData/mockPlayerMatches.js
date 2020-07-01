export const playerName = "Bowser";

export const tableRowData = [
  {
    createdAt: "Mar 22, 2020 1:23 AM",
    place: 2,
    standings: "Dry bones, Bowser, Black shy guy, Luigi",
    rating: 1016,
    points: 16,
  },
  {
    createdAt: "Mar 25, 2020 1:23 AM",
    place: 2,
    standings: "Villager, Bowser, Black shy guy, Baby peach",
    rating: 1027,
    points: 11,
  },
  {
    createdAt: "Mar 26, 2020 1:23 AM",
    place: 3,
    standings: "Waluigi, Luigi, Bowser, Black shy guy",
    rating: 1003,
    points: -24,
  },
  {
    createdAt: "Mar 27, 2020 1:23 AM",
    place: 4,
    standings: "Dry bones, Mario, Waluigi, Bowser",
    rating: 960,
    points: -43,
  },
  {
    createdAt: "Apr 5, 2020 1:23 AM",
    place: 4,
    standings: "Waluigi, Villager, Baby peach, Bowser",
    rating: 924,
    points: -36,
  },
  {
    createdAt: "Apr 9, 2020 1:23 AM",
    place: 4,
    standings: "Waluigi, Dry bones, Mario, Bowser",
    rating: 890,
    points: -34,
  },
  {
    createdAt: "Apr 11, 2020 1:23 AM",
    place: 2,
    standings: "Luigi, Bowser, Baby peach, Black shy guy",
    rating: 913,
    points: 23,
  },
  {
    createdAt: "Apr 12, 2020 1:23 AM",
    place: 4,
    standings: "Luigi, Baby peach, Mario, Bowser",
    rating: 874,
    points: -39,
  },
];

export const tableColumns = [
  {
    field: "createdAt",
    title: "Match Date / Time",
    type: "datetime",
    customSort: (a, b) => {
      const timeA = moment(new Date(a.createdAt)).valueOf();
      const timeB = moment(new Date(b.createdAt)).valueOf();
      return timeA < timeB ? -1 : timeA > timeB ? 1 : 0;
    },
  },
  { field: "place", title: "Place", type: "numeric" },
  {
    field: "standings",
    title: "Standings",
    sorting: false,
  },
  {
    field: "rating",
    title: "Rating At Match End",
    type: "numeric",
  },
  {
    field: "points",
    title: "Points Won / Lost",
    type: "numeric",
    cellStyle: { textAlign: "center" },
    headerStyle: { textAlign: "right" },
  },
];
