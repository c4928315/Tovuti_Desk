import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import customIcons from "../../Icons/icons";
import "./steps.css";
import axios from "axios";
import { Link } from "react-router-dom";

const teamOptions = [
  { TeamId: 1, TeamName: "One" },
  { TeamId: 2, TeamName: "Two" },
  { TeamId: 3, TeamName: "Three" },
];

const priorities = [
  {
    TicketPriorityId: 1,
    TicketPriorityName: "Low",
  },
  {
    TicketPriorityId: 2,
    TicketPriorityName: "Medium",
  },
  {
    TicketPriorityId: 3,
    TicketPriorityName: "High",
  },
  {
    TicketPriorityId: 4,
    TicketPriorityName: "Criticle",
  },
];

const checklists = [
  {
    FormsAndSectionsId: 1,
    FormsAndSectionsName: "Pump Calibaration Checklist",
  },
  {
    FormsAndSectionsId: 2,
    FormsAndSectionsName: "Laptops Checklist",
  },
  {
    FormsAndSectionsId: 3,
    FormsAndSectionsName: "Compressor Checklist",
  },
  {
    FormsAndSectionsId: 4,
    FormsAndSectionsName: "Generators Checklist",
  },
  {
    FormsAndSectionsId: 5,
    FormsAndSectionsName: "Engine Checklist",
  },
];

function NewWorkOrder() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeTab, setActiveTab] = useState(true);
  const [activeTab2, setActiveTab2] = useState(false);
  const [showParts, setShowParts] = useState(false);

  const [editData, setEditData] = useState(null);
  const [partData, setPartData] = useState([]);
  const [formData, setFormData] = useState({
    part: "",
    quantity: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  const handleShowParts = () => {
    setShowParts(!showParts);
  };

  const handleEdit = (item) => {
    setEditData(item); // Store the data being edited
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://intra-deco.onrender.com/Parts"
        );

        setPartData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [partData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform a POST request to your server to add the data
    try {
      const response = await fetch("https://intra-deco.onrender.com/Parts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newData = await response.json();

        // Update the state with the new data
        setPartData([...partData, newData]);

        // Clear the form
        setFormData({ part: "", quantity: "", amount: "" });
        setShowParts(!showParts);
      } else {
        console.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTabState = () => {
    setActiveTab(!activeTab);
    setActiveTab2(!activeTab2);
  };

  const handleCheckboxChanges = (option) => {
    setCheckedItems((prevItems) => ({
      ...prevItems,
      [option]: !prevItems[option],
    }));
  };

  const handleAssetCheckboxChange = (assets) => {
    const { asset } = userData;

    const updatedasset = asset.includes(assets)
      ? asset.filter((selectedAsset) => selectedAsset !== assets)
      : [...asset, assets];

    setUserData({ ...userData, asset: updatedasset });
  };

  const handleCheckboxChange = (option) => {
    console.log("Clicked option:", option);

    const selectedFeatures = userData.features || [];
    if (selectedFeatures.includes(option)) {
      setUserData({
        ...userData,
        features: selectedFeatures.filter(
          (selectedFeature) => selectedFeature !== option
        ),
      });
    } else {
      setUserData({
        ...userData,
        features: [...selectedFeatures, option],
      });
    }
  };

  const handleTicketCurrentTeamChange = (e) => {
    const teamName = e.target.options[e.target.selectedIndex].text;
    setUserData({
      ...userData,
      TicketCurrentTeam: {
        CurrentAssignedTeamId: e.target.value,
        CurrentAssignedTeamName: teamName,
      },
    });
  };

  const handleTeamCheckboxChange = (teamId) => {
    if (userData.TicketAdditionalTeams.some((team) => team.TeamId === teamId)) {
      // If the team is already selected, remove it from the array
      setUserData({
        ...userData,
        TicketAdditionalTeams: userData.TicketAdditionalTeams.filter(
          (team) => team.TeamId !== teamId
        ),
      });
    } else {
      // If the team is not selected, add it to the array
      const selectedTeam = teamOptions.find((team) => team.TeamId === teamId);
      setUserData({
        ...userData,
        TicketAdditionalTeams: [
          ...userData.TicketAdditionalTeams,
          selectedTeam,
        ],
      });
    }
  };

  const handlePrioritySelection = (priority) => {
    setUserData({
      ...userData,
      TicketPriority: {
        TicketPriorityId: priority.TicketPriorityId,
        TicketPriorityName: priority.TicketPriorityName,
      },
    });
  };

  const handleChecklistChange = (checklistId) => {
    // Check if the checklistId is already in the array
    const isChecked = userData.TicketChecklistForms.some(
      (form) => form.FormsAndSectionsId === checklistId
    );

    if (isChecked) {
      // Remove the checklist if already checked
      const updatedChecklist = userData.TicketChecklistForms.filter(
        (form) => form.FormsAndSectionsId !== checklistId
      );

      setUserData({
        ...userData,
        TicketChecklistForms: updatedChecklist,
      });
    } else {
      // Add the checklist if not checked
      const selectedChecklist = checklists.find(
        (checklist) => checklist.FormsAndSectionsId === checklistId
      );

      setUserData({
        ...userData,
        TicketChecklistForms: [
          ...userData.TicketChecklistForms,
          selectedChecklist,
        ],
      });
    }
  };

  const handleDeletePart = async (partToDelete) => {
    try {
      // Make an API request to delete the item
      await axios.delete(
        `https://intra-deco.onrender.com/Parts/${partToDelete.id}`
      );

      // If the API request is successful, remove the part from the local state
      const updatedPartData = partData.filter(
        (item) => item.id !== partToDelete.id
      );
      setPartData(updatedPartData);
    } catch (error) {
      console.error("Error deleting part:", error);
      // Handle the error, e.g., show an error message to the user
    }
  };

  const handleUpdate = async () => {
    // Send an HTTP PUT request to update the data on the API
    try {
      const response = await axios.put(
        `https://intra-deco.onrender.com/Parts/${editData.id}`,
        {
          part: editData.part,
          quantity: editData.quantity,
          amount: editData.amount,
          // Include other fields as needed
        }
      );

      if (response.status === 200) {
        // Update the data in your component's state if the API update was successful
        setPartData((prevData) =>
          prevData.map((item) => (item.id === editData.id ? editData : item))
        );
        // Clear the edit data
        setEditData(null);
      } else {
        console.error("Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleChecklistItemDelete = (item) => {
    // Filter out the item to be deleted
    const updatedChecklist = userData.TicketChecklistForms.filter(
      (form) => form.FormsAndSectionsId !== item.FormsAndSectionsId
    );

    // Update the userData with the new checklist
    setUserData({
      ...userData,
      TicketChecklistForms: updatedChecklist,
    });
  };

  //CHECKLIST SEARCH

  const handleChecklistRadioChange = (checklistId) => {
    const selectedChecklist = checklists.find(
      (checklist) => checklist.FormsAndSectionsId === checklistId
    );
    setUserData({
      ...userData,
      TicketChecklistForms: [selectedChecklist], // Use an array to hold the selected checklist
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredChecklists, setFilteredChecklists] = useState(checklists);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredList = checklists.filter((checklist) => {
      return checklist.FormsAndSectionsName.toLowerCase().includes(
        searchTerm.toLowerCase()
      );
    });
    setFilteredChecklists(filteredList);
  };

  //CHECKLIST SEARCH

  //ADDITIONAL TEAMS SEARCH

  const [filteredTeamOptions, setFilteredTeamOptions] = useState(teamOptions);

  const handleAdditionalSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredList = teamOptions.filter((team) => {
      return team.TeamName.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredTeamOptions(filteredList);
  };

  //ADDITIONAL TEAMS SEARCH

  return (
    <div className="WORKorderContainerMAIN">
      <h4 className="WORKorderContainerMAINH4Top">Work Order Details</h4>
      <nav>
        <div
          className="nav nav-tabs nav-tabs-newWo"
          id="nav-tab"
          role="tablist"
        >
          <button
            className="nav-link active newWOTabs"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
            onClick={handleTabState}
          >
            <span
              className={`stepLabelPointer ${
                activeTab ? "backgroundOrange" : ""
              }`}
            >
              <customIcons.check
                className={`stepIconAbsolute ${
                  !activeTab ? "checkWhite" : "hiddenPointer"
                }`}
              />
            </span>
            <span>One Work Order for All Assets</span>
          </button>
          <button
            className="nav-link newWOTabs"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
            onClick={handleTabState}
          >
            <span
              className={`stepLabelPointer ${
                !activeTab2 ? "" : "backgroundOrange"
              }`}
            >
              <customIcons.check
                className={`stepIconAbsolute ${
                  activeTab ? "checkWhite" : "hiddenPointer"
                }`}
              />
            </span>
            <span>One Work Order Per Asset</span>
          </button>
        </div>
      </nav>
      <div className="tab-content " id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
          tabIndex="0"
        >
          <div className="newWorkOrder">
            <div className="newWorkOrderCells">
              <div className="mb-3">
                <p className="form-label-newWO">Work Order Title</p>
                <input
                  type="text"
                  className="form-control newWorkOrderInput"
                  id="formGroupExampleInput"
                  value={userData.TicketTitle}
                  onChange={(e) =>
                    setUserData({ ...userData, TicketTitle: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <p className="form-label-newWO">Description</p>
                <input
                  type="text"
                  className="form-control newWorkOrderInput"
                  id="formGroupExampleInput2"
                  value={userData.TicketDescription}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      TicketDescription: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="newWorkOrderCells">
              <div>
                <p className="form-label-newWO">Category Of Work</p>
                <div className="selectNewContainerWO2">
                  <select
                    className="form-select newWorkOrderSelectStep2"
                    aria-label="Default select example"
                    value={userData.categoryOfWork}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        categoryOfWork: e.target.value,
                      })
                    }
                    style={{
                      color: "#C5C7CD",
                    }}
                  >
                    <option selected>select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <customIcons.down
                    className="selectNewIcon selectNewIconWO"
                    size={13}
                  />
                </div>
              </div>

              <div className="priorityMain">
                <p className="form-label-newWO">Priority</p>
                <div className="selectNewContainerWO2">
                  <div className="newWorkOrderCellsCheckBox">
                    {/* fbu4hfu4hi */}
                    <div className="priorities">
                      {priorities.map((priority) => (
                        <Button
                          key={priority.TicketPriorityId}
                          onClick={() => handlePrioritySelection(priority)}
                          variant="contained"
                          className={
                            userData.TicketPriority &&
                            userData.TicketPriority.TicketPriorityId ===
                              priority.TicketPriorityId
                              ? "selected-button"
                              : "unselected-button"
                          }
                        >
                          {priority.TicketPriorityName}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="newWorkOrderCells newWorkOrderCellsAssetCategory allTopWO ">
              <div>
                <p className="form-label-newWO">Assign Team(primary)</p>
                <div className="selectNewContainerWO2">
                  <select
                    className="form-select newWorkOrderSelectStep2"
                    aria-label="Default select example"
                    value={userData.TicketCurrentTeam.CurrentAssignedTeamId}
                    onChange={handleTicketCurrentTeamChange}
                  >
                    <option value="1">select</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                  <customIcons.down
                    className="selectNewIcon selectNewIconWO"
                    size={13}
                  />
                </div>
              </div>

              <div>
                <div class="dropdown actionDropdown dropdownAdditionalTeam">
                  <div className="header">
                    <p className="additionalTeamHeader">
                      Assign Additional Team
                    </p>
                  </div>
                  <div className="selectNewContainerWO2">
                    <p
                      className="form-label-newWO btn btn-light dropdown-toggle dropdown-toggle-add-team"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      select
                    </p>
                    <ul class="dropdown-menu">
                      <div class="search-container">
                        {/* <customIcons.search/> */}
                        <input
                          type="text"
                          class="form-control search-input"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={handleAdditionalSearch}
                        />
                      </div>
                      <li>
                        {filteredTeamOptions.map((team) => (
                          <div
                            key={team.TeamId}
                            className="checkbox-item checkListDropdown"
                          >
                            <input
                              type="checkbox"
                              id={`team-${team.TeamId}`}
                              name={`team-${team.TeamId}`}
                              checked={userData.TicketAdditionalTeams.some(
                                (t) => t.TeamId === team.TeamId
                              )}
                              onChange={() =>
                                handleTeamCheckboxChange(team.TeamId)
                              }
                            />
                            <lable htmlFor={`team-${team.TeamId}`}>
                              {team.TeamName}
                            </lable>
                          </div>
                        ))}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <hr className="workOrderHRmain" />

            <div className="newWorkOrderSingleCellHolder">
              <div className="newWorkOrderSingleCell">
                <h3 className="form-label-newWO">Completion</h3>

                <div className="newWOflex checkListDropdown">
                  <input
                    type="checkbox"
                    id="vehicle2"
                    name="vehicle2"
                    value="Car"
                    checked={userData.TechnitianSignature}
                    onChange={() =>
                      setUserData({
                        ...userData,
                        TechnitianSignature: !userData.TechnitianSignature,
                      })
                    }
                  />
                  <p htmlFor="vehicle">Technician Signature Required</p>
                </div>
              </div>

              <div className="newWorkOrderSingleCell">
                <div className="mb-3">
                  <p className="form-label-newWO estimatedHours">
                    Estimated Hours
                  </p>
                  <input
                    type="text"
                    className="form-control newWorkOrderInput"
                    id="formGroupExampleInput"
                    placeholder="hours"
                    value={userData.EstimatedHours}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        EstimatedHours: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <hr className="workOrderHRmain" />
            <div className="newWorkOrderSingleCell">
              <div className="partsTop">
                <p className="form-label-newWO">Projected Parts</p>
              </div>

              <div className="partTableConatainer" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                <table className="partsTable">
                  <thead>
                    <tr>
                      <th>Parts</th>
                      <th>Quantity</th>
                      <th>Ammount(ks)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {partData.length > 0 &&
                      partData.map((item, i) => (
                        <tr key={i}>
                          <td className="tBodyTd">{item.part}</td>
                          <td className="tBodyTd">{item.quantity}</td>
                          <td className="tBodyTd">{item.amount}</td>
                          <td className="tBodyTd">
                            <span>
                              <customIcons.edit
                                size={17}
                                style={{ color: "#584539", cursor: "pointer" }}
                                onClick={() => handleEdit(item)}
                              />
                              <customIcons.delete
                                size={17}
                                style={{ color: "#584539", cursor: "pointer" }}
                                onClick={() => handleDeletePart(item)}
                              />
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <Link onClick={handleShowParts} className="addPartsLink">Add Part</Link>
              <div
                className={`fixedPartsContainer ${
                  !showParts ? "partsFormHide" : ""
                }`}
              >
                <div className="closePartTable" onClick={handleShowParts}>
                  X
                </div>
                <form
                  onSubmit={handleFormSubmit}
                  className={`partsForm partsFormOne ${
                    !showParts ? "partsFormHide" : ""
                  }`}
                >
                  <div className="partsFormInner">
                    <h3 className="partsHeader">Add Part</h3>

                    <p className="partFormHeader">Selected Part</p>
                    <select
                      value={formData.part}
                      onChange={(e) =>
                        setFormData({ ...formData, part: e.target.value })
                      }
                    >
                      <option value="">Select</option>
                      <option value="Part 1">Part 1</option>
                      <option value="Part 2">Part 2</option>
                      <option value="Part 3">Part 3</option>
                    </select>

                    <p className="partFormHeader">Selected Quantity</p>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                    />
                    <p className="partFormHeader">Add Ammount</p>
                    <input
                      type="number"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                    />

                    <button type="submit">Submit</button>
                  </div>
                </form>
              </div>

              {/* <form onSubmit={handleFormSubmit} className="partsForm">
                  <div className="partsFormInner">
                  <input
                    type="text"
                    placeholder="Part"
                    value={formData.part}
                    onChange={(e) =>
                      setFormData({ ...formData, part: e.target.value })
                    }
                  />
                  <br/>
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                  <br/>
                  <input
                    type="text"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                  />
                  <br/>
                  <button type="submit">Submit</button>
                  </div>
                </form> */}
            </div>

            <hr className="workOrderHRmain" />
            <div className="newWorkOrderSingleCell checklistToggle">
              <p className="form-label-newWO">Tasks and Checklists</p>

              <div class="dropdown actionDropdown">
                <button
                  className="btn btn-light dropdown-toggle actionBtn addChecklist"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>Add Checklists</span>
                  <span>
                    <customIcons.down />
                  </span>
                </button>
                <ul class="dropdown-menu">
            <div class="search-container">
              {/* <customIcons.search/> */}
              <input
                type="text"
                class="form-control search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <li>
              {checklists.map((checklist) => (
                <div
                  key={checklist.FormsAndSectionsId}
                  className="checklistList"
                >
                  <input
                    type="radio"
                    id={`checklist-${checklist.FormsAndSectionsId}`}
                    checked={
                      userData.TicketChecklistForms.length > 0 &&
                      userData.TicketChecklistForms[0].FormsAndSectionsId ===
                        checklist.FormsAndSectionsId
                    }
                    onChange={() =>
                      handleChecklistRadioChange(checklist.FormsAndSectionsId)
                    }
                  />
                  <label
                    htmlFor={`checklist-${checklist.FormsAndSectionsId}`}
                  >
                    {checklist.FormsAndSectionsName}
                  </label>
                </div>
              ))}
            </li>
          </ul>
              </div>
              {userData.TicketChecklistForms.length > 0 && (
                <div className="partTableConatainer checklistTableContainer">
                  <table className="checklistTable">
                    <thead>
                      <tr>
                        <th>Checklists</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.TicketChecklistForms.map((item, i) => (
                        <tr key={i}>
                          <td>
                            <div className="pointerChecklistContainer">
                              <span className="checklistPointer"></span>
                              {item.FormsAndSectionsName}
                            </div>
                            <customIcons.delete
                              style={{ color: "rgba(88, 69, 57, 0.87)" }}
                              onClick={() => handleChecklistItemDelete(item)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="newWoBtn">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(1)}
                className="nextBtn assetPrevBtn"
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setStep(3)}
                className="nextBtn assetNextBtn"
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      {editData && (
        <div className="partsForm partsFormEdit">
          <div className="partsFormEditForm">
            <div className="partsFormEditFormHolder">
              <h2>Edit Parts</h2>
              <div className="partsFormInner">
                <h5>Edit Part</h5>
                <input
                  className="partsFormInner"
                  type="text"
                  name="part"
                  value={editData.part}
                  onChange={(e) =>
                    setEditData({ ...editData, part: e.target.value })
                  }
                />
                <br />

                <h5>Edit Quatity</h5>
                <input
                  type="text"
                  name="quantity"
                  value={editData.quantity}
                  onChange={(e) =>
                    setEditData({ ...editData, quantity: e.target.value })
                  }
                />
                <br />

                <h5>Edit Amount</h5>
                <input
                  type="text"
                  name="amount"
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData({ ...editData, amount: e.target.value })
                  }
                />
                <br />
                <div className="editPartsBtn">
                  <button onClick={handleUpdate}>Update</button>
                  <button onClick={() => setEditData(null)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewWorkOrder;








