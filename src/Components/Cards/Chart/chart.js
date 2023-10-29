import React from "react";
import PropTypes from "prop-types";
import "./chart.css";
import DoughnutChart from "../../Charts/doughnutChart/doughnut";

function Chart({ data, text, dropdownComp}) {
  return (
    <div className="cardContainer">
      <span className="itemTop">
        <span className="gridTitle">{text}</span>
        <div className="chartDropdownComp">{dropdownComp}</div>
      </span>
      <div className="itemBottomChart">
        <DoughnutChart />
      </div>
    </div>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  dropdownText: PropTypes.string.isRequired,
  dropdownClassName: PropTypes.string,
  itemProperty: PropTypes.string,
};

export default Chart;
