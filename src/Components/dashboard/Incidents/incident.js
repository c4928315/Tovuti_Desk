import React, { useState } from "react";
import "./incident.css";
import customIcons from "../../../Icons/icons";
import useFetch from "../../../Hooks/useFetch";
import NavSearch from "../../Search/NavSearch/navSearch";

function Incident({dropdownComp1, dropdownComp2, dropdownComp3}) {
  const { data } = useFetch("http://localhost:3001/incidents");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordsPerPage);

  const firstItem = firstIndex + 1
  const lastItem = records.length - 1

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

  return (
    <div className="incident">
      <div className="topIncident">
        <span className="itemTop">
          <span className="gridTitleBlack">Incidents</span>
          <NavSearch />
        </span>
      </div>

      <div className="bottomIncident">
        <div className="statusOptions">
        {dropdownComp1}
        {dropdownComp2}
        {dropdownComp3}
        </div>
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">Reference</th>
              <th scope="col">Location</th>
              <th scope="col">Vendor</th>
              <th scope="col">Date Created</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody className="incidentTbody">
            {records.map((item, i) => {
              const getStatusClassName = (status) => {
                switch (status) {
                  case "Open":
                    return "Open";
                  case "Closed":
                    return "Closed";
                  case "Ongoing":
                    return "Ongoing";
                  default:
                    return "default-class";
                }
              };
              const statusClassName = getStatusClassName(item.status);

              return (
                <tr key={i}>
                  <td className="incidentTd">
                    <li className={statusClassName}>
                      {item.reference}
                    </li>
                    <div className="incidentTdSmall">{item.description}</div>
                  </td>
                  <td className="incidentTdSmall">{item.location}</td>
                  <td className="incidentTdSmall">{item.vendor}</td>
                  <td className="incidentTdSmall">{item.date_created}</td>
                  <td className="incidentTdSmall">{item.status}</td>
                  <td>
                    <customIcons.kebab />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="incedentFlexBottom">
          <div className="incidentNav">
            <div className="incidentFirstLastIndex">
              <p>{firstIndex + 1}</p>
              <p>-</p>
              <p>{firstItem + lastItem}</p>
              <p>of</p>
              <p>{data.length}</p>
            </div>
          </div>
          <div className="incidetPrevNext">
            <div className="prev">
              <customIcons.prev onClick={prevPage}  size={18} style={{color: "#808080"}}/>
            </div>
            <div className="next">
              <customIcons.next onClick={nextPage} size={18}/>
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

export default Incident;
