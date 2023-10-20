import React, { useEffect, useState } from "react";
import customIcons from "../../../Icons/icons";
import useFetch from "../../../Hooks/useFetch";
import "./RequestTable.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function RequestTable() {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedFaults, setSelectedFaults] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [statusSearch, setStatusSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [assetSearch, setAssetSearch] = useState("");
  const [faultSearch, setFaultSearch] = useState("");


  const [showStatusFilter, setShowStatusFilter] = useState(false);
const [showLocationFilter, setShowLocationFilter] = useState(false);
const [showAssetFilter, setShowAssetFilter] = useState(false);
const [showFaultFilter, setShowFaultFilter] = useState(false);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get("https://intra-deco.onrender.com/requests");

      setData(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  fetchData();
}, [data]);

const handleShowStatusFilter = () => {
  setShowStatusFilter(!showStatusFilter);
};

const handleShowLocationFilter = () => {
  setShowLocationFilter(!showLocationFilter);
};

const handleShowAssetFilter = () => {
  setShowAssetFilter(!showAssetFilter);
};

const handleShowFaultFilter = () => {
  setShowFaultFilter(!showFaultFilter);
};

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

  const statusOptions = ["Completed", "In Progress", "Pending", "Cancelled"];
  const locationOptions = ["nairobi", "Kisumu", "eldoret", "mombasa"];
  const assetOptions = [
    "forklift",
    "pump",
    "refrigerator",
    "crane",
    "boat",
    "elevator",
  ];
  const faultOptions = [
    "paper jam",
    "engine stalling",
    "network issue",
    "not cooling",
  ];

  const filteredData = data.filter((item) => {
    return (
      (item.RequestRef.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.Location.Name.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.Description.toLowerCase().includes(globalFilter.toLowerCase())) &&

        ///remember to work on this change status to service for both lower an capitalised
      (selectedStatuses.length === 0 ||
        selectedStatuses.includes(item.Status.Name)) &&
        (selectedFaults.length === 0 ||
          selectedFaults.some((fault) =>
            item.Fault.some((f) => f.Name.toLowerCase() === fault.toLowerCase())
          )) &&
        (selectedLocations.length === 0 ||
          selectedLocations.some((location) =>
            item.Location.Name.toLowerCase() === location.toLowerCase()
          )) &&
        (selectedAssets.length === 0 ||
          selectedAssets.some((asset) =>
            item.Asset.some((a) => a.Name.toLowerCase() === asset.toLowerCase())
          ))
    );
  });

  const handleStatusSearch = (e) => {
    const searchValue = e.target.value;
    setStatusSearch(searchValue);
  };

  const handleLocationSearch = (e) => {
    const searchValue = e.target.value;
    setLocationSearch(searchValue);
  };

  const handleAssetSearch = (e) => {
    const searchValue = e.target.value;
    setAssetSearch(searchValue);
  };

  const handleFaultSearch = (e) => {
    const searchValue = e.target.value;
    setFaultSearch(searchValue);
  };

  const handleStatusChange = (e) => {
    const status = e.target.value;
    if (e.target.checked) {
      setSelectedStatuses([...selectedStatuses, status]);
    } else {
      setSelectedStatuses(
        selectedStatuses.filter((selected) => selected !== status)
      );
    }
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    if (e.target.checked) {
      setSelectedLocations([...selectedLocations, location]);
    } else {
      setSelectedLocations(
        selectedLocations.filter((selected) => selected !== location)
      );
    }
  };

  const handleAssetChange = (e) => {
    const asset = e.target.value;
    if (e.target.checked) {
      setSelectedAssets([...selectedAssets, asset]);
    } else {
      setSelectedAssets(
        selectedAssets.filter((selected) => selected !== asset)
      );
    }
  };

  const handleFaultChange = (e) => {
    const fault = e.target.value;
    if (e.target.checked) {
      setSelectedFaults([...selectedFaults, fault]);
    } else {
      setSelectedFaults(
        selectedFaults.filter((selected) => selected !== fault)
      );
    }
  };

  const filteredStatusOptions = statusOptions.filter((status) =>
    status.toLowerCase().includes(statusSearch.toLowerCase())
  );

  const filteredLocationOptions = locationOptions.filter((location) =>
    location.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const filteredAssetOptions = assetOptions.filter((asset) =>
    asset.toLowerCase().includes(assetSearch.toLowerCase())
  );

  const filteredFaultOptions = faultOptions.filter((fault) =>
    fault.toLowerCase().includes(faultSearch.toLowerCase())
  );

  const paginatedData = filteredData.slice(firstIndex, lastIndex);
  const nPages = Math.ceil(filteredData.length / recordsPerPage);
  const number = [...Array(nPages + 1).keys()].slice(1);

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
    if (item.Status.Name === "Completed") {
      navigate(`/details/${item.id}`);
    } else {
      navigate(`/detailsUnAp/${item.id}`);
    }
  };


  return (
    <div className="requestTable">
      <div className="topFilterContainer">
      <div className="filterInputContainer">
        <div className="allFiltersContainer">
          <div onClick={handleShowStatusFilter} className="filterIconStatement">
            <span>status</span>
            <span>
              <customIcons.down
                className={showStatusFilter ? "filterIconDropDown" : ""}
                size={14}
              />
            </span>
          </div>

          <div
            className={`statusFilter ${
              showStatusFilter ? "statusFilterNoShow" : "statusFilterShow"
            }`}
          >
            <input
              type="text"
              placeholder="Search Status"
              value={statusSearch}
              onChange={handleStatusSearch}
            />
            <br />
            <div className="statusFilterAbsolute">
              {statusSearch && filteredStatusOptions.length > 0
                ? filteredStatusOptions.map((status) => (
                    <label key={status} className="statusFilterBlock">
                      <input
                        type="checkbox"
                        value={status}
                        checked={selectedStatuses.includes(status)}
                        onChange={handleStatusChange}
                      />
                      {status}
                    </label>
                  ))
                : null}
              <br />
            </div>
          </div>
        </div>

        <div className="allFiltersContainer">
          <div onClick={handleShowLocationFilter} className="filterIconStatement">
            <span>location</span>
            <span>
              <customIcons.down
                className={showLocationFilter ? "filterIconDropDown" : ""}
                size={14}
              />
            </span>
          </div>
          <div
            className={`statusFilter ${
              showLocationFilter ? "statusFilterNoShow" : "statusFilterShow"
            }`}
          >
            <input
              type="text"
              placeholder="Search Location"
              value={locationSearch}
              onChange={handleLocationSearch}
            />

            <br/>
            <div className="statusFilterAbsolute">
            {locationSearch && filteredLocationOptions.length > 0
              ? filteredLocationOptions.map((location) => (
                  <label key={location}>
                    <input
                      type="checkbox"
                      value={location}
                      checked={selectedLocations.includes(location)}
                      onChange={handleLocationChange}
                    />
                    {location}
                  </label>
                  
                ))
              : null}
              </div>
              <br />
          </div>
        </div>

        {/* Asset filter */}
        <div className="allFiltersContainer">
          <div onClick={handleShowAssetFilter} className="filterIconStatement">
            <span>asset</span>
            <span>
              <customIcons.down
                className={showAssetFilter ? "filterIconDropDown" : ""}
                size={14}
              />
            </span>
          </div>
          <div
            className={`statusFilter ${
              showAssetFilter ? "statusFilterNoShow" : "statusFilterShow"
            }`}
          >
            <input
              type="text"
              placeholder="Search Asset"
              value={assetSearch}
              onChange={handleAssetSearch}
            />
            <br/>
            {assetSearch && filteredAssetOptions.length > 0
              ? filteredAssetOptions.map((asset) => (
                  <label key={asset}>
                    <input
                      type="checkbox"
                      value={asset}
                      checked={selectedAssets.includes(asset)}
                      onChange={handleAssetChange}
                    />
                    {asset}
                  </label>
                ))
              : null}
              <br/>
          </div>
        </div>

        <div className="allFiltersContainer">
          <div onClick={handleShowFaultFilter} className="filterIconStatement">
            <span>fault</span>
            <span>
              <customIcons.down
                className={showFaultFilter ? "filterIconDropDown" : ""}
                size={14}
              />
            </span>
          </div>
          <div
            className={`statusFilter ${
              showFaultFilter ? "statusFilterNoShow" : "statusFilterShow"
            }`}
          >
            <input
              type="text"
              placeholder="Search Fault"
              value={faultSearch}
              onChange={handleFaultSearch}
            />
            <br/>
            {faultSearch && filteredFaultOptions.length > 0
              ? filteredFaultOptions.map((fault) => (
                  <label key={fault}>
                    <input
                      type="checkbox"
                      value={fault}
                      checked={selectedFaults.includes(fault)}
                      onChange={handleFaultChange}
                    />
                    {fault}
                  </label>
                ))
              : null}
              <br/>
          </div>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search..."
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
