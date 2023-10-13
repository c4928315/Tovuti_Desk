import React, { useState } from "react";
import "./table1.css";
import customIcons from "../../../Icons/icons";
import NavSearch from "../../Search/NavSearch/navSearch";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Table1({
  data,
  columns,
  recordsPerPage,
  keys,
  isLoading,
  text,
  textClass
}) {
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
    <div className="holders incident">
      <div className="topIncident">
        <span className="itemTop">
          {/* <span className="gridTitleBlack">{text}</span> */}
          <span className={textClass}>{text}</span>
          {/* <NavSearch
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          /> */}
        </span>
      </div>

      <div className="bottomIncident">
        <div className="filterSortDownloadAdd">
          <div className="filterSortDownloadAddLeft">
            <div className="filter">
              <span>filter</span>
              <span><customIcons.filter size={15}/></span>
            </div>
            <div className="sort">
              <span>sort</span>
              <span><customIcons.sort size={15}/></span>
            </div>
          </div>
          <div className="filterSortDownloadAddRight">
          <div className="download">
              <span><customIcons.download size={15} style={{marginBottom: "2px"}}/></span>
              <span>download CSV</span>
            </div>
            <div className="addData">
              <span><customIcons.formAdd size={15} style={{marginBottom: "2px"}}/></span>
              <span>add assets</span>
            </div>
          </div>
        </div>
        <table className="table">
          <thead className="thead-light-black align-middle">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`tH ${index === 0 ? 'first-column' : ''} ${index === columns.length - 1 ? 'last-column' : ''}`}
                >
                  {column}
                </th>
              ))}
              <th className="action align-middle">action</th>
            </tr>
          </thead>
          <tbody className="incidentTbody">
            {records.filter((item) =>
              keys.some((key) => item[key].toLowerCase().includes(searchInput))
            ).length === 0 ? (
              <tr className="searchNill">
                <td colSpan={columns.length + 1}>
                  No Such Item Found. &#128078;
                </td>
              </tr>
            ) : (
              records
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
                      className={`incidentTdSmall align-middle  ${
                        column === "Status" && item.status === "Open"
                          ? "red-bg"
                          : column === "Status" && item.status === "Closed"
                          ? "green-bg"
                          : column === "Status" && item.status === "Ongoing"
                          ? "orange-bg"
                          : ""
                      }`}
                    >
                      {index === 0  ? ( // Check if it's the first column
                        <li className="count">
                          <div className="list-style-square"></div>
                          <div className="tableData">
                            {item[column.toLowerCase()]}
                          </div>
                        </li>
                      ) : (
                        <div className="tableData">
                          {item[column.toLowerCase()]}
                        </div>
                      )}
                    </td>
                  ))}
                 <td className="tdAction">
                      <div class="dropdown">
                        <customIcons.kebab
                          class=" dropdown-toggle kebab-icon"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        />

                        <ul class="dropdown-menu">
                          <li>
                            <Link class="dropdown-item tdAction" href="#">
                              <customIcons.edit
                                style={{ color: "rgba(0, 128, 0, 0.8)" }}
                                size={19}
                              />
                              <span>Edit</span>
                            </Link>
                          </li>
                          <li>
                            <Link class="dropdown-item tdAction" href="#">
                              <customIcons.view
                                style={{ color: "rgba(255, 165, 0, 0.8)" }}
                                size={19}
                              />
                              <span>View</span>
                            </Link>
                          </li>
                          <li>
                            <Link class="dropdown-item tdAction" href="#">
                              <customIcons.delete
                                style={{ color: "rgba(235, 87, 87, 0.8)" }}
                                size={19}
                              />
                              <span>Delete</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                </tr>
                
                ))
            )}
          </tbody>
        </table>

        {records.filter((item) =>
          keys.some((key) => item[key].toLowerCase().includes(searchInput))
        ).length === 0 ? (
          <div></div>
        ) : (
          <>
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
          </>
        )}
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
  text: PropTypes.string,
  textClass: PropTypes.string,
};

export default Table1;
