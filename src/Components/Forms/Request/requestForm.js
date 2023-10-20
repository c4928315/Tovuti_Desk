import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import customIcons from "../../../Icons/icons";
import { BiCheck } from "react-icons/bi";
import "./requestForm.css";

const assetCategory = [
  {
    id: 1,
    Name: "Asset category 1",
  },
  {
    id: 2,
    Name: "Asset category 2",
  },
  {
    id: 3,
    Name: "Asset category 3",
  },
  {
    id: 4,
    Name: "Asset category 4",
  },
];

const options = [
  {
    id: 1,
    Name: "Asset category 1",
  },
  {
    id: 2,
    Name: "Asset category 2",
  },
  {
    id: 3,
    Name: "Asset category 3",
  },
  {
    id: 4,
    Name: "Asset category 4",
  },
  {
    id: 5,
    Name: "Asset category 5",
  },
];

function Request() {
  const [colors, setColors] = useState([false, false, false, false, false]);

  const navigate = useNavigate()

  const [selectedAsset, setSelectedAsset] = useState(assetCategory[0]);
  const [selectedLocation, setSelectedLocation] = useState(assetCategory[0]);
  const [selectedFault, setSelectedFault] = useState([]);
  const [Description, setDescription] = useState("");
  const [Recurrence, setRecurrence] = useState("notDefault");
  const [AttachedFiles, setAttachedFiles] = useState([]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setSelectedAsset(storedFormData.Asset);
      setSelectedLocation(storedFormData.Location);
      setSelectedFault(storedFormData.Fault);
      setDescription(storedFormData.Description);
      setRecurrence(storedFormData.Recurrence);
      setAttachedFiles(storedFormData.AttachedFiles);
    }
  }, []);

  useEffect(() => {
    const formData = {
      Asset: selectedAsset,
      Location: selectedLocation,
      Fault: selectedFault,
      Description,
      Recurrence,
      AttachedFiles,
    };
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [
    selectedAsset,
    selectedLocation,
    selectedFault,
    Description,
    Recurrence,
    AttachedFiles,
  ]);

  const [workOrderData, setWorkOrderData] = useState({
    Title: "Initial Title", // Replace with actual work order data
    Description: "Initial Description", // Replace with actual work order data
    // Add other properties here
  });

  const updateWorkOrder = (updatedData) => {
    // Update the work order data in the local state
    setWorkOrderData(updatedData);

    // Send an API request to update the work order data on the server
    fetch(`http://your-api-url/work-orders/${updatedData.id}`, {
      method: "PUT", // Use the appropriate HTTP method (e.g., PUT)
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Work Order updated successfully:", data);
        // Handle success, e.g., show a success message
        navigate("requests")
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
        // Handle errors, e.g., show an error message
      });
  };

  const changeColor = (index) => {
    const newColors = [...colors];
    newColors[index] = !newColors[index];
    setColors(newColors);
  };

  const handleAssetChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedAssetData = assetCategory.find(
      (option) => option.id === selectedId
    );
    setSelectedAsset(selectedAssetData);
  };

  const handleLocationChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedLocationData = assetCategory.find(
      (option) => option.id === selectedId
    );
    setSelectedLocation(selectedLocationData);
  };

  // const handleFaultChange = (e) => {
  //   const selectedValues = Array.from(e.target.selectedOptions, (option) => ({
  //     id: parseInt(option.value),
  //     Name: option.label,
  //   }));
  //   setSelectedFault(selectedValues);
  // };

  const handleFaultChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const isSelected = selectedFault.some((fault) => fault.id === selectedId);

    if (isSelected) {
      // If the option is already selected, remove it from the array
      setSelectedFault(
        selectedFault.filter((fault) => fault.id !== selectedId)
      );
    } else {
      // If the option is not selected, add it to the array
      const selectedOption = options.find((option) => option.id === selectedId);
      setSelectedFault([...selectedFault, selectedOption]);
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAttachedFiles(file);
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
        setData(data)
      })
      .catch((error) => {
        console.error("There was a problem with the network request:", error);
      });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const formData = {
      Asset: selectedAsset,
      Location: selectedLocation,
      Fault: selectedFault,
      Description,
      Recurrence,
      AttachedFiles,
    };

    postDataToAPI(formData);
    navigate("/requests")
  };

  return (
    <div className="commonPage container">
      <div className="">
        <div className="commonPageTop">
          <h3 className="pageTitle">New Request</h3>
          <div class="dropdown actionDropdown">
            <button
              class="btn btn-light dropdown-toggle actionBtn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to="/request-form"
                >
                  <customIcons.add style={{ color: "green" }} />
                  <span>New Request</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/requests">New Request</Link>
          <div className="dividerCommonPage"></div>
          <Link>Add New Request</Link>
        </div>
        <div className="commonPageBottom container">
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
                    <div className="formRowLeft">
                      <h3 className="requestHeader">select faulty asset</h3>
                      <select
                        data-te-select-init
                        data-te-select-clear-button="true"
                        className="requestSelect"
                        value={selectedAsset.id}
                        onChange={handleAssetChange}
                      >
                        {assetCategory.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.Name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="formRowRight">
                      <h3 className="requestHeader">where are you located</h3>
                      <select
                        data-te-select-init
                        data-te-select-clear-button="true"
                        className="requestSelect"
                        value={selectedLocation.id}
                        onChange={handleLocationChange}
                      >
                        {assetCategory.map((option) => (
                          <option
                            key={option.id}
                            value={option.id}
                            className="optionButtons"
                          >
                            {option.Name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="formRow">
                      <div className="formRowLeft">
                        <h3 className="requestHeader">select fault(s)</h3>
                        <div id="ck-button">
                          {options.map((option) => (
                            <label
                              key={option.id}
                              className={`checkboxLabel ${
                                selectedFault.some(
                                  (fault) => fault.id === option.id
                                )
                                  ? "checked"
                                  : ""
                              }`}
                            >
                              <input
                                type="checkbox"
                                value={option.id}
                                checked={selectedFault.some(
                                  (fault) => fault.id === option.id
                                )}
                                onChange={handleFaultChange}
                              />
                              <span>{option.Name}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                    <div className="formRowRight">
                      <h3 className="requestHeader">describe fault</h3>
                      <div class="form-floating">
                        <textarea
                          class="form-control faultTextArea"
                          id="floatingTextarea2"
                          value={Description}
                          onChange={handleDescriptionChange}
                        ></textarea>
                        <label
                          for="floatingTextarea2"
                          className="textareaLabel"
                        >
                          Describe
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="formRow">
                    <div className="formRowLeft">
                      <h3 className="requestHeader">recurrence</h3>
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
                            First Time Fault
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
                            Recurrent Fault
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="formRowRight">
                      <h3 className="requestHeader">upload file</h3>
                      <div class="input-group mb-3 faultFile">
                        <label
                          class="input-group-text attachFileLabel"
                          for="inputGroupFile02"
                        >
                          <customIcons.attach />
                        </label>
                        <input
                          type="file"
                          disabled
                          class="form-control attachFile"
                          id="inputGroupFile02"
                          onChange={handleFileChange}
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
