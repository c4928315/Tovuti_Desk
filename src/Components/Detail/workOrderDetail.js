import React, { useContext, useEffect, useState } from "react";
import customIcons from "../../Icons/icons";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { MultiStepContext } from "../Context";
import CloseWorkOrder from "../Forms/CloseWorkOrder/closeWorkOrder";

function WorkOrderDetailsPage() {
  const { itemId } = useParams();
  const { setStep, requestedPartz } = useContext(MultiStepContext);
  const [itemDetails, setItemDetails] = useState(null);
  const [partData, setPartData] = useState([]);

  const [showParts, setShowParts] = useState(false);
  const [showPartsForm, setShowPartsForm] = useState(false);
  const [showPartsRequested, setShowPartsRequested] = useState(false);
  const [showPartsUsed, setShowPartsUsed] = useState(false);
  const [showPartsRecieved, setShowPartsRecieved] = useState(false);
  const [showPartsReturned, setShowPartsReturned] = useState(false);
  const [showOtherInfo, setShowOtherInfo] = useState(false);
  const [showLabourForm, setShowLabourForm] = useState(false);
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);

  const [extendPartTable, setExtendPartTable] = useState(false);
  const [extendOtherInfoTable, setExtendOtherInfoTable] = useState(false);
  const [extendLabourTable, setExtendLabourTable] = useState(false);
  const [extendDiagnosisTable, setExtendDiagnosisTable] = useState(false);
  const [extendFilesTable, setExtendFilesTable] = useState(false);

  

  //claims
  const { userClaims, userData, setUserData } = useContext(MultiStepContext);

  const canRaiseTicket = userClaims.some(
    (claim) => claim.claimType === "Can_Raise_A_Ticket"
  );
  //claims

  const [formData, setFormData] = useState({
    part: "",
    quantity: "",
    amount: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);

  const handlePartForm = () => {
    setShowPartsForm(!showPartsForm);
  };

  const handlePartFormRequested = () => {
    setShowPartsRequested(!showPartsRequested);
  };

  const handlePartFormUsed = () => {
    setShowPartsUsed(!showPartsUsed);
  };

  const handlePartFormRecieved = () => {
    setShowPartsRecieved(!showPartsRecieved);
  };

  const handlePartFormReturned = () => {
    setShowPartsReturned(!showPartsReturned);
  };

  const handleOtherInfoForm = () => {
    setShowOtherInfo(!showOtherInfo);
  };

  const handleLabourForm = () => {
    setShowLabourForm(!showLabourForm);
  };

  const handleDiagnosisForm = () => {
    setShowDiagnosisForm(!showDiagnosisForm);
  };

  console.log(requestedPartz)

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
  }, []);

  const [locations, setLocations] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://saharadeskrestapi.azurewebsites.net/api/Locations"
        );

        setLocations(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);



  const handleFormSubmit = async (e) => {
    e.preventDefault();

   
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

        setShowPartsForm(!showPartsForm);
      } else {
        console.error("Failed to add data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  let id = 10

  useEffect(() => {
    const apiUrl = `https://saharadeskrestapi.azurewebsites.net/api/Tickets/${itemId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (HTTP status: ${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItemDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [itemId]);

  const handlePartsInfo = () => {
    setExtendPartTable(!extendPartTable);
  };

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await axios.get(
  //         "https://intra-deco.onrender.com/Parts"
  //       );

  //       setPartData(response.data);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  // const getPartId = itemDetails.id
  // console.log(getPartId)

  

  useEffect(() => {

    async function fetchPartData() {
      try {
        const response = await axios.get(`https://saharadeskrestapi.azurewebsites.net/api/Parts/GetPartsByAsset/${id}`);
        setPartData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }


    fetchPartData(); // Assuming itemId holds the assetId
  }, [id]);

  const handleShowParts = () => {
    setExtendPartTable(!extendPartTable);
  };
  const handleShowOtherInfo = () => {
    setExtendOtherInfoTable(!extendOtherInfoTable);
  };
  const handleShowDiagnosis = () => {
    setExtendDiagnosisTable(!extendDiagnosisTable);
  };
  const handleShowLabour = () => {
    setExtendLabourTable(!extendLabourTable);
  };
  const handleShowFiles = () => {
    setExtendFilesTable(!extendFilesTable);
  };

  const [partNames, setPartNames] = useState([]);
  const [editingPart, setEditingPart] = useState(false);
  

  useEffect(() => {
    async function fetchPartNames() {
      try {
        const response = await axios.get("https://saharadeskrestapi.azurewebsites.net/api/Parts/GetAllParts");
        setPartNames(response.data);
      } catch (error) {
        console.error("Error fetching part names:", error);
      }
    }

    fetchPartNames();
  }, []);


  


  const handleDeletePart = (partId) => {
    // Filter out the part to delete using the partId
    const updatedParts = userData.TicketRequestedParts.filter((item) => item.id !== partId);
  
    // Update the userData state with the filtered array
    setUserData({
      ...userData,
      TicketRequestedParts: updatedParts,
    });
  };



  const handleEditPart = (partId) => {
    const partToEdit = userData.TicketRequestedParts.find((item) => item.id === partId);
  
    if (partToEdit) {
      setRequestedParts({
        partId: partToEdit.id,
        part: partToEdit.partName, // Assuming you have a 'partName' field
        quantity: partToEdit.quantity,
        location: partToEdit.location,
      });
  
      setEditingPart(true);
    }
  };
  
 
  const [showCloseForm, setShowCloseForm] = useState(false);
  const [closeFormItemId, setCloseFormItemId] = useState(null);

  // Function to handle the "Close Work Order" button click
  const handleCloseWorkOrder = (itemId) => {
    setCloseFormItemId(itemId);
    setShowCloseForm(true);
  };


  const [requestedParts, setRequestedParts] = useState({
    parts: { selectedPartId: "", selectedPartName: "" },
    location: { selectedLocationId: "", selectedLocationName: "" },
    quantity: 0,
    amount: 0,
  });

  const currentUser = localStorage.getItem("userInfo")

  

  const handlePartFormSubmit = async (e) => {
    e.preventDefault();

    const {
      parts: { selectedPartId, selectedPartName },
      location: { selectedLocationId, selectedLocationName },
      quantity,
      amount,
    } = requestedParts;

    if (!selectedPartId) {
      console.error("No part selected");
      return;
    }

    try {
      // Define the request body in the required format
      const requestBody = {
        ticketId: 3,  // Replace with the actual ticketId
        partId: selectedPartId,  // Use the selected part's ID
        partLocationId: parseInt(selectedLocationId, 10),  // Use the selected location's ID
        partSerialNumber: "23456tyrew3245",  // Replace with the appropriate serial number
        quantityRequested: parseInt(quantity, 10),
        partStatus: "string",  // Replace with the appropriate status
        partCondition: "string",  // Replace with the appropriate condition
        partPhoto: "string",  // Replace with the path to the part's photo
        isApproved: true,  // Replace with true or false based on your requirements
        createdBy: 6,  // Replace with the actual user's ID
      };

      const response = await axios.post(
        "https://saharadeskrestapi.azurewebsites.net/api/Tickets/AddRequestedPartsForTicket",
        requestBody
      );

      if (response.status === 200) {
        // Request was successful
        // You can handle the response as needed
        // For example, clear the form and update the state
        setRequestedParts({
          parts: { selectedPartId: "", selectedPartName: "" },
          location: { selectedLocationId: "", selectedLocationName: "" },
          quantity: 0,
          amount: 0,
        });

        // You may also want to update your state with the response data
        const responseData = response.data;
        console.log("Response Data:", responseData);
      } else {
        console.error("Failed to add requested part");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="commonPage">
      <div className="commonPageCenter">
        <div className="commonPageTop">
          <div className="timerWORef">
            <h3 className="pageTitle requestDetailTitle">
              <p>Work Order</p>
              <p>-</p>
              {itemDetails && <p>{itemDetails.ticketTitle}</p>}
            </h3>
            <div className="timer">02:58</div>
          </div>

          {!canRaiseTicket && (
            <span className="requestNotice requestNoticeWO">
              <span>
                <button className="topWObtn">Start Work</button>
              </span>
              <span>
                <button className="topWObtn">Request Closure</button>
              </span>
              <span>
                <button className="topWObtn">Request Work Done</button>
              </span>
            </span>
          )}


          <div class="dropdown actionDropdown">
            <button
              class="btn btn-light dropdown-toggle actionBtn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul class="dropdown-menu WOactionDropdown">
              <li>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to=""
                  style={{ gap: "15px", color: "#584539" }}
                >
                  <customIcons.plus size={19} />
                  <span>Add Work Order</span>
                </Link>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to=""
                  style={{ gap: "15px", color: "#584539" }}
                >
                  <customIcons.edit size={16} />
                  <span>Edit Work Order</span>
                </Link>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to=""
                  style={{ gap: "15px", color: "#584539" }}
                >
                  <customIcons.share size={16} />
                  <span>Share Work Order</span>
                </Link>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to=""
                  style={{ gap: "15px", color: "#584539" }}
                >
                  <customIcons.card size={16} />
                  <span>Generate Job Card</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/work-order">Work Order</Link>
          <div className="dividerCommonPage"></div>
          <Link className="flex" style={{ gap: "4px" }}>
            <p>Work Order</p>
            {itemDetails && <p>{itemDetails.ticketTitle}</p>}
          </Link>
        </div>
        <p>Can Raise Ticket: {canRaiseTicket ? "Yes" : "No"}</p>
        {/*  */}

        <div className="request-details-page">
          <div className="left woLeft">
            <div className="requestKeyValueContainer">
              <h3 className="request-details-page-main request-details-page-main-WO">
                GENERAL INFOMATION
              </h3>
              <div className="WOdetailsPosition">
                <div className="requestKeyValue requestKeyValue2">
                  <div>
                    <h5>Reported On:</h5>
                    {itemDetails && <p>{itemDetails.createdDate}</p>}
                  </div>

                  <div className="requestKeyValue2StatusContainer">
                    <h6 className="requestKeyValue2StatusH6">Status:</h6>
                    <div class="dropdown">
                      <button
                        class="btn dropdown-toggle requestKeyValue2Status"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Select
                      </button>
                      <ul class="dropdown-menu dropdown-menu-lg-end detailsDropdownStatus">
                        <li>
                          <button class="dropdown-item" type="button">
                            In Progress
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button">
                            On Hold
                          </button>
                        </li>
                        <li>
                          <button class="dropdown-item" type="button">
                            Closed
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="requestKeyValue">
                  <h5>location:</h5>
                  {itemDetails && (
                    <p>{itemDetails.location?.locationName}</p>
                  )}
                </div>
                <div className="requestKeyValue">
                  <h5>Asset:</h5>
                  {itemDetails && (
                    <p>
                      {itemDetails.assets?.map((item) => item.assetName)}
                    </p>
                  )}
                </div>
                <div className="requestKeyValue">
                  <h5>incident description:</h5>
                  {itemDetails && <p>{itemDetails.ticketDescription}</p>}
                </div>
                <div className="requestKeyValue">
                  <h5>incident comment:</h5>
                  <p>Leaking Pipes on Pump A. Urgent fix</p>
                </div>
              </div>

              <h3 className="request-details-page-main request-details-page-main-WO">
                TECHNITIAN/VENDOR INFORMATION
              </h3>

              <div className="WOdetailsPosition">
                <div className="requestKeyValue">
                  <h5>assigned to:</h5>
                  <p>Nexgen</p>
                </div>
                <div className="requestKeyValue">
                  <h5>technitian assigned:</h5>
                  <p>0742592594</p>
                </div>
                <div className="requestKeyValue">
                  <h5>technitian assigned:</h5>
                  <p>John Doe</p>
                </div>
              </div>

              <div className="declineApproveContainner">
                <button className="declineApprove WOAssignbtn">
                  Assign Technician
                </button>
                <button 
                className="declineApprove WOClosebtn"
                onClick={() => handleCloseWorkOrder(itemId)}
                >
                  Close Work Order
                </button>
              </div>
            </div>
          </div>
          <div className="right woRight">
            <div className="workOrderDetail workOrderDetailChecklist">
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main request-details-page-main-WO">
                  CHECKLIST INFORMATION
                </h3>
                <customIcons.down size={14} />
              </div>
              <div className="workOrderDetailContainer">
                <div className="left">
                  <h5 className="workOrderDetailContainerH5">Checklist:</h5>
                  <p className="workOrderDetailContainerP">
                    <div className="WOcheckListDets">
                      {itemDetails && (
                        <span>
                          {itemDetails.TicketChecklistForms?.map((item, i) => {
                            return (
                              <div className="returnChecklist">
                                <span className="WOcheckListDetsCheck">
                                  {" "}
                                  <customIcons.check />{" "}
                                </span>
                                <span>{item.FormsAndSectionsName}</span>
                              </div>
                            );
                          })}
                        </span>
                      )}
                    </div>
                  </p>
                </div>
                <Link to="" className="allLinks">
                  Add Checklist
                </Link>
              </div>
            </div>
            <div
              className={`partTableConatainer partTableConatainerWO ${
                extendPartTable ? "extendWOtable" : ""
              }`}
            >
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main request-details-page-main-WO">
                  PARTS INFORMATION
                </h3>
                <customIcons.down
                  size={14}
                  onClick={handlePartsInfo}
                  style={{ cursor: "pointer" }}
                  className={`allWODropdowns ${
                    extendPartTable ? "" : "rotateDropdown"
                  }`}
                />
              </div>
              <div className="tab-content-WOdets">
                <ul
                  class="nav nav-tabs nav-tabs-WODets"
                  id="myTab"
                  role="tablist"
                >
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active tabs-WODets-btn"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                      PROJECTED
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link tabs-WODets-btn"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      REQUESTED
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link tabs-WODets-btn"
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="contact-tab-pane"
                      aria-selected="false"
                    >
                      RECIEVED
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link tabs-WODets-btn"
                      id="disabled-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#disabled-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="disabled-tab-pane"
                      aria-selected="false"
                    >
                      USED
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link tabs-WODets-btn"
                      id="returned"
                      data-bs-toggle="tab"
                      data-bs-target="#returned-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="returned-tab-pane"
                      aria-selected="false"
                    >
                      RETURNED
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabindex="0"
                  >
                    <table className="partsTable partsTableWO">
                      <thead>
                        <tr>
                          <th>Parts</th>
                          <th>Quantity</th>
                          <th>Amount(ks)</th>
                          <th></th>
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
                                <customIcons.edit
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                                <customIcons.delete
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    tabindex="0"
                  >
                    <table className="partsTable partsTableWO">
                      <thead>
                        <tr>
                          <th>Partss</th>
                          <th>Quantity</th>
                          <th>Amount(ks)</th>
                          <th>Location</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData.TicketRequestedParts.map((item, i) => (
                          <tr key={i}>
                            <td className="tBodyTd">{item.partName}</td>
                            <td className="tBodyTd">{item.quantity}</td>
                            <td className="tBodyTd">{item.amount}</td>
                            <td className="tBodyTd">Forecourt</td>
                            <td className="tBodyTd">
                              <span>
                                <customIcons.edit
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleEditPart(item.id)}
                                />
                                <customIcons.delete
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => handleDeletePart(item.id)}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <Link
                        onClick={handlePartFormRequested}
                        className={` newAddPartLink ${
                          !extendPartTable ? "woDownDispalyNone" : ""
                        } `}
                      >
                        Add Part
                      </Link>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="contact-tab-pane"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                    tabindex="0"
                  >
                    <table className="partsTable partsTableWO">
                      <thead>
                        <tr>
                          <th>Parts</th>
                          <th>Quantity</th>
                          <th>Amount(ks)</th>
                          <th>Location</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {partData.map((item, i) => (
                          <tr key={i}>
                            <td className="tBodyTd">{item.part}</td>
                            <td className="tBodyTd">{item.quantity}</td>
                            <td className="tBodyTd">{item.amount}</td>
                            <td className="tBodyTd">Forecourt</td>
                            <td className="tBodyTd">
                              <span>
                                <customIcons.edit
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                                <customIcons.delete
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <Link
                        onClick={handlePartFormRecieved}
                        className={` newAddPartLink ${
                          !extendPartTable ? "woDownDispalyNone" : ""
                        } `}
                      >
                        Add Part
                      </Link>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="disabled-tab-pane"
                    role="tabpanel"
                    aria-labelledby="disabled-tab"
                    tabindex="0"
                  >
                    <table className="partsTable partsTableWO">
                      <thead>
                        <tr>
                          <th>Parts</th>
                          <th>Quantity</th>
                          <th>Amount(ks)</th>
                          <th>Location</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {partData.map((item, i) => (
                          <tr key={i}>
                            <td className="tBodyTd">{item.part}</td>
                            <td className="tBodyTd">{item.quantity}</td>
                            <td className="tBodyTd">{item.amount}</td>
                            <td className="tBodyTd">Forecourt</td>
                            <td className="tBodyTd">
                              <span>
                                <customIcons.edit
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                                <customIcons.delete
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <Link
                        onClick={handlePartFormUsed}
                        className={` newAddPartLink ${
                          !extendPartTable ? "woDownDispalyNone" : ""
                        } `}
                      >
                        Add Part
                      </Link>
                    </table>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="returned-tab-pane"
                    role="tabpanel"
                    aria-labelledby="returned"
                    tabindex="0"
                  >
                    <table className="partsTable partsTableWO">
                      <thead>
                        <tr>
                          <th>Parts</th>
                          <th>Quantity</th>
                          <th>Amount(ks)</th>
                          <th>Location</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {partData.map((item, i) => (
                          <tr key={i}>
                            <td className="tBodyTd">{item.part}</td>
                            <td className="tBodyTd">{item.quantity}</td>
                            <td className="tBodyTd">{item.amount}</td>
                            <td className="tBodyTd">Forecourt</td>
                            <td className="tBodyTd">
                              <span>
                                <customIcons.edit
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                                <customIcons.delete
                                  size={17}
                                  style={{
                                    color: "#584539",
                                    cursor: "pointer",
                                  }}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <Link
                        onClick={handlePartFormReturned}
                        className={` newAddPartLink ${
                          !extendPartTable ? "woDownDispalyNone" : ""
                        } `}
                      >
                        Add Part
                      </Link>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`partTableConatainer partTableConatainerWO ${
                extendOtherInfoTable ? "extendWOtable" : ""
              }`}
            >
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main request-details-page-main-WO">
                  OTHER COSTS
                </h3>
                <customIcons.down
                  size={14}
                  onClick={handleShowOtherInfo}
                  style={{ cursor: "pointer" }}
                  className={`allWODropdowns ${
                    extendOtherInfoTable ? "" : "rotateDropdown"
                  }`}
                />
              </div>

              <table className="partsTable partsTableWO">
                <thead>
                  <tr>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount(ks)</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tBodyTd">Lunch</td>
                    <td className="tBodyTd">Daily Up Keep</td>
                    <td className="tBodyTd">2000</td>
                    <td className="tBodyTd">
                      <span>
                        <customIcons.edit
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                        <customIcons.delete
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link
                onClick={handleOtherInfoForm}
                className={`${
                  !extendOtherInfoTable ? "woDownDispalyNone" : ""
                } `}
              >
                Add Cost
              </Link>
            </div>

            <div
              className={`partTableConatainer partTableConatainerWO ${
                extendLabourTable ? "extendWOtable" : ""
              }`}
            >
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main request-details-page-main-WO">
                  LABOUR INFORMATION
                </h3>
                <customIcons.down
                  size={14}
                  onClick={handleShowLabour}
                  style={{ cursor: "pointer" }}
                  className={`allWODropdowns ${
                    extendLabourTable ? "" : "rotateDropdown"
                  }`}
                />
              </div>

              <table className="partsTable partsTableWO">
                <thead>
                  <tr>
                    <th>Staff Name</th>
                    <th>Team</th>
                    <th>Cost</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tBodyTd">John Doe</td>
                    <td className="tBodyTd">A-Z Engineering</td>
                    <td className="tBodyTd">ksh 32000</td>
                    <td className="tBodyTd">
                      <span>
                        <customIcons.edit
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                        <customIcons.delete
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link
                onClick={handleLabourForm}
                className={` ${!extendLabourTable ? "woDownDispalyNone" : ""} `}
              >
                Add Labour
              </Link>
            </div>

            <div
              className={`partTableConatainer partTableConatainerWO ${
                extendDiagnosisTable ? "extendWOtable" : ""
              }`}
            >
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main request-details-page-main-WO">
                  DIAGNOSIS & SOLUTION INFORMATION
                </h3>
                <customIcons.down
                  size={14}
                  onClick={handleShowDiagnosis}
                  style={{ cursor: "pointer" }}
                  className={`allWODropdowns ${
                    extendDiagnosisTable ? "" : "rotateDropdown"
                  }`}
                />
              </div>

              <table className="partsTable partsTableWO">
                <thead>
                  <tr>
                    <th>Diagnosis</th>
                    <th>Parts</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="tBodyTd">Broken Pipe Nozzel</td>
                    <td className="tBodyTd">Pipe Nozzel</td>
                    <td className="tBodyTd">
                      <span>
                        <customIcons.edit
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                        <customIcons.delete
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="tBodyTd">Crooked Pipe</td>
                    <td className="tBodyTd">Pipe Nozzel</td>
                    <td className="tBodyTd">
                      <span>
                        <customIcons.edit
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                        <customIcons.delete
                          size={17}
                          style={{
                            color: "#584539",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

              <Link
                onClick={handleDiagnosisForm}
                className={` ${
                  !extendDiagnosisTable ? "woDownDispalyNone" : ""
                } `}
              >
                Add Diagnosis
              </Link>
            </div>

            <div
              className={`partTableConatainer partTableConatainerWO ${
                extendFilesTable ? "extendWOtable" : ""
              }`}
            >
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main request-details-page-main-WO">
                  FILES INFORMATION
                </h3>
                <customIcons.down
                  size={14}
                  onClick={handleShowFiles}
                  style={{ cursor: "pointer" }}
                  className={`allWODropdowns ${
                    extendFilesTable ? "" : "rotateDropdown"
                  }`}
                />
              </div>

              <div className="requestKeyValue">
                <h5>Attachments:</h5>
                <p>Manual.pdf</p>
                <p>Image.png</p>

                <div className="woFiles">
                  <customIcons.attach />
                  <h6>Click to attach</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PARTS INFO PROJECTED */}
      <div className={`formContainer ${!showPartsForm ? "partsFormHide" : ""}`}>
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowPartsForm(!showPartsForm)}
          >
            X
          </div>
          <form onSubmit={handleFormSubmit} className="partsFormWO">
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
      </div>
      {/* PART INFO PROJECTED*/}

      {/* PART INFO REQUESTED*/}
      <div className={`formContainer ${!showPartsRequested ? "partsFormHide" : ""}`}>
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowPartsRequested(!showPartsRequested)}
          >
            X
          </div>
          <form onSubmit={handlePartFormSubmit} className="partsFormWO">
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Requested Part</h3>
              <p className="partFormHeader">Selected Part</p>
              <select
                value={requestedParts.part}
                onChange={(e) =>
                  setRequestedParts({ ...requestedParts, part: e.target.value })
                }
              >
                {
                  partData.map((item) => {
                    return (
                    <option
                    key={item.id}
                    value={item.id}
                    >
                      {item.partName}
                    </option>
                    )
                  })
                }
                {/* <option value="">Select</option>
                <option value="Part 1">Part 1</option>
                <option value="Part 2">Part 2</option>
                <option value="Part 3">Part 3</option> */}
              </select>
              <p className="partFormHeader">Selected Quantity</p>
              <input
                type="number"
                placeholder="Quantity"
                value={requestedParts.quantity}
                onChange={(e) =>
                  setRequestedParts({ ...requestedParts, quantity: e.target.value })
                }
              />
              <p className="partFormHeader">Selected Location</p>
              <select
                value={requestedParts.location}
                onChange={(e) =>
                  setRequestedParts({ ...requestedParts, location: e.target.value })
                }
              >
                {
                  locations?.map((item) => {
                    return (
                    <option
                    key={item.id}
                    value={item.id}
                    >
                      {item.locationName}
                    </option>
                    )
                  })
                }
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {/* PART INFO REQUESTED*/}

      {/* PART INFO RECIEVED*/}
      <div
        className={`formContainer ${!showPartsRecieved ? "partsFormHide" : ""}`}
      >
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowPartsRecieved(!showPartsRecieved)}
          >
            X
          </div>

          <form
            onSubmit={handleFormSubmit} //change this later to submit requested parts
            className="partsFormWO"
          >
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Recieved Part(s)</h3>

              <p className="partFormHeader">Selected Part </p>
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
              <p className="partFormHeader">Selected Location </p>
              <select
                value={formData.part}
                onChange={(e) =>
                  setFormData({ ...formData, part: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Part 1">Narok</option>
                <option value="Part 2">Gigiri</option>
                <option value="Part 3">Wasabi</option>
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {/* PART INFO RECIEVED*/}

      {/* PARTS INFO RETURNED */}
      <div
        className={`formContainer ${!showPartsReturned ? "partsFormHide" : ""}`}
      >
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowPartsReturned(!showPartsReturned)}
          >
            X
          </div>
          <form onSubmit={handleFormSubmit} className="partsFormWO">
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Returned Part(s)</h3>

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
              <p className="partFormHeader">Selected Location </p>
              <select
                value={formData.part}
                onChange={(e) =>
                  setFormData({ ...formData, part: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Part 1">Narok</option>
                <option value="Part 2">Gigiri</option>
                <option value="Part 3">Wasabi</option>
              </select>
              {/* <div className="detailAddCostCheck">
                <label>
                  <input type="checkbox" id="btncheck1" autoComplete="off" />
                  <span class="checkmark">
                    <customIcons.check style={{ color: "white" }} />
                  </span>
                  <p>Add cost to total</p>
                </label>
              </div> */}
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {/* PART INFO RETURNED*/}

      {/** PARTS INFO USED **/}
      <div className={`formContainer ${!showPartsUsed ? "partsFormHide" : ""}`}>
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowPartsUsed(!showPartsUsed)}
          >
            X
          </div>

          <form
            onSubmit={handleFormSubmit} //change this later to submit requested parts
            className="partsFormWO"
          >
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Requested Part</h3>

              <p className="partFormHeader">Selected Part </p>
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
                placeholder="Quantity used"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
              <p className="partFormHeader">Selected Location </p>
              <select
                value={formData.part}
                onChange={(e) =>
                  setFormData({ ...formData, part: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Part 1">Narok</option>
                <option value="Part 2">Gigiri</option>
                <option value="Part 3">Wasabi</option>
              </select>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
      {/** PARTS INFO USED **/}

      {/* OTHER INFO */}
      <div className={`formContainer ${!showOtherInfo ? "partsFormHide" : ""}`}>
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowOtherInfo(!showOtherInfo)}
          >
            X
          </div>
          <form onSubmit={handleFormSubmit} className="partsFormWO">
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Cost</h3>

              <p className="partFormHeader">Cost Description</p>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />

              <p className="partFormHeader">Cost Category</p>
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

              <p className="partFormHeader">Ammount(Ksh)</p>
              <input
                type="text"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
              />
              <div className="detailAddCostCheck">
                <label>
                  <input type="checkbox" id="btncheck1" autoComplete="off" />
                  <span class="checkmark">
                    <customIcons.check style={{ color: "white" }} />
                  </span>
                  <p>Add cost to total</p>
                </label>
              </div>

              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
      {/* OTHER INFO */}

      {/* LABOUR */}
      <div
        className={`formContainer ${!showLabourForm ? "partsFormHide" : ""}`}
      >
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowLabourForm(!showLabourForm)}
          >
            X
          </div>
          <form onSubmit={handleFormSubmit} className="partsFormWO">
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Labour</h3>

              <p className="partFormHeader">Selected Team</p>
              <select
                value={formData.part}
                onChange={(e) =>
                  setFormData({ ...formData, part: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Part 1">Team 1</option>
                <option value="Part 2">Team 2</option>
                <option value="Part 3">Team 3</option>
              </select>

              <p className="partFormHeader">Selected Technician</p>
              <select
                value={formData.part}
                onChange={(e) =>
                  setFormData({ ...formData, part: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Part 1">Technician 1</option>
                <option value="Part 2">Technician 2</option>
                <option value="Part 3">Technician 3</option>
              </select>

              <p className="partFormHeader">Rate Per Hour (Ksh)</p>
              <input
                type="number"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
              <div className="detailAddCostCheck">
                <label>
                  <input type="checkbox" id="btncheck1" autoComplete="off" />
                  <span class="checkmark">
                    <customIcons.check style={{ color: "white" }} />
                  </span>
                  <p>Add cost to total</p>
                </label>
              </div>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </div>
      {/* LABOUR */}

      {/* DIAGNOSIS */}
      <div
        className={`formContainer ${!showDiagnosisForm ? "partsFormHide" : ""}`}
      >
        <div className="formCloseContainer">
          <div
            className="closeForm"
            onClick={() => setShowDiagnosisForm(!showDiagnosisForm)}
          >
            X
          </div>
          <form onSubmit={handleFormSubmit} className="partsFormWO">
            <div className="partsFormInner">
              <h3 className="partsHeader">Add Diagnosis</h3>

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

              <p className="partFormHeader">Diagnosis</p>
              <input
                type="text"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
              />
              <p className="partFormHeader">Describe Diagnosi</p>
              <textarea style={{ height: "100px" }}></textarea>
              <p className="partFormHeader">Describe Solution</p>
              <textarea style={{ height: "100px" }}></textarea>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
      {/* DIAGNOSIS */}

      {/* CLOSE WORKORDER */}
      
      {showCloseForm && (
        <div className="closeWorkOrderContainer">
<CloseWorkOrder itemId={closeFormItemId} setShowCloseForm={setShowCloseForm} />
        </div>
        
      )}
      
      {/* CLOSE WORKORDER */}
    </div>
  );
}

export default WorkOrderDetailsPage;
