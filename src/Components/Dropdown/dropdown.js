import React from "react";
import PropTypes from "prop-types";

function Dropdown({ text, data, gridStatusSelect }) {
  return (
    <div>
      <div className={gridStatusSelect}>
        <p>{text}</p>
        <select
          className="form-select form-select-sm grid-select"
          aria-label=".form-select-sm example"
        >
          <option value="1">All</option>
          <option value="2">Open</option>
          <option value="3">Closed</option>
          <option value="4">Pending</option>
        </select>
      </div>
    </div>
  );
}

Dropdown.propTypes = {
  text: PropTypes.string,
};

export default Dropdown;
