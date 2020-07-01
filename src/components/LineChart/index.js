import React from "react";
import PropTypes from "prop-types";
import { ResponsiveLine } from "@nivo/line";
import {
  makeStyles,
  Paper,
  Typography,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";
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

const MyResponsiveLine = ({ data }) => {
  const theme = useTheme();
  const xtraSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      {data && (
        <ResponsiveLine
          data={data}
          margin={{
            top: 40,
            right: xtraSmall ? 60 : small ? 70 : 80,
            bottom: 70,
            left: 70,
          }}
          xScale={{
            type: "time",
            format: "%m-%d-%Y %H:%M:%S",
            useUTC: false,
            precision: "second",
          }}
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
            legendOffset: -50,
          }}
          axisBottom={{
            format: "%b %d",
            legend: "Time",
            legendPosition: "middle",
            legendOffset: 40,
          }}
          curve="natural"
          colors={{ scheme: "category10" }}
          pointSize={6}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="y"
          pointLabelYOffset={-12}
          crosshairType="cross"
          motionStiffness={120}
          useMesh={true}
          tooltip={ToolTipElement}
          legends={[
            {
              anchor: "top",
              direction: "column",
              justify: false,
              translateX: 0,
              translateY: -30,
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      data: PropTypes.arrayOf(
        PropTypes.shape({ x: PropTypes.string, y: PropTypes.number })
      ),
    })
  ),
};

export default MyResponsiveLine;
