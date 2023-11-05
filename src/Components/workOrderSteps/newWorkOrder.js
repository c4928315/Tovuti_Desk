import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
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
  const [checklistSearchQuery, setChecklistSearchQuery] = useState("");
  const [additionalTeamsSearchQuery, setAdditionalTeamsSearchQuery] =
    useState("");
  const [activeTab, setActiveTab] = useState(true);
  const [activeTab2, setActiveTab2] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [ticketProjectedParts, setTicketProjectedParts] = useState([]);

  const [selectedCategoryOfWork, setSelectedCategoryOfWork] = useState(null);
  const [categoryOfWorkData, setCategoryOfWorkData] = useState([]);

  const [editData, setEditData] = useState(null);
  const [partData, setPartData] = useState([]);
  const [formData, setFormData] = useState({
    spareId: "",
    quantity: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  const handleShowParts = () => {
    setShowParts(!showParts);
  };

  console.log(userData);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://saharadeskrestapi.azurewebsites.net/api/Parts/GetAllParts"
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

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    async function fetchCategoryOfWorkData() {
      try {
        const response = await axios.get(
          "https://saharadeskrestapi.azurewebsites.net/api/CategoryOfWorks"
        );

        setCategoryOfWorkData(response.data);
      } catch (error) {
        console.error("Error fetching category of work data:", error);
      }
    }

    fetchCategoryOfWorkData();
  }, []);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const response = await axios.get(
          "https://saharadeskrestapi.azurewebsites.net/api/Team/GetAllTeams"
        );

        setTeams(response.data);
      } catch (error) {
        console.error("Error fetching category of work data:", error);
      }
    }

    fetchTeams();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    const selectedPart = partData.find((part) => part.id === parseInt(formData.part, 10)); // Parse the formData.part to an integer
  
    if (selectedPart) {
      const newPart = {
        spareId: selectedPart.id, // Use selectedPart.id as spareId
        quantity: parseInt(formData.quantity, 10), // Parse the formData.quantity to an integer
        amount: parseFloat(formData.amount), // Parse the formData.amount to a float
        partName: selectedPart.partName,
      };
  
      setTicketProjectedParts((prevProjectedParts) => [...prevProjectedParts, newPart]);
  
      setUserData({
        ...userData,
        TicketProjectedParts: [...ticketProjectedParts, newPart],
      });
  
      setFormData({ partName: "", part: "", quantity: "", amount: "" }); // Clear the form fields
      setShowParts(!showParts);
    }
  };
  

  const handleUpdate = () => {
    if (editData && editData.id) {
      const updatedProjectedParts = userData.TicketProjectedParts.map(
        (item) => {
          if (item.spareId === editData.id) {
            return {
              spareId: editData.spareId,
              quantity: editData.quantity,
              amount: editData.amount,
            };
          }
          return item;
        }
      );

      setUserData({ ...userData, TicketProjectedParts: updatedProjectedParts });

      setEditData(null);
    }
  };

  const handleEdit = (item) => {
    setEditData({ ...item, id: item.spareId });
  };

  const handleTabState = () => {
    setActiveTab(!activeTab);
    setActiveTab2(!activeTab2);
  };
  //   setCheckedItems((prevItems) => ({
  //     ...prevItems,
  //     [option]: !prevItems[option],
  //   }));
  // };

  // const handleAssetCheckboxChange = (assets) => {
  //   const { asset } = userData;

  //   const updatedasset = asset.includes(assets)
  //     ? asset.filter((selectedAsset) => selectedAsset !== assets)
  //     : [...asset, assets];

  //   setUserData({ ...userData, asset: updatedasset });
  // };

  // const handleCheckboxChange = (option) => {
  //   console.log("Clicked option:", option);

  //   const selectedFeatures = userData.features || [];
  //   if (selectedFeatures.includes(option)) {
  //     setUserData({
  //       ...userData,
  //       features: selectedFeatures.filter(
  //         (selectedFeature) => selectedFeature !== option
  //       ),
  //     });
  //   } else {
  //     setUserData({
  //       ...userData,
  //       features: [...selectedFeatures, option],
  //     });
  //   }
  // };

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

  const handleChecklistSearchChange = (e) => {
    setChecklistSearchQuery(e.target.value);
  };

  const handleAdditionalTeamsSearchChange = (e) => {
    setAdditionalTeamsSearchQuery(e.target.value);
  };

  const handleDeleteProjectedPart = (index) => {
    const updatedProjectedParts = [...userData.TicketProjectedParts];
    updatedProjectedParts.splice(index, 1);
    setUserData({ ...userData, TicketProjectedParts: updatedProjectedParts });
  };

  const handleChecklistItemDelete = (item) => {
    const updatedChecklist = userData.TicketChecklistForms.filter(
      (form) => form.FormsAndSectionsId !== item.FormsAndSectionsId
    );

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

  const [filteredTeamOptions, setFilteredTeamOptions] = useState(teams);

  const handleAdditionalSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    const filteredList = teams.filter((team) => {
      return team.teamName.toLowerCase().includes(searchTerm.toLowerCase());
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
                    value={
                      selectedCategoryOfWork ? selectedCategoryOfWork.id : ""
                    }
                    onChange={(e) => {
                      const selectedCategoryId = e.target.value;
                      const selectedCategory = categoryOfWorkData.find(
                        (category) => category.id === Number(selectedCategoryId)
                      );
                      setSelectedCategoryOfWork(selectedCategory);

                      // Update userData with the selected category of work
                      setUserData({
                        ...userData,
                        categoryOfWork: selectedCategory,
                      });
                    }}
                    style={{
                      color: "#C5C7CD",
                    }}
                  >
                    <option value="">select</option>
                    {categoryOfWorkData.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryOfWorkName}
                      </option>
                    ))}
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

            <div className="newWorkOrderCells newWorkOrderCellsAssetCategory allTopWO WOstepOneMargin">
              <div>
                <p className="form-label-newWO">Assign Team(primary)</p>
                <div className="selectNewContainerWO2">
                  <select
                    className="form-select newWorkOrderSelectStep2"
                    aria-label="Default select example"
                    value={userData.TicketCurrentTeam.CurrentAssignedTeamId}
                    onChange={handleTicketCurrentTeamChange}
                  >
                    <option value="">select</option>
                    {teams.map((item) => {
                      return (
                        <option value={item.id} key={item.id}>
                          {item.teamName}
                        </option>
                      );
                    })}
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
                        <input
                          type="text"
                          class="form-control search-input"
                          placeholder="Search Additional Teams..."
                          value={additionalTeamsSearchQuery}
                          onChange={handleAdditionalTeamsSearchChange}
                        />
                      </div>

                      <li>
                        {teams
                          .filter((team) =>
                            team.teamName
                              .toLowerCase()
                              .includes(
                                additionalTeamsSearchQuery.toLowerCase()
                              )
                          )
                          .map((team) => (
                            <div
                              key={team.id} // Assuming that the team object has an 'id' property
                              className="checkbox-item checkListDropdown"
                            >
                              <input
                                type="checkbox"
                                id={`team-${team.id}`}
                                name={`team-${team.id}`}
                                checked={userData.TicketAdditionalTeams.some(
                                  (t) => t.TeamId === team.id
                                )}
                                onChange={() =>
                                  handleTeamCheckboxChange(team.id)
                                } // Use 'team.id' as the team identifier
                              />
                              <lable htmlFor={`team-${team.id}`}>
                                {team.teamName}
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
            <div className="newWorkOrderSingleCell newWorkOrderSingleCellForm">
              <div className="partsTop">
                <p className="form-label-newWO">Projected Parts</p>
              </div>

              <div className="partsTableConatainer">
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
                    {userData.TicketProjectedParts.map((item, i) => {
                      return (
                        <tr key={i}>
                          <td className="tBodyTd">{item.partName}</td>
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
                                onClick={() => handleDeleteProjectedPart(i)}
                              />
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <Link onClick={handleShowParts} className="addPartsLink">
                Add Part
              </Link>
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
                      {partData.map((item) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.partName}
                          </option>
                        );
                      })}
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
                <ul class="dropdown-menu addChecklistDropDown">
                  <div class="search-container">
                    <input
                      type="text"
                      class="form-control search-input"
                      placeholder="Search Checklists..."
                      value={checklistSearchQuery}
                      onChange={handleChecklistSearchChange}
                    />
                  </div>

                  <li>
                    {checklists
                      .filter((checklist) =>
                        checklist.FormsAndSectionsName.toLowerCase().includes(
                          checklistSearchQuery.toLowerCase()
                        )
                      )
                      .map((checklist) => (
                        <div
                          key={checklist.FormsAndSectionsId}
                          className="checklistList"
                        >
                          <input
                            type="radio"
                            id={`checklist-${checklist.FormsAndSectionsId}`}
                            checked={
                              userData.TicketChecklistForms.length > 0 &&
                              userData.TicketChecklistForms[0]
                                .FormsAndSectionsId ===
                                checklist.FormsAndSectionsId
                            }
                            onChange={() =>
                              handleChecklistRadioChange(
                                checklist.FormsAndSectionsId
                              )
                            }
                          />
                          <lable
                            htmlFor={`checklist-${checklist.FormsAndSectionsId}`}
                          >
                            {checklist.FormsAndSectionsName}
                          </lable>
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

                <h5>Edit Quantity</h5>
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
