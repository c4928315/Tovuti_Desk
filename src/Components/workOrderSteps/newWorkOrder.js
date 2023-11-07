import React, { useContext, useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import customIcons from "../../Icons/icons";
import "./steps.css";
import axios from "axios";
import { Link } from "react-router-dom";

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
  const [primaryTeamSearchQuery, setPrimaryTeamSearchQuery] = useState("");
  const [selectedPart, setSelectedPart] = useState(null);
  const [additionalTeamsSearchQuery, setAdditionalTeamsSearchQuery] =
    useState("");
  const [activeTab, setActiveTab] = useState(true);
  const [activeTab2, setActiveTab2] = useState(false);
  const [showParts, setShowParts] = useState(false);
  const [ticketProjectedParts, setTicketProjectedParts] = useState([]);
  const [calculatedAmount, setCalculatedAmount] = useState(0);

  const [selectedCategoryOfWork, setSelectedCategoryOfWork] = useState(null);
  const [selectedPrimaryTeam, setSelectedPrimaryTeam] = useState(null);
  const [categoryOfWorkData, setCategoryOfWorkData] = useState([]);

  const [priorities, setPriorities] = useState([]);
  const [editedEntity, setEditedEntity] = useState(null);

  const [editData, setEditData] = useState(null);
  const [editedPartData, setEditedPartData] = useState({
    partName: "",
    quantity: 0,
    amount: 0,
  });

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



  const partsAssetId = userData.TicketAssets?.map((i) => i.id);

  

  useEffect(() => {
    const apiUrl = `https://saharadeskrestapi.azurewebsites.net/api/Parts/GetPartsByAsset/${partsAssetId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setPartData(data);
       
      })
      .catch((error) => {
        console.error("Error fetching parts:", error);
      });
  }, [partsAssetId]);

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

        setFilteredTeamOptions(response.data);
      } catch (error) {
        console.error("Error fetching category of work data:", error);
      }
    }

    fetchTeams();
  }, []);

  useEffect(() => {
    async function fetchPriorities() {
      try {
        const response = await axios.get(
          "https://saharadeskrestapi.azurewebsites.net/api/Tickets/GetAllTicketPriorities"
        );

        setPriorities(response.data);
      } catch (error) {
        console.error("Error fetching category of work data:", error);
      }
    }

    fetchPriorities();
  }, []);

  //https://saharadeskrestapi.azurewebsites.net/api/Tickets/GetAllTicketPriorities

  // const handleUpdateEditedPart = () => {
  //   const partIndex = userData.TicketProjectedParts.findIndex(
  //     (part) => part.spareId === editData.id
  //   );

  //   if (partIndex !== -1) {
  //     const selectedPart = partData.find(
  //       (part) => part.id === selectedPart
  //     );

  //     if (selectedPart) {
  //       const updatedProjectedParts = [...userData.TicketProjectedParts];
  //       updatedProjectedParts[partIndex] = {
  //         ...updatedProjectedParts[partIndex],
  //         spareId: selectedPart.id,
  //         partName: editedPartData.partName,
  //         quantity: editedPartData.quantity,
  //         amount: parseFloat(selectedPart.cost) * parseInt(editedPartData.quantity, 10), // Recalculate the amount
  //       };

  //       setUserData({ ...userData, TicketProjectedParts: updatedProjectedParts });

  //       setEditedPartData({ partName: "", quantity: 0, amount: 0 });
  //       setSelectedPart(null);
  //       setEditData(null);
  //     }
  //   }
  // };

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

  const calculateAmount = () => {
    if (formData.part && formData.quantity) {
      const selectedPart = partData.find(
        (item) => item.id === parseInt(formData.part, 10)
      );
      if (selectedPart) {
        const cost = selectedPart.cost; // Replace 'cost' with the actual property name in your part data
        const quantity = parseInt(formData.quantity, 10);
        const amount = cost * quantity;
        setCalculatedAmount(amount);
      } else {
        setCalculatedAmount(0); // If the selected part is not found, set the amount to 0
      }
    } else {
      setCalculatedAmount(0); // If either the part or quantity is not selected, set the amount to 0
    }
  };

  useEffect(() => {
    calculateAmount();
  }, [formData.part, formData.quantity, partData]);

  useEffect(() => {
    if (formData.part) {
      calculateAmount();
    }
  }, [formData.part, partData]);

  const handleEditPart = (item) => {
    setEditedPartData({
      partName: item.partName,
      quantity: item.quantity,
      amount: item.amount,
    });

    setSelectedPart(item.spareId);

    // Store the item being edited so that it can be used in the edit form
    setEditedEntity(item);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedPart = partData.find(
      (part) => part.id === parseInt(formData.part, 10)
    );

    if (selectedPart) {
      const newPart = {
        spareId: selectedPart.id,
        quantity: parseInt(formData.quantity, 10),
        amount: parseFloat(selectedPart.cost) * parseInt(formData.quantity, 10), // Calculate the amount
        partName: selectedPart.partName,
      };

      setTicketProjectedParts((prevProjectedParts) => [
        ...prevProjectedParts,
        newPart,
      ]);

      setUserData({
        ...userData,
        TicketProjectedParts: [...ticketProjectedParts, newPart],
      });

      setFormData({ partName: "", part: "", quantity: "", amount: "" });
      setShowParts(!showParts);
    }
  };

  const handleUpdateEditedPart = () => {
    if (editData && editData.id) {
      // Find the index of the edited part in the projected parts array
      const partIndex = userData.TicketProjectedParts.findIndex(
        (part) => part.spareId === editData.id
      );

      if (partIndex !== -1) {
        const updatedProjectedParts = [...userData.TicketProjectedParts];
        updatedProjectedParts[partIndex] = {
          ...updatedProjectedParts[partIndex],
          spareId: selectedPart, // Use the selected part's ID
          partName: editedPartData.partName,
          quantity: editedPartData.quantity,
          amount:
            parseFloat(editedPartData.quantity) *
            parseFloat(
              partData.find((part) => part.id === selectedPart)?.cost || 0
            ),
        };

        setUserData({
          ...userData,
          TicketProjectedParts: updatedProjectedParts,
        });

        // Clear the edited part data and close the edit form
        setEditedPartData({ partName: "", quantity: 0, amount: 0 });
        setSelectedPart(null); // Clear the selected part
        setEditData(null);
      }
    }
  };

  const handleTicketCurrentTeamChange = (teamId, teamName) => {
    const selectedTeam = teams.find((team) => team.id === parseInt(teamId, 10));

    if (selectedTeam) {
      setUserData({
        ...userData,
        TicketCurrentTeam: {
          CurrentAssignedTeamId: selectedTeam.id,
          CurrentAssignedTeamName: selectedTeam.teamName,
        },
      });
      setPrimaryTeamSearchQuery(selectedTeam.teamName);
    }
  };

  const handleTeamRadioChange = (teamId) => {
    const selectedTeam = teams.find((team) => team.id === parseInt(teamId, 10)); // Parse teamId to an integer
    setUserData({
      ...userData,
      TicketAdditionalTeams: [selectedTeam],
    });
  };

  const handleTeamRadioChange2 = (teamId) => {
    const selectedTeam = teams.find((team) => team.id === parseInt(teamId, 10)); // Parse teamId to an integer

    if (selectedTeam) {
      // Update the TicketCurrentTeam field in userData
      setUserData({
        ...userData,
        TicketCurrentTeam: {
          CurrentAssignedTeamId: selectedTeam.id,
          CurrentAssignedTeamName: selectedTeam.teamName,
        },
      });
      // Set the search query to the selected team's name
      setPrimaryTeamSearchQuery(selectedTeam.teamName);
    }
  };



  const handlePrioritySelection = (priority) => {
    console.log("Selected Priority:", priority); // Log the selected priority
    setUserData({
      ...userData,
      TicketPriority: {
        TicketPriorityId: priority.id,
        TicketPriorityName: priority.ticketPrioritiesName,
      },
    });
  };

  const handleChecklistSearchChange = (e) => {
    setChecklistSearchQuery(e.target.value);
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

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTeams, setFilteredTeams] = useState(teams);

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

  useEffect(() => {
    setFilteredTeams(teams);
  }, [teams]);

  const handlePrimaryTeamSearchChange = (e) => {
    const selectedTeamName = e.target.value;

    // Update the search query as the user types
    setSearchQuery(selectedTeamName);

    // Filter the teams based on the search query
    const filteredTeams = teams.filter((team) =>
      team.teamName.toLowerCase().includes(selectedTeamName.toLowerCase())
    );

    setFilteredTeams(filteredTeams);
  };

  //CHECKLIST SEARCH

  const [categorySearchQuery, setCategorySearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] =
    useState(categoryOfWorkData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [filteredTeamOptions, setFilteredTeamOptions] = useState(teams);

  const handleAdditionalTeamsSearchChange = (e) => {
    setAdditionalTeamsSearchQuery(e.target.value);
    // You can filter the teams here based on the search query
    const filteredTeams = teams.filter((team) =>
      team.teamName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredTeamOptions(filteredTeams);
  };

  const handleCategoryOfWorkSearchChange = (e) => {
    const selectedCategoryName = e.target.value;

    // Update the search query as the user types
    setCategorySearchQuery(selectedCategoryName);

    // Filter the categories based on the search query
    const filteredCategories = categoryOfWorkData.filter((category) =>
      category.categoryOfWorkName
        .toLowerCase()
        .includes(selectedCategoryName.toLowerCase())
    );

    setFilteredCategories(filteredCategories);
    setIsDropdownOpen(true); // Open the dropdown
  };


  

  const handleCategoryOfWorkSelection = (selectedCategory) => {
    setSelectedCategoryOfWork(selectedCategory);

    // Update userData with the selected category of work
    setUserData({
      ...userData,
      categoryOfWork: selectedCategory,
    });

    // Close the dropdown
    setIsDropdownOpen(false);
  };

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
                              priority.id
                              ? "selected-button"
                              : "unselected-button"
                          }
                        >
                          {priority.ticketPrioritiesName}
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
                <div class="dropdown actionDropdown assignedTeam">
                  <p
                    className="form-label-newWO btn btn-light dropdown-toggle dropdown-toggle-add-team"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {userData.TicketCurrentTeam?.CurrentAssignedTeamName ||
                      "Select"}
                  </p>
                  <ul className="dropdown-menu">
                    <div className="search-container">
                      <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search Primary Team..."
                        value={searchQuery}
                        onChange={handlePrimaryTeamSearchChange}
                      />
                    </div>
                    <li>
                      {filteredTeams.map((team) => (
                        <div
                          key={team.id}
                          className="radio-item checkListDropdown"
                        >
                          <input
                            type="radio"
                            id={`team-${team.id}`}
                            name="currentTeam"
                            value={team.id}
                            checked={
                              selectedPrimaryTeam &&
                              selectedPrimaryTeam.id === team.id
                            }
                            onChange={() => handleTeamRadioChange2(team.id)}
                          />
                          <label htmlFor={`team-${team.id}`}>
                            {team.teamName}
                          </label>
                        </div>
                      ))}
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <div className="dropdown actionDropdown dropdownAdditionalTeam">
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
                      {userData.TicketAdditionalTeams?.map((i) => i.teamName) ||
                        "Select"}
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
                        {filteredTeamOptions.map((team) => (
                          <div
                            key={team.id}
                            className="radio-item checkListDropdown"
                          >
                            <input
                              type="radio"
                              id={`team-${team.id}`}
                              name="selectedTeam"
                              value={team.id}
                              checked={userData.TicketAdditionalTeams.some(
                                (selectedTeam) =>
                                  selectedTeam.TeamId === team.id
                              )}
                              onChange={() => handleTeamRadioChange(team.id)}
                            />

                            <label htmlFor={`team-${team.id}`}>
                              {team.teamName}
                            </label>
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
                      <th>Amount(ksh)</th>
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
                      onChange={(e) => {
                        setCalculatedAmount(0); // Reset the calculated amount when the quantity changes
                        setFormData({ ...formData, quantity: e.target.value });
                      }}
                    />

                    <p className="partFormHeader">
                      Calculated Amount: ${calculatedAmount}
                    </p>

                    {/* <p className="partFormHeader">Add Amount</p>
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: e.target.value })
              }
            /> */}

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
                <select
                  name="partName"
                  value={selectedPart}
                  placeholder="edit part name"
                  onChange={(e) => {
                    const selectedPartId = parseInt(e.target.value, 10);
                    setSelectedPart(selectedPartId);
                    const selectedPart = partData.find(
                      (part) => part.id === selectedPartId
                    );
                    if (selectedPart) {
                      setEditedPartData({
                        ...editedPartData,
                        partName: selectedPart.partName,
                      });
                    }
                  }}
                >
                  <option value="">Select Part</option>
                  {partData.map((part) => (
                    <option key={part.id} value={part.id}>
                      {part.partName}
                    </option>
                  ))}
                </select>
                <br />

                <input
                  type="number"
                  placeholder="edit quantity"
                  name="quantity"
                  value={editedPartData.quantity}
                  onChange={(e) =>
                    setEditedPartData({
                      ...editedPartData,
                      quantity: e.target.value,
                    })
                  }
                />
                <br />
                <div className="editPartsBtn">
                  <button onClick={handleUpdateEditedPart}>Update</button>
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
