import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customIcons from "../../../Icons/icons";
import { BiCheck } from "react-icons/bi";
import "./requestForm.css";
import useFetch from "../../../Hooks/useFetch";

const Locs = [
  {
    id: 1,
    LocationName: "Kenya",
  },
  {
    id: 2,
    LocationName: "Uganda",
  },
  {
    id: 3,
    LocationName: "Tanzania",
  },
];

const assts = [
  {
    id: 1,
    AsstName: "pump",
    assetLocationId: 2,
  },
  {
    id: 2,
    AsstName: "cooler",
    assetLocationId: 1,
  },
  {
    id: 3,
    AsstName: "regulator",
    assetLocationId: 2,
  },
];

const fault = [
  {
    id: 1,
    FaultName: "broken noozel",
    assetFaultId: 2,
  },
  {
    id: 2,
    FaultName: "busted regulator",
    assetFaultId: 1,
  },
];

function Request() {
  const [colors, setColors] = useState([false, false, false, false, false]);

  const { data: locations } = useFetch(
    "https://saharadeskrestapi.azurewebsites.net/api/Locations"
  );

  console.log();

  const navigate = useNavigate();

  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [selectedAssetId, setSelectedAssetId] = useState(null);
  const [selectedFaultIds, setSelectedFaultIds] = useState([]);

  const [Description, setDescription] = useState("");
  const [Recurrence, setRecurrence] = useState("notDefault");
  const [AttachedFiles, setAttachedFiles] = useState([]);
  const [assets, setAssets] = useState([]);
  const [faults, setFaults] = useState([]);

  const [locationSearchQuery, setLocationSearchQuery] = useState("");
  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const [assetSearchQuery, setAssetSearchQuery] = useState("");
  const [isAssetDropdownOpen, setAssetDropdownOpen] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedLocationId !== null) {
      // Fetch assets for the default location
      fetchAssetsForLocation(selectedLocationId);
    }
  }, [selectedLocationId]);



  const fetchAssetsForLocation = (locationId) => {
    // Fetch assets based on the selected location
    fetch(
      `https://saharadeskrestapi.azurewebsites.net/api/Assets/GetAssetsByLocation/${locationId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAssets(data);
        if (data.length === 0) {
          // No assets for this location, so clear the faults
          setFaults([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching assets:", error);
      });
  };

  const fetchFaultsForAsset = (assetId) => {
    // Fetch faults based on the selected asset
    fetch(
      `https://saharadeskrestapi.azurewebsites.net/api/Assets/GetFaultsByAsset/${assetId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Check if data is an array
          setFaults(data);
        } else {
          console.error("Faults data is not an array:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching faults:", error);
      });
  };

  const handleAssetChange = (e) => {
    const assetId = parseInt(e.target.value);
    setSelectedAssetId(assetId);
  };

  useEffect(() => {
    if (selectedAssetId !== null) {
      fetchFaultsForAsset(selectedAssetId);
    }
  }, [selectedAssetId]);


  console.log(AttachedFiles)


 

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setSelectedAssetId(storedFormData.Asset);
      setSelectedLocationId(storedFormData.Location);
      setSelectedFaultIds(storedFormData.Fault);
      setDescription(storedFormData.Description);
      setRecurrence(storedFormData.Recurrence);
      setAttachedFiles(storedFormData.AttachedFiles);
    }
  }, []);

  useEffect(() => {
    const formData = {
      Asset: selectedAssetId,
      Location: selectedLocationId,
      Fault: selectedFaultIds,
      Description,
      Recurrence,
      AttachedFiles,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    selectedAssetId,
    selectedLocationId,
    selectedFaultIds,
    Description,
    Recurrence,
    AttachedFiles,
  ]);

  const [workOrderData, setWorkOrderData] = useState({
    Title: "Initial Title", // Replace with actual work order data
    Description: "Initial Description", // Replace with actual work order data
    // Add other properties here
  });

  const changeColor = (index) => {
    const newColors = [...colors];
    newColors[index] = !newColors[index];
    setColors(newColors);
  };

  const handleLocationChange = (e) => {
    const locationId = parseInt(e.target.value);
    setSelectedLocationId(locationId);

    // Reset the selected asset to the first one available in the new location
    const assetsInNewLocation = assts.filter(
      (asset) => asset.assetLocationId === locationId
    );

    if (assetsInNewLocation.length > 0) {
      setSelectedAssetId(assetsInNewLocation[0].id);
      fetchFaultsForAsset(assetsInNewLocation[0].id); // Fetch faults for the first asset
    } else {
      setSelectedAssetId(null);
      setSelectedFaultIds([]); // Clear the selected faults
      setFaults([]); // Clear the faults when there are no assets
    }
  };

  const handleFaultChange = (e) => {
    const selectedFaultId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectedFaultIds([...selectedFaultIds, selectedFaultId]);
    } else {
      setSelectedFaultIds(
        selectedFaultIds.filter((id) => id !== selectedFaultId)
      );
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newFileNames = [];
  
    if (selectedFiles.length > 10) {
      alert("You can't select more than 10 files.");
      return; // Do not process the files if they exceed the limit.
    }
  
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.size > 2 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 2MB size limit.`);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result.split(',')[1]; // Extract base64 data
          newFileNames.push(base64Data);
          setAttachedFiles([...AttachedFiles, ...newFileNames]);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  
  
  
  

  const postDataToAPI = (formData) => {
    // Create an object with the additional data you want to add
    const additionalData = {
      RequestRef: "RequestRef9",
      Status: {
        StatusId: 9,
        Name: "In Progress",
      },
      WorkOrder: {
        Title: "Vertical Transport Repairs",
        Description:
          "Unstuck the elevator and improve the speed of the escalator",
        CategoryOfWork: {
          id: 9,
          Name: "Vertical Transport",
        },
        Priority: "Medium",
        AssignTeam: {
          id: 17,
          Name: "Elevator Rescue Team",
        },
        AssignAdditionalTeam: {
          id: 18,
          Name: "Escalator Efficiency Team",
        },
        TechnicianSignature: "True",
        Checklist: [
          {
            ChecklistId: 17,
            Name: "Elevator Stuck Troubleshooting",
          },
          {
            ChecklistId: 18,
            Name: "Escalator Speed Optimization",
          },
        ],
        AttachedFiles: [
          {
            FileId: 17,
            Name: "Elevator_Unstucking_Guide.pdf",
          },
          {
            FileId: 18,
            Name: "Escalator_Speed_Improvement.pdf",
          },
        ],
        CreatedBy: "Sophia Lee",
        DateCreated: "26/10/2023",
      },
    };

    // Transform the selectedFault data to match your desired format
    const transformedSelectedFault = formData.Fault.map((fault) => ({
      FaultId: fault.id,
      Name: fault.Name,
    }));

    // Transform the selectedAsset data into an array with one element
    const transformedSelectedAsset = [
      {
        AssetId: formData.Asset.id,
        Name: formData.Asset.Name,
      },
    ];

    // Transform the AttachedFiles data
    const transformedAttachedFiles = formData.AttachedFiles
      ? formData.AttachedFiles.map((file) => ({
          FileId: file.FileId,
          Name: file.Name,
        }))
      : [];

    // Create the final merged data
    const mergedData = {
      ...formData,
      ...additionalData,
      Fault: transformedSelectedFault,
      Asset: transformedSelectedAsset,
      AttachedFiles: transformedAttachedFiles,
    };

    fetch("https://intra-deco.onrender.com/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mergedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data posted successfully:", data);
        setData(data);
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
      });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const isRecurrentFault = Recurrence === "Recurrent Fault";

    const formData = {
      assetId: [selectedAssetId],
      locactionId: selectedLocationId,
      selectedFaults: selectedFaultIds,
      requestDetails: Description,
      recurrence: isRecurrentFault,
      images: AttachedFiles,
      createdBy: 6,
    };

    // postDataToAPI(formData);

    const response = await fetch(
      "https://saharadeskrestapi.azurewebsites.net/api/Requests/New",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log(response);

      // Handle success, reset the form, or perform any necessary actions
    } else {
      console.error("Error making the POST request");

      // Handle the error, such as displaying an error message
    }

    navigate("/requests");
  };

  const filteredLocations = locations.filter((option) =>
    option.locationName
      .toLowerCase()
      .includes(locationSearchQuery.toLowerCase())
  );

  return (
    <div className="allPagePosition">
      <div className="commonPage">
        <div className="commonPageTop">
          <h3 className="pageTitle">New Request</h3>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/requests">Request</Link>
          <div className="dividerCommonPage"></div>
          <Link>New Request</Link>
        </div>
        <div className="commonPageBottom">
          <h3 className="workOrderTitle">New Request</h3>
          <div className="formsCommonPageBottom">
            <ul className="nav nav-tabs formsUlTab" id="myTab" role="tablist">
              <li className="nav-item formsListTab" role="presentation">
                <div className="bulletPointRequest">
                  <BiCheck className="checkRequest" size={13} />
                </div>
                <button
                  className="nav-link active faultHomeTab"
                  id="home-tab onclick"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                >
                  Request Detail
                </button>
              </li>
            </ul>
            <div className="tab-content requestTab" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex="0"
              >
                <h4 className="workOrderEntry">Request Details</h4>

                <form onSubmit={handleFormSubmit}>
                  <div className="formRow">
                    <div className="formRowRight">
                      <h3 className="requestHeader">Where are you located?</h3>
                      <div className="selectNewContainer">
                        <div
                          className="custom-select dropdown-toggle requestDropDownNew"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() =>
                            setLocationDropdownOpen(!isLocationDropdownOpen)
                          }
                        >
                          <p className="customSelectOption">
                            {selectedLocationId
                              ? locations.find(
                                  (location) =>
                                    location.id === selectedLocationId
                                ).locationName
                              : "Select"}
                          </p>
                        </div>
                        <div className="custom-select-dropdown dropdown-menu requestDropDownNew">
                          <div className="search-container">
                            <input
                              type="text"
                              className="form-control search-input custom-search-input"
                              placeholder="Search Locations..."
                              value={locationSearchQuery}
                              onChange={(e) =>
                                setLocationSearchQuery(e.target.value)
                              }
                            />
                          </div>
                          <ul
                            className={`location-dropdown ${
                              isLocationDropdownOpen ? "open" : ""
                            }`}
                          >
                            {filteredLocations.map((option) => (
                              <li
                                key={option.id}
                                onClick={() => {
                                  setSelectedLocationId(option.id);
                                  setLocationDropdownOpen(false);
                                }}
                                className="dropdown-item"
                              >
                                {option.locationName}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="formRowLeft">
                      <h3 className="requestHeader">Select faulty Asset</h3>
                      <div className="selectNewContainer">
                        <div
                          className="custom-select dropdown-toggle "
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                          onClick={() =>
                            setAssetDropdownOpen(!isAssetDropdownOpen)
                          }
                        >
                          <p className="customSelectOption">
                            {selectedAssetId
                              ? assets.find(
                                  (asset) => asset.id === selectedAssetId
                                ).assetName
                              : "Select"}
                          </p>
                        </div>
                        <div className="custom-select-dropdown dropdown-menu requestDropDownNew">
                          <div className="search-container">
                            <input
                              type="text"
                              className="form-control search-input custom-search-input"
                              placeholder="Search Faulty Assets..."
                              value={assetSearchQuery}
                              onChange={(e) =>
                                setAssetSearchQuery(e.target.value)
                              }
                            />
                          </div>
                          <ul
                            className={`location-dropdown ${
                              isAssetDropdownOpen ? "open" : ""
                            }`}
                          >
                            {assets
                              .filter((asset) =>
                                asset.assetName
                                  .toLowerCase()
                                  .includes(assetSearchQuery.toLowerCase())
                              )
                              .map((option) => (
                                <li
                                  key={option.id}
                                  onClick={() => {
                                    setSelectedAssetId(option.id);
                                    setAssetDropdownOpen(false);
                                  }}
                                  className="dropdown-item"
                                >
                                  {option.assetName}
                                </li>
                              ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="formRow">
                    <div className="formRowLeft">
                      <h3 className="requestHeader">Select Fault(s)</h3>
                      <div id="ck-button">
                        {faults.map((fault) => (
                          <label
                            key={fault.id}
                            className={`checkboxLabel ${
                              selectedFaultIds.includes(fault.id)
                                ? "checked"
                                : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              value={fault.id}
                              checked={selectedFaultIds.includes(fault.id)}
                              onChange={handleFaultChange}
                            />
                            <span>{fault.faultName}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="formRowRight">
                      <h3 className="requestHeader">Describe Fault</h3>
                      <div class="form-floating">
                        <textarea
                          class="form-control faultTextArea"
                          id="floatingTextarea2"
                          value={Description}
                          onChange={handleDescriptionChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="formRow">
                    <div className="formRowLeft">
                      <h3 className="requestHeader">Recurrence</h3>
                      <div className="recurrences">
                        <div class="form-check recurrenceRadio">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="First Time Fault"
                            checked={Recurrence === "First Time Fault"}
                            onChange={handleRecurrenceChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault1"
                          >
                            First Time Fault?
                          </label>
                        </div>
                        <div class="form-check recurrenceRadio">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="Recurrent Fault"
                            checked={Recurrence === "Recurrent Fault"}
                            onChange={handleRecurrenceChange}
                          />
                          <label
                            class="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Recurrent Fault?
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="formRowRight">
                      <h3 className="requestHeader">Upload Files</h3>
                      <div class="input-group mb-3 faultFile">
                        <label
                          class="input-group-text attachFileLabel"
                          for="inputGroupFile02"
                        >
                          <customIcons.attach />
                        </label>
                        <input
                          type="file"
                          class="form-control attachFile"
                          id="inputGroupFile02"
                          onChange={handleFileChange}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="requestSubmit">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Request;

