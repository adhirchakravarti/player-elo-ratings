import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import moment from "moment";

const useStyles = makeStyles({
  tooltip: {
    padding: "1rem",
  },
});

const ToolTipElement = ({ point }) => {
  const classes = useStyles();
  return (
    <Paper elevation={4} className={classes.tooltip}>
      <Typography variant="body2">
        Date: {moment(point.data.x).format("MM-DD-YY HH:mm:ss")}
      </Typography>
      <Typography variant="body2">Rating: {point.data.y}</Typography>
    </Paper>
  );
};

ToolTipElement.propTypes = {
  point: PropTypes.object,
};

const colorPicker = () => {
  const colors = [
    "red",
    "green",
    "blue",
    "brown",
    "darkslategray",
    "indigo",
    "lightblue",
    "orange",
  ];
  const pickColor = Math.floor(Math.random() * 8);
  return colors[pickColor];
};

const MyResponsiveLine = ({ data }) => {
  // console.log(data);
  return (
    <>
      {data && (
        <ResponsiveLine
          data={data}
          margin={{ top: 40, right: 110, bottom: 70, left: 70 }}
          xScale={{
            type: "time",
            format: "%m-%d-%Y %H:%M:%S",
            useUTC: false,
            precision: "second",
          }}
          // xFormat={(data) => {
          //   console.log(data);
          // }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            reverse: false,
          }}
          axisTop={null}
          axisRight={null}
          axisLeft={{
            legend: "Rating",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          axisBottom={{
            format: "%b %d",
            tickValues: 20,
            legend: "Time",
            legendPosition: "middle",
            legendOffset: 32,
          }}
          curve="natural"
          colors={{ scheme: "category10" }}
          // colors={colorPicker}
          pointSize={6}
          // pointColor={{ theme: labels.text.fill }}
          // pointColor="inherit"
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          crosshairType="cross"
          motionStiffness={120}
          useMesh={true}
          // enableSlices={false}
          tooltip={ToolTipElement}
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 80,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 16,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      )}
    </>
  );
};

MyResponsiveLine.propTypes = {
  // data: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     id: PropTypes.string,
  //     data: PropTypes.arrayOf(
  //       PropTypes.shape({ x: PropTypes.string, y: PropTypes.number })
  //     ),
  //   })
  // ),
  data: PropTypes.array,
};

export default MyResponsiveLine;
