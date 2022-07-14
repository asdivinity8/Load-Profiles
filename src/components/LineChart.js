import React from "react";
import PropTypes from "prop-types";

const STROKE = 1;

const LineChart = ({
  data,
  height,
  width,
  horizontalGuides: numberOfHorizontalGuides,
  verticalGuides: numberOfVerticalGuides,
  precision
}) => {

  const FONT_SIZE = width / 50;
  let xAxis = data.chunked_time_series.x_axis;
  let yAxis = data.chunked_time_series.days[0].values;
  const maximumXFromData = Math.max(...xAxis);
  const maximumYFromData = Math.max(...yAxis);

  const digits =
    parseFloat(maximumYFromData.toString()).toFixed(precision).length + 1;

  const padding = (FONT_SIZE + digits) * 2;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  // creating array of objects containing x and y data
  let dataPoints = [];
  xAxis.forEach((x,index) => {
    dataPoints.push({x:x, y: yAxis[index]}) ;
  });

  // converting the data points to x and y co-ordinates for plotting
  const points = dataPoints
    .map(element => {
      const x = (element.x / maximumXFromData) * chartWidth + padding;
      const y =
        chartHeight - (element.y / maximumYFromData) * chartHeight + padding;
      return `${x},${y}`;
    })
    .join(" ");

  // component for drawing the X and Y axis 
  const Axis = ({ points }) => (
    <polyline fill="none" stroke="#ccc" strokeWidth=".5" points={points} />
  );

  // plotting X axis
  const XAxis = () => (
    <Axis
      points={`${padding},${height - padding} ${width - padding},${height -
        padding}`}
    />
  );

  // plotting Y axis
  const YAxis = () => (
    <Axis points={`${padding},${padding} ${padding},${height - padding}`} />
  );

  // component for drawing the vertical guides
  const VerticalGuides = () => {
    const guideCount = numberOfVerticalGuides || dataPoints.length - 1;

    const startY = padding;
    const endY = height - padding;

    return new Array(guideCount).fill(0).map((_, index) => {
      const ratio = (index + 1) / guideCount;

      const xCoordinate = padding + ratio * (width - padding * 2);

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke="#ccc"
            strokeWidth=".5"
            points={`${xCoordinate},${startY} ${xCoordinate},${endY}`}
          />
        </React.Fragment>
      );
    });
  };

  // component for drawing the horizontal guides
  const HorizontalGuides = () => {
    const startX = padding;
    const endX = width - padding;

    return new Array(numberOfHorizontalGuides).fill(0).map((_, index) => {
      const ratio = (index + 1) / numberOfHorizontalGuides;

      const yCoordinate = chartHeight - chartHeight * ratio + padding;

      return (
        <React.Fragment key={index}>
          <polyline
            fill="none"
            stroke={"#ccc"}
            strokeWidth=".5"
            points={`${startX},${yCoordinate} ${endX},${yCoordinate}`}
          />
        </React.Fragment>
      );
    });
  };

  // function to render the X-axis labels
  const LabelsXAxis = () => {
    const y = height - padding + FONT_SIZE * 2;

    return dataPoints.map((element, index) => {
      const x =
        (element.x / maximumXFromData) * chartWidth + padding - FONT_SIZE / 2;
        if(index % 5 === 0) {
          return (
            <text
              key={index}
              x={x}
              y={y}
              style={{
                fill: "#808080",
                fontSize: "10px",
                fontFamily: "Helvetica"
              }}
            >
              {`${parseInt(element.x/60)}:${element.x%60 === 0 ? '00' : element.x%60 }`}
            </text>
          );
        }
      
    });
  };

  // function to render the Y-axis labels
  const LabelsYAxis = () => {
    const PARTS = numberOfHorizontalGuides;
    const yPointers = [0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5];
    return new Array(PARTS + 1).fill(0).map((_, index) => {
      const x = FONT_SIZE;
      const ratio = index / numberOfHorizontalGuides;

      const yCoordinate =
        chartHeight - chartHeight * ratio + padding + FONT_SIZE / 2;
      return (
        <text
          key={index}
          x={x}
          y={yCoordinate}
          style={{
            fill: "#808080",
            fontSize: "10px",
            fontFamily: "Helvetica"
          }}
        >
          { index === 0 ? yPointers[index] : yPointers[index] + 'k'}
        </text>
      );
    });
  };

  // rendering the complete graph
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
    >
     <XAxis />
      <LabelsXAxis />
      <LabelsYAxis />
      {numberOfVerticalGuides && <VerticalGuides />}
      <HorizontalGuides />
      <polyline
        fill="none"
        stroke="#102d4c"
        strokeWidth={STROKE}
        points={points}
      />
    </svg>
  );
};

LineChart.defaultProps = {
  height: 200,
  width: 500,
  horizontalGuides: 4,
  verticalGuides: null,
  precision: 2
};

LineChart.propTypes = {
  data: PropTypes.objectOf(
    PropTypes.shape({
      value: PropTypes.number,
      name: PropTypes.string
    })
  ).isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
  horizontalGuides: PropTypes.number,
  verticalGuides: PropTypes.number,
  precision: PropTypes.number
};

export default LineChart;