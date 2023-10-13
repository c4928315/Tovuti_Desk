import React from "react";
import PropTypes from "prop-types";
import "./chart.css";
import DoughnutChart from "../../Charts/doughnutChart/doughnut";

function Chart({ data, text, dropdownComp, isLoading }) {
  return isLoading ? (
    <div class="lazyLoading">
      <div class="sound-wave">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  ) : (
    <div className="cardContainer">
      <span className="itemTop">
        <span className="gridTitle">{text}</span>
        {dropdownComp}
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
