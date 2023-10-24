import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import customIcons from "../../Icons/icons";
import "./steps.css";
import { act } from "react-dom/test-utils";
import axios from "axios";
import { Link } from "react-router-dom";

const assetCategory = [
  {
    value: 1,
    label: "Asset category 1",
  },
  {
    value: 2,
    label: "Asset category 2",
  },
  {
    value: 3,
    label: "Asset category 3",
  },
  {
    value: 4,
    label: "Asset category 4",
  },
];

const locations = [
  {
    value: 1,
    label: "Kenya",
  },
  {
    value: 2,
    label: "Uganda",
  },
  {
    value: 3,
    label: "Tanzania",
  },
  {
    value: 4,
    label: "Rwanda",
  },
];

const assets = [
  {
    value: 1,
    label: "Asset 1",
  },
  {
    value: 2,
    label: "Asset 2",
  },
  {
    value: 3,
    label: "Asset 3",
  },
  {
    value: 4,
    label: "Asset 4",
  },
];

const ticketList = [
  {
    value: 1,
    label: "ticket 1",
  },
  {
    value: 2,
    label: "ticket 2",
  },
  {
    value: 3,
    label: "ticket 3",
  },
  {
    value: 4,
    label: "ticket 4",
  },
];

const teamOptions = [
  { TeamId: 1, TeamName: "One" },
  { TeamId: 2, TeamName: "Two" },
  { TeamId: 3, TeamName: "Three" },
  // Add more teams as needed
];

const options = ["Low", "Medium", "High", "Criticle"];

const features = ["Scales", "Horns", "Claws", "Wings"];

function NewWorkOrder() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);
  const [checkedItems, setCheckedItems] = useState({});
  const [activeTab, setActiveTab] = useState(true);
  const [activeTab2, setActiveTab2] = useState(false);
  const [showParts, setShowParts] = useState(false);

  const [partData, setPartData] = useState([]);
  const [formData, setFormData] = useState({
    part: "",
    quantity: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  const handleShowParts = () => {
    setShowParts(!showParts)
  }

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

  //   const handleTicketCurrentTeamChange = (e) => {
  //     setUserData({ ...userData, TicketCurrentTeam: e.target.value });
  //   };

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

  console.log(userData);

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

  return (
    <div>
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
      <div className="tab-content" id="nav-tabContent">
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
                <select
                  className="form-select newWorkOrderSelectStep2"
                  aria-label="Default select example"
                  value={userData.categoryOfWork}
                  onChange={(e) =>
                    setUserData({ ...userData, categoryOfWork: e.target.value })
                  }
                >
                  <option selected>select</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>

              <div>
                <p className="form-label-newWO">Priority</p>
                <div className="newWorkOrderCellsCheckBox">
                  {/* fbu4hfu4hi */}
                  {options.map((option, index) => {
                    console.log(option); // Add this line to log the option
                    return (
                      <label
                        key={option}
                        className={`checkbox-button ${
                          checkedItems[option] ? "checked" : ""
                        } ${index === 0 ? "first-option" : ""} ${
                          index === options.length - 1 ? "last-option" : ""
                        }`}
                        onClick={() => handleCheckboxChange(option)}
                      >
                        <input
                          type="checkbox"
                          checked={checkedItems[option]}
                          onChange={() => {}}
                        />
                        {option}
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            <div>
              <div className="newWorkOrderCells">
                <div>
                  <p className="form-label-newWO">Assign Team(primary)</p>
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
                </div>

                <div>
                  <p className="form-label-newWO">Assign Additional Team</p>
                  {teamOptions.map((team) => (
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
                        onChange={() => handleTeamCheckboxChange(team.TeamId)}
                      />
                      <p htmlFor={`team-${team.TeamId}`}>{team.TeamName}</p>
                    </div>
                  ))}
                </div>
              </div>

              <hr />

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
                    <p htmlFor="vehicle">
                      Technician Signature Required
                    </p>
                  </div>
                </div>

                <div className="newWorkOrderSingleCell">
                  <div className="mb-3">
                    <p className="form-label-newWO">Estimated Hours</p>
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
              <hr />
              <div className="newWorkOrderSingleCell">
                <div className="partsTop">
                  <p className="form-label-newWO">Projected Parts</p>
                  <Link  onClick={handleShowParts}>Add Part</Link>
                </div>

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
                    {partData.map((item, i) => (
                      <tr key={i}>
                        <td className="tBodyTd">{item.part}</td>
                        <td className="tBodyTd">{item.quantity}</td>
                        <td className="tBodyTd">{item.amount}</td>
                        <td className="tBodyTd">
                            <span>
                            <customIcons.delete size={18}/>
                            <customIcons.edit size={18}/>
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <form onSubmit={handleFormSubmit} className={`partsForm ${ !showParts ? "partsFormHide" : ""}`}>
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
              <hr />
              <div className="newWorkOrderSingleCell">
                <p className="form-label-newWO">Tasks and Checklists</p>
                {features.map((feature) => (
                  <div key={feature} className="checkListDropdown">
                    <input
                      type="checkbox"
                      id={feature.toLowerCase()}
                      name={feature.toLowerCase()}
                      checked={
                        userData.features && userData.features.includes(feature)
                      }
                      onChange={() => handleCheckboxChange(feature)}
                    />
                    <p htmlFor={feature.toLowerCase()}>{feature}</p>
                  </div>
                ))}
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
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
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
                    placeholder="Example input placeholder"
                    value={userData.title}
                    onChange={(e) =>
                      setUserData({ ...userData, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <p className="form-label-newWO">Description</p>
                  <input
                    type="text"
                    className="form-control newWorkOrderInput"
                    id="formGroupExampleInput2"
                    placeholder="Another input placeholder"
                    value={userData.description}
                    onChange={(e) =>
                      setUserData({ ...userData, description: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="newWorkOrderCells">
                <div>
                  <p className="form-label-newWO">Category Of Work</p>
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
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div>
                  <p className="form-label-newWO">Priority</p>
                  <div className="newWorkOrderCellsCheckBox">
                    {options.map((option, index) => (
                      <label
                        key={option}
                        className={`checkbox-button ${
                          checkedItems[option] ? "checked" : ""
                        } ${index === 0 ? "first-option" : ""} ${
                          index === options.length - 1 ? "last-option" : ""
                        }`}
                        onClick={() => handleCheckboxChange(option)}
                      >
                        <input
                          type="checkbox"
                          checked={checkedItems[option]}
                          onChange={() => {}}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="newWorkOrderCells">
                <div>
                  <p className="form-label-newWO">Assign Team(primary)</p>
                  <select
                    className="form-select newWorkOrderSelectStep2"
                    aria-label="Default select example"
                    value={userData.primaryTeam}
                    onChange={(e) =>
                      setUserData({ ...userData, primaryTeam: e.target.value })
                    }
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>

                <div>
                  <p className="form-label-newWO">Assign Additional Team</p>
                  <select
                    className="form-select newWorkOrderSelectStep2"
                    aria-label="Default select example"
                    value={userData.additionalTeam}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        additionalTeam: e.target.value,
                      })
                    }
                  >
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
              </div>

              <hr />

              <div className="newWorkOrderSingleCellHolder">
                <div className="newWorkOrderSingleCell">
                  <h3 className="form-label-newWO">Completion</h3>

                  <div className="newWOflex">
                    <input
                      type="checkbox"
                      id="vehicle2"
                      name="vehicle2"
                      value="Car"
                      checked={userData.signatureRequired}
                      onChange={() =>
                        setUserData({
                          ...userData,
                          signatureRequired: !userData.signatureRequired,
                        })
                      }
                    />
                    <label htmlFor="vehicle">
                      Technician Signature Required
                    </label>
                  </div>
                </div>

                <div className="newWorkOrderSingleCell">
                  <div className="mb-3">
                    <p className="form-label-newWO">Estimated Hours</p>
                    <input
                      type="text"
                      className="form-control newWorkOrderInput"
                      id="formGroupExampleInput"
                      placeholder="hours"
                      value={userData.estimatedHours}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          estimatedHours: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div className="newWorkOrderSingleCell">
                <p className="form-label-newWO">Projected Parts</p>
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
                    <tr>
                      <td className="tBodyTd"></td>
                      <td className="tBodyTd"></td>
                      <td className="tBodyTd"></td>
                      <td className="tBodyTd"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <hr />
              <div className="newWorkOrderSingleCell">
                <p className="form-label-newWO">Tasks and Checklists</p>
                {features.map((feature) => (
                  <div key={feature}>
                    <input
                      type="checkbox"
                      id={feature.toLowerCase()}
                      name={feature.toLowerCase()}
                      checked={
                        userData.features && userData.features.includes(feature)
                      }
                      onChange={() => handleCheckboxChange(feature)}
                    />
                    <p htmlFor={feature.toLowerCase()}>{feature}</p>
                  </div>
                ))}
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
      </div>
    </div>
  );
}

export default NewWorkOrder;
