import React, { useState } from "react";
import customIcons from "../../../Icons/icons";
import useFetch from "../../../Hooks/useFetch";
import "./RequestTable.css";
import { Link, useNavigate } from "react-router-dom";

function RequestTable() {
  const navigate = useNavigate();
  const { data } = useFetch("https://intra-deco.onrender.com/requests");

  console.log(data);


  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    RequestRef: "",
    Location: "",
    Asset: "",
    Fault: "",
    Id: 0,
    Status: "",
    DateCreated: "",
    Description: "",
    WorkOrder: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const filteredData = data.filter((item) => {
    const globalFilterMatch = Object.values(item).some((value) =>
    String(value).toLowerCase().includes(globalFilter.toLowerCase())
  );

  const requestRefFilterMatch = item.RequestRef.toLowerCase().includes(
    columnFilters.RequestRef.toLowerCase()
  );

  const descriptionFilterMatch = item.Description.toLowerCase().includes(
    columnFilters.Description.toLowerCase()
  );


  const statusFilterMatch = item.Status.Name.toLowerCase().includes(
    columnFilters.Status.toLowerCase()
  );

  const locationFilterMatch = item.Location.Name.toLowerCase().includes(
    columnFilters.Location.toLowerCase()
  );

  const faultFilterMatch = item.Fault.some((i) =>
    i.Name.toLowerCase().includes(columnFilters.Fault.toLowerCase())
  );

  const assetFilterMatch = item.Fault.some((i) =>
    i.Name.toLowerCase().includes(columnFilters.Asset.toLowerCase())
  );


  const workOrderFilterMatch = item.WorkOrder.Title.toLowerCase().includes(
    columnFilters.WorkOrder.toLowerCase()
  );

 

  return (
    globalFilterMatch &&
    statusFilterMatch &&
    workOrderFilterMatch &&
    faultFilterMatch &&
    assetFilterMatch &&
    locationFilterMatch &&
    descriptionFilterMatch &&
    requestRefFilterMatch
  );
});
  

  const paginatedData = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  const number = [...Array(nPages + 1).keys()].slice(1);

  console.log(paginatedData);

  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1);
    }
  };



  const handleRowClick = (item) => {
    console.log(item);

    if (item.Status.Name === "Completed") {
      navigate(`/details/${item.id}`);
    } else {
      navigate(`/detailsUnAp/${item.id}`);
    }
  };

  return (
    <div className="requestTable">
      <div className="searchFilterContainer">
      <div
          className="filterInputContainer"
        >
          <input
            type="text"
            className="filterInput inputFilter1"
            placeholder="request ref"
            value={columnFilters.RequestRef}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                RequestRef: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="description"
            className="filterInput inputFilter2"
            value={columnFilters.Description}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                Description: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="location"
            className="filterInput inputFilter3"
            value={columnFilters.Location}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                Location: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="asset"
            className="filterInput inputFilter4"
            value={columnFilters.Asset}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                Asset: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="fault"
            className="filterInput inputFilter5"
            value={columnFilters.Fault}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                Fault: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="recurrence"
            className="filterInput inputFilter6"
            value={columnFilters.Recurrence}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                Recurrence: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="status"
            className="filterInput inputFilter7"
            value={columnFilters.Status}
            onChange={(e) =>
              setColumnFilters({
                ...columnFilters,
                Status: e.target.value,
              })
            }
          />
        </div>

        <input
          type="text"
          placeholder="search..."
          className="globalSearch"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
        
      </div>
      <table>
  <thead>
    <tr>
      <th>Request Ref</th>
      <th>Status</th>
      <th>Location</th>
      <th>Fault</th>
      <th>Asset</th>
      <th>Fault Description</th>
      <th>Submitted By</th>
      <th>Work Order</th>
      <th>Date Submitted</th>
    </tr>
  </thead>
  <tbody>
    {paginatedData.map((item) => (
      <tr key={item.Id} onClick={() => handleRowClick(item)}>
        <td className="tBodyTd">{item.RequestRef}</td>
        <td className="tBodyTd">{item.Status.Name}</td>
        <td className="tBodyTd">{item.Location.Name}</td>
        <td className="tBodyTd">
          {item.Fault.map((fault) => fault.Name).join(", ")}
        </td>
        <td className="tBodyTd">
          {item.Asset.map((asset) => asset.Name).join(", ")}
        </td>
        <td className="tBodyTd">{item.Description}</td>
        <td className="tBodyTd">{item.CreatedBy}</td>
        <td className="tBodyTd">{item.WorkOrder.Title}</td>
        <td className="tBodyTd">{item.DateCreated}</td>
      </tr>
    ))}
  </tbody>
</table>

      <nav className="paginationNav">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" onClick={prevPage}>
              <customIcons.prev size={24} />
            </Link>
          </li>

          {number.map((n, i) => (
            <li
              className={`page-item numbers ${
                currentPage === n ? "activeNav" : ""
              }`}
              key={i}
            >
              <Link className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </Link>
            </li>
          ))}
          <li className="page-item paginationIcon">
            <Link className="page-link" onClick={nextPage}>
              <customIcons.next size={24} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default RequestTable;
