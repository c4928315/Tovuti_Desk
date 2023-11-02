import React, { useEffect, useRef, useState } from "react";
import customIcons from "../../../Icons/icons";
import useFetch from "../../../Hooks/useFetch";
import "./RequestTable.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function RequestTable() {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState([]);
  const [selectedDateCreated, setSelectedDateCreated] = useState([]);
  const [selectedFaults, setSelectedFaults] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const [statusSearch, setStatusSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [assetSearch, setAssetSearch] = useState("");
  const [faultSearch, setFaultSearch] = useState("");
  const [createdBySearch, setCreatedBySearch] = useState("");
  const [dateCreatedSearch, setDateCreatedSearch] = useState("");

  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showCreatedByFilter, setShowCreatedByFilter] = useState(false);
  const [showDateCreatedFilter, setShowDateCreatedFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showAssetFilter, setShowAssetFilter] = useState(false);
  const [showFaultFilter, setShowFaultFilter] = useState(false);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  // async function fetchStatuses(requestId) {
  //   try {
  //     const response = await axios.get(
  //       `https://saharadeskrestapi.azurewebsites.net/api/Requests/GetRequestsByStatus/${requestId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching statuses: ", error);
  //     return [];
  //   }
  // }
  
  // async function fetchFaults(requestId) {
  //   try {
  //     const response = await axios.get(
  //       `https://saharadeskrestapi.azurewebsites.net/api/Requests/GetFaultsByAsset/${requestId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error("Error fetching faults: ", error);
  //     return [];
  //   }
  // }
  


  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://saharadeskrestapi.azurewebsites.net/api/Requests/GetAllRequests"
        );
  
        // Fetch statuses and faults for each request
        const requestsData = response.data;
  
        
        console.log(requestsData)
        setData(requestsData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
  
    fetchData();
  }, []);
  
  

  const handleShowStatusFilter = () => {
    setShowStatusFilter(!showStatusFilter);
  };

  const handleShowLocationFilter = () => {
    setShowLocationFilter(!showLocationFilter);
  };
  const handleShowCreatedByFilter = () => {
    setShowCreatedByFilter(!showCreatedByFilter);
  };
  const handleShowDateCreatedFilter = () => {
    setShowDateCreatedFilter(!showDateCreatedFilter);
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
  const createdByOptions = [
    "Chris Smith",
    "John Doe",
    "Alice Johnson",
    "Emily White",
    "Sarah Davis",
  ];
  const dateCreatedOptions = [
    "18/10/2023",
    "19/10/2023",
    "20/10/2023",
    "21/10/2023",
    "22/10/2023",
    "23/10/2023",
    "24/10/2023",
  ];
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
      (item.requestRef || item.requestRef.toLowerCase().includes(globalFilter.toLowerCase())) &&
      (item.location || item.locaction.locationName.toLowerCase().includes(globalFilter.toLowerCase())) &&
        // (item.requestDetails || item.requestDetails.toLowerCase().includes(globalFilter.toLowerCase())) &&
      // (selectedStatuses.length === 0 ||
      //   selectedStatuses.includes(item.Status.Name)) &&

      // (selectedFaults.length === 0 ||
      //   selectedFaults.some((fault) =>
      //     item.Fault.some((f) => f.Name.toLowerCase() === fault.toLowerCase())
      //   )) &&
      (selectedLocations.length === 0 ||
        selectedLocations.some(
          (location) =>
            item.locaction.locationName.toLowerCase() === location.toLowerCase()
         )) &&
      // (selectedAssets.length === 0 ||
      //   selectedAssets.some((asset) =>
      //     item.Asset.some((a) => a.Name.toLowerCase() === asset.toLowerCase())
      //   )) &&
      (selectedCreatedBy.length === 0 ||
        selectedCreatedBy.includes(item.createdByNavigation.userFirstName)) && // Filter for CreatedBy
      (selectedDateCreated.length === 0 ||
        selectedDateCreated.includes(item.createdDate))
    );
  });

  const handleStatusSearch = (e) => {
    const searchValue = e.target.value;
    setStatusSearch(searchValue);
  };
  const handleCreatedBySearch = (e) => {
    const searchValue = e.target.value;
    setCreatedBySearch(searchValue);
  };
  const handleDateCreatedSearch = (e) => {
    const searchValue = e.target.value;
    setDateCreatedSearch(searchValue);
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
  const handleCreatedByChange = (e) => {
    const by = e.target.value;
    if (e.target.checked) {
      setSelectedCreatedBy([...selectedCreatedBy, by]);
    } else {
      setSelectedCreatedBy(
        selectedCreatedBy.filter((selected) => selected !== by)
      );
    }
  };
  const handleDateCreatedChange = (e) => {
    const date = e.target.value;
    if (e.target.checked) {
      setSelectedDateCreated([...selectedDateCreated, date]);
    } else {
      setSelectedDateCreated(
        selectedDateCreated.filter((selected) => selected !== date)
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
  const filteredCreatedByOptions = createdByOptions.filter((by) =>
    by.toLowerCase().includes(createdBySearch.toLowerCase())
  );
  const filteredDateCreatedOptions = dateCreatedOptions.filter((created) =>
    created.toLowerCase().includes(dateCreatedSearch.toLowerCase())
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
    if (item.status.statusName === "Completed") {
      navigate(`/details/${item.id}`);
    } else {
      navigate(`/detailsUnAp/${item.id}`);
    }
  };

  const handleToggleFilter = (filterName) => {
    const filterState = {
      status: showStatusFilter,
      location: showLocationFilter,
      createdBy: showCreatedByFilter,
      dateCreated: showDateCreatedFilter,
      asset: showAssetFilter,
      fault: showFaultFilter,
    };

    for (const key in filterState) {
      filterState[key] = false;
    }

    filterState[filterName] = true;

    setShowStatusFilter(filterState.status);
    setShowLocationFilter(filterState.location);
    setShowCreatedByFilter(filterState.createdBy);
    setShowDateCreatedFilter(filterState.dateCreated);
    setShowAssetFilter(filterState.asset);
    setShowFaultFilter(filterState.fault);
  };

  const filterContainerRef = useRef();

  const handleClearFilters = (e) => {
    if (!filterContainerRef.current.contains(e.target)) {
      // Click occurred outside of filter controls
      setShowStatusFilter(false);
      setShowLocationFilter(false);
      setShowCreatedByFilter(false);
      setShowDateCreatedFilter(false);
      setShowAssetFilter(false);
      setShowFaultFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClearFilters);

    return () => {
      document.removeEventListener("click", handleClearFilters);
    };
  }, []);

  function formatDateToDdMmYy(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" });
  }
  

  return (
    <div className="requestTable">
      <div className="topFilterContainer" ref={filterContainerRef}>
        <div className="filterInputContainer">
          <div className="allFiltersContainer">
            <div
              className="filterIconStatement"
              onClick={() => handleToggleFilter('status')}
            >
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
            <div
              onClick={() => handleToggleFilter('dateCreated')}
              className="filterIconStatement"
            >
              <span>date created</span>
              <span>
                <customIcons.down
                  className={showDateCreatedFilter ? "filterIconDropDown" : ""}
                  size={14}
                />
              </span>
            </div>
            <div
              className={`statusFilter ${
                showDateCreatedFilter ? "statusFilterNoShow" : "statusFilterShow"
              }`}
            >
              <input
                type="text"
                placeholder="Search Location"
                value={dateCreatedSearch}
                onChange={handleDateCreatedSearch}
              />

              <br />
              <div className="statusFilterAbsolute">
                {dateCreatedSearch && filteredDateCreatedOptions.length > 0
                  ? filteredDateCreatedOptions.map((date) => (
                      <label key={date}>
                        <input
                          type="checkbox"
                          value={date}
                          checked={selectedDateCreated.includes(date)}
                          onChange={handleDateCreatedChange}
                        />
                        {date}
                      </label>
                    ))
                  : null}
              </div>
              <br />
            </div>
          </div>

          <div className="allFiltersContainer">
            <div
              onClick={() => handleToggleFilter('createdBy')}
              className="filterIconStatement"
            >
              <span>created by</span>
              <span>
                <customIcons.down
                  className={showCreatedByFilter ? "filterIconDropDown" : ""}
                  size={14}
                />
              </span>
            </div>
            <div
              className={`statusFilter ${
                showCreatedByFilter ? "statusFilterNoShow" : "statusFilterShow"
              }`}
            >
              <input
                type="text"
                placeholder="Search Location"
                value={createdBySearch}
                onChange={handleCreatedBySearch}
              />

              <br />
              <div className="statusFilterAbsolute">
                {createdBySearch && filteredCreatedByOptions.length > 0
                  ? filteredCreatedByOptions.map((by) => (
                      <label key={by}>
                        <input
                          type="checkbox"
                          value={by}
                          checked={selectedCreatedBy.includes(by)}
                          onChange={handleCreatedByChange}
                        />
                        {by}
                      </label>
                    ))
                  : null}
              </div>
              <br />
            </div>
          </div>

          <div className="allFiltersContainer">
            <div
              onClick={() => handleToggleFilter('location')}
              className="filterIconStatement"
            >
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

              <br />
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
            <div
              onClick={() => handleToggleFilter('asset')}
              className="filterIconStatement"
            >
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
              <br />
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
              <br />
            </div>
          </div>

          <div className="allFiltersContainer">
            <div
              onClick={() => handleToggleFilter('fault')}
              className="filterIconStatement"
            >
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
              <br />
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
              <br />
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

      <table onClick={handleClearFilters}>
        <thead>
          <tr>
            <th>Request Ref</th>
            {/* <th>Status</th> */}
            <th>Location</th>
            {/* <th>Fault</th> */}
            <th>Fault Description</th>
            <th>Asset</th>
            <th>Submitted By</th>
            {/* <th>Work Order</th> */}
            <th>Date Submitted</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id} onClick={() => handleRowClick(item)}>
              <td className="tBodyTd">{item.requestRef}</td>
              {/* <td className="tBodyTd">{item.Status.Name}</td> */}
              <td className="tBodyTd">{item.locaction.locationName}</td>
              {/* <td className="tBodyTd">
                {item.Fault.map((fault) => fault.Name).join(", ")}
              </td> */}
              <td className="tBodyTd">{item.requestDetails}</td>
              <td className="tBodyTd">
                {item.requestAssets.map((a) => a.asset.assetName)}
              </td>
              <td className="tBodyTd">{item.createdByNavigation.userFirstName} {item.createdByNavigation.userLastName}</td>
              {/* <td className="tBodyTd">{item.WorkOrder.Title}</td> */}
              <td className="tBodyTd">{formatDateToDdMmYy(item.createdDate)}</td>

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
