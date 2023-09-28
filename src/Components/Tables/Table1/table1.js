import React, { useState } from "react";
import "./table1.css";
import customIcons from "../../../Icons/icons";
import NavSearch from "../../Search/NavSearch/navSearch";
import PropTypes from "prop-types";

function Table1({ data, columns, dropdownComponents, recordsPerPage, keys }) {
  const [currentPage, setCurrentPage] = useState(1);
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordsPerPage);

  const [searchInput, setSearchInput] = useState("");

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // console.log(data)

  return (
    <div className="holders incident">
      <div className="topIncident">
        <span className="itemTop">
          <span className="gridTitleBlack">Incidents</span>
          <NavSearch
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </span>
      </div>

      <div className="bottomIncident">
        <div className="statusOptions">
          {dropdownComponents.dropdownComp1}
          {dropdownComponents.dropdownComp2}
          {dropdownComponents.dropdownComp3}
        </div>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className="text-center align-middle"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="incidentTbody">
            {records
              .filter((item) =>
                keys.some((key) =>
                  item[key].toLowerCase().includes(searchInput)
                )
              )
              .map((item, i) => (
                <tr key={i}>
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={`incidentTdSmall text-center align-middle ${
                        column === "status" && item.status === "Open"
                          ? "red-bg"
                          : ""
                      }`}
                    >
                      {item[column.toLowerCase()]}
                    </td>
                  ))}
                  <td>
                    <customIcons.kebab />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="incedentFlexBottom">
          <div className="incidentNav">
            <div className="incidentFirstLastIndex">
              <p>{firstIndex + 1}</p>
              <p>-</p>
              <p>{Math.min(lastIndex, data.length)}</p>
              <p>of</p>
              <p>{data.length}</p>
            </div>
          </div>
          <div className="incidetPrevNext">
            <div className="prev" onClick={prevPage}>
              <customIcons.prev size={18} />
            </div>
            <div className="next" onClick={nextPage}>
              <customIcons.next size={18} />
            </div>
          </div>
        </div>
        <div className="recordsPerPage">
          <p>Records per page: {recordsPerPage}</p>
        </div>
      </div>
    </div>
  );
}

// Define prop types for type checking
Table1.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  dropdownComponents: PropTypes.object,
  recordsPerPage: PropTypes.number,
};

export default Table1;
