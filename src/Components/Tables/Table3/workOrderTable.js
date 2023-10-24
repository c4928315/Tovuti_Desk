import React, { useEffect, useState } from "react";
import customIcons from "../../../Icons/icons";
import useFetch from "../../../Hooks/useFetch";
import "./workOrderTable.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function WorkOrderTable() {
  const navigate = useNavigate();
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [selectedFaults, setSelectedFaults] = useState([]);
  const [selectedStages, setSelectedStages] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selectedTicketType, setSelectedTicketType] = useState([]);


  const [statusSearch, setStatusSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [assetSearch, setAssetSearch] = useState("");
  const [faultSearch, setFaultSearch] = useState("");
  const [stageSearch, setStageSearch] = useState("");
  const [ticketTypeSearch, setTicketTypeSearch] = useState("");


  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showAssetFilter, setShowAssetFilter] = useState(false);
  const [showFaultFilter, setShowFaultFilter] = useState(false);
  const [showStageFilter, setShowStageFilter] = useState(false);
  const [showTicketTypeFilter, setTicketTypeFilter] = useState(false);

useEffect(() => {
  async function fetchData() {
    try {
      const response = await axios.get("https://intra-deco.onrender.com/workOrders");

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
const handleShowStageFilter = () => {
  setShowStageFilter(!showStageFilter);
};

const handleTicketTypeFilter = () => {
  setTicketTypeFilter(!showTicketTypeFilter);
};

  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState({
    TicketRef: "",
    TicketLocation: "",
    TicketAssets: "",
    TicketStage: "",
    TicketType: "",
    Id: 0,
    TicketStatus: "",
    DateCreated: "",
    Description: "",
    WorkOrder: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const statusOptions = ["Completed", "In Progress", "Pending", "Cancelled"];
  const stageOptions = ["Completed", "In Progress", "Pending", "Cancelled"];
  const locationOptions = ["nairobi", "Kisumu", "eldoret", "mombasa"];
  const typeOptions = ["maintenace", "Service Request", "Inspection", "IT Support", "Repair", "Facility Maintenance", "Recreation"];
  const assetOptions = [
    "Asset 1",
    "Asset 2",
    "Asset 3",
    "Asset 4",
    "Asset 5",
    "Asset 6",
  ];
  const faultOptions = [
    "paper jam",
    "engine stalling",
    "network issue",
    "not cooling",
  ];

  const filteredData = data.filter((item) => {
    return (
      (item.TicketRef.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.TicketLocation.LocationName.toLowerCase().includes(globalFilter.toLowerCase()) ||
        item.Description.toLowerCase().includes(globalFilter.toLowerCase())) &&

        ///remember to work on this change status to service for both lower an capitalised
      (selectedStatuses.length === 0 ||
        selectedStatuses.includes(item.TicketStatus.StatusName)) &&
        (selectedStages.length === 0 ||
          selectedStages.includes(item.TicketStage.StageName)) &&
          (selectedTicketType.length === 0 || selectedTicketType.includes(item.TicketType.TicketTypeName)) &&
          
        (selectedFaults.length === 0 ||
          selectedFaults.some((fault) =>
            item.Fault.some((f) => f.Name.toLowerCase() === fault.toLowerCase())
          )) &&
        (selectedLocations.length === 0 ||
          selectedLocations.some((location) =>
            item.TicketLocation.LocationName.toLowerCase() === location.toLowerCase()
          )) &&
        (selectedAssets.length === 0 ||
          selectedAssets.some((asset) =>
            item.TicketAssets.some((a) => a.AssetName.toLowerCase() === asset.toLowerCase())
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

  const handleStageSearch = (e) => {
    const searchValue = e.target.value;
    setStageSearch(searchValue);
  };


  const handleFaultSearch = (e) => {
    const searchValue = e.target.value;
    setFaultSearch(searchValue);
  };

  const handleTicketTypeSearch = (e) => {
    const searchValue = e.target.value;
    setTicketTypeSearch(searchValue);
  };


  
  const handleTicketTypeChange = (e) => {
    const ticketType = e.target.value;
    if (e.target.checked) {
      setSelectedTicketType([...selectedTicketType, ticketType]);
    } else {
      setSelectedTicketType(selectedTicketType.filter((selected) => selected !== ticketType));
    }
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

  const handleStageChange = (e) => {
    const stage = e.target.value;
    if (e.target.checked) {
      setSelectedStages([...selectedStages, stage]);
    } else {
      setSelectedStages(
        selectedStages.filter((selected) => selected !== stage)
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

  const filteredStageOptions = stageOptions.filter((stage) =>
    stage.toLowerCase().includes(stageSearch.toLowerCase())
  );

  const filteredTypeOptions = typeOptions.filter((type) =>
    type.toLowerCase().includes(ticketTypeSearch.toLowerCase())
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
    if (item.TicketStatus.StatusName === "Completed") {
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

{/* here */}

<div className="allFiltersContainer">
  <div onClick={handleTicketTypeFilter} className="filterIconStatement">
    <span>Type</span>
    <span>
      <customIcons.down
        className={showStageFilter ? "filterIconDropDown" : ""}
        size={14}
      />
    </span>
  </div>
  <div
    className={`statusFilter ${
      showTicketTypeFilter ? "statusFilterNoShow" : "statusFilterShow"
    }`}
  >
    <input
      type="text"
      placeholder="Search Stage"
      value={ticketTypeSearch}
      onChange={handleTicketTypeSearch}
    />
    <br />
    <div className="statusFilterAbsolute">
      {ticketTypeSearch && typeOptions.length > 0
        ? typeOptions.map((type) => (
            <label key={type} className="statusFilterBlock">
              <input
                type="checkbox"
                value={type}
                checked={selectedTicketType.includes(type)}
                onChange={handleTicketTypeChange}
              />
              {type}
            </label>
          ))
        : null}
      <br />
    </div>
  </div>
</div>



        <div className="allFiltersContainer">
          <div onClick={handleShowStageFilter} className="filterIconStatement">
            <span>stage</span>
            <span>
              <customIcons.down
                className={showStageFilter ? "filterIconDropDown" : ""}
                size={14}
              />
            </span>
          </div>
          <div
            className={`statusFilter ${
              showStageFilter ? "statusFilterNoShow" : "statusFilterShow"
            }`}
          >
            <input
              type="text"
              placeholder="Search Stage"
              value={stageSearch}
              onChange={handleStageSearch}
            />

            <br/>
            <div className="statusFilterAbsolute">
            {stageSearch && filteredStageOptions.length > 0
              ? filteredStageOptions.map((stage) => (
                  <label key={stage}>
                    <input
                      type="checkbox"
                      value={stage}
                      checked={selectedStages.includes(stage)}
                      onChange={handleStageChange}
                    />
                    {stage}
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
            <th>Due Date</th>
            <th>Work Ref</th>
            <th>Status</th>
            <th>Description</th>
            <th>Priority</th>
            <th>Assigned To</th>
            <th>Location</th>
            <th>Asset</th>
            <th>Last Update</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.Id} onClick={() => handleRowClick(item)}>
              <td className="tBodyTd">{item.DueDate}</td>
              <td className="tBodyTd">{item.TicketRef}</td>
              <td className="tBodyTd">{item.TicketStatus.StatusName}</td>
              <td className="tBodyTd">{item.TicketDescription}</td>
              <td className="tBodyTd">{item.TicketPriority.TicketPriorityName}</td>
              <td className="tBodyTd">{item.TicketCurrentTeam.CurrentAssignedTeamName}</td>
              <td className="tBodyTd">{item.TicketLocation.LocationName}</td>
              <td className="tBodyTd">
                {item.TicketAssets.map((asset) => asset.AssetName).join(", ")}
              </td>
              <td className="tBodyTd">{item.ModifiedDate}</td>
              <td className="tBodyTd">{item.DueDate}</td>
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

export default WorkOrderTable;
