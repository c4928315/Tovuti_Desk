import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import customIcons from "../../Icons/icons";

function StepSummary() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);
  const { dataParts } = useFetch("https://intra-deco.onrender.com/Parts");

  console.log(userData);

  const navigate = useNavigate();

  const handleDataSubmissionAndSave = () => {
    // Submit data to the API
    submitDataToAPI(userData);

    // Save data to local storage
    saveDataToLocalStorage(userData);

    // Optionally, navigate to the next step
    setStep(4);
  };

  const submitDataToAPI = (userData) => {
    const apiUrl = "https://intra-deco.onrender.com/workOrders";

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.ok) {
          // Data was successfully sent to the API
          return response.json();
        } else {
          throw new Error("Data submission failed.");
        }
      })
      .then((responseData) => {
        // Handle the API response, if needed
        console.log("API response:", responseData);
        // navigate("work-order")
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  const saveDataToLocalStorage = (userData) => {
    try {
      const dataToStore = JSON.stringify(userData);
      localStorage.setItem("userData", dataToStore);
      console.log("Data saved to local storage.");
    } catch (error) {
      console.error("Error saving data to local storage:", error);
    }
  };

  return (
    <div className="summarryStep">
      <h3 className="summaryMainHeader">Summary</h3>
      <div>
        <div className="summaryHeaderContainer">
          <h3 className="summaryHeader">Assets</h3>
          <span onClick={() => setStep(1)}>
            <customIcons.edit />
            <p>Edit</p>
          </span>
        </div>

        <div>
          <div className="workOrderSummary">
            <div>
              <h6 className="subHeaderSummary">Location:</h6>
              <p className="mainInfoSummary">
                {userData.TicketLocation.LocationName}
              </p>
            </div>

            <div className="WOsummaryRight">
              <h6 className="subHeaderSummary">asset category:</h6>
              <p className="mainInfoSummary">
                {userData.TicketCategoryOfWork.CategoryOfWorkName}
              </p>
            </div>
          </div>

          <div>
            <h6 className="subHeaderSummary">Assets:</h6>
            <p className="mainInfoSummary ">
              {userData.TicketAssets.map((item) => {
                return <div className="blockSummary">{item.assetName}</div>;
              })}
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="summaryHeaderContainer">
          <h3 className="summaryHeader">Work Order(s)</h3>
          <span onClick={() => setStep(2)}>
            <customIcons.edit />
            <p>Edit</p>
          </span>
        </div>

        <div className="summaryMainFlex">
          <p className="subHeaderSummary">Work Order 1:</p>

          <p className="mainInfoSummary">
            {/* {userData.TicketAssets[0].assetName} */}
          </p>
        </div>

        <div className="workOrderSummary">
          <div>
            <p className="subHeaderSummary">Work Order Title:</p>
            <p className="mainInfoSummary">{userData.TicketTitle}</p>
          </div>
          <div className="WOsummaryRight">
            <p className="subHeaderSummary">Description:</p>
            <p className="mainInfoSummary">{userData.TicketDescription}</p>
          </div>
        </div>

        <div className="workOrderSummary">
          <div>
            <p className="subHeaderSummary">Category Of Work:</p>
            <p className="mainInfoSummary">
              {userData.TicketCategoryOfWork.CategoryOfWorkName}
            </p>
          </div>
          <div className="WOsummaryRight">
            <p className="subHeaderSummary">Priority:</p>
            <p className="mainInfoSummary priorityBtn">
              {userData.TicketPriority.TicketPriorityName}
            </p>
          </div>
        </div>

        <div className="workOrderSummary">
          <div>
            <p className="subHeaderSummary">Team:</p>
            <p className="mainInfoSummary">
              {userData.TicketCurrentTeam.CurrentAssignedTeamName}
            </p>
          </div>

          <div className="WOsummaryRight">
            <p className="subHeaderSummary">Additional Team:</p>
            <p className="mainInfoSummary">
              {userData.TicketAdditionalTeams.map((item) => {
                return <div>{item.TeamName}</div>;
              })}
            </p>
          </div>
        </div>

        <div className="workOrderSummary">
          <div>
            <p className="subHeaderSummary">Technitian Signature Required?</p>
            <p className="mainInfoSummary">
              {userData.TechnitianSignature ? "Yes" : "No"}
            </p>
          </div>
          <div className="WOsummaryRight">
            <p className="subHeaderSummary">Estimated Hours:</p>
            <p className="mainInfoSummary">{userData.EstimatedHours}</p>
          </div>
        </div>

        <div className="workOrderSummaryBlock">
          <div>
            <p className="subHeaderSummary">CheckLists:</p>
            <div className="mainInfoSummary">
              {userData.TicketChecklistForms.map((item) => {
                return (
                 <div>
                  {item.FormsAndSectionsName}
                 </div> 
                )
              })}
            </div>
          </div>
        </div>

        <div className="workOrderSummaryBlock">
          <div>
            <p className="subHeaderSummary">Projected Parts:</p>
            <div className="mainInfoSummary">
              {userData.TicketProjectedParts.map((item) => {
                return (
                 <div>
                  {item.part}
                 </div> 
                )
              })}
            </div>
          </div>
        </div>
        <hr />
        <div className="workOrderSummaryBlock">
          <div>
            <div className="summaryHeaderContainer">
              <p className="summaryHeader">Other Informayion:</p>
              <span onClick={() => setStep(3)}>
                <customIcons.edit />
                <p>Edit</p>
              </span>
            </div>

            <p className="subHeaderSummary">Files</p>
            <p className="mainInfoSummary">pump1.png</p>
          </div>
        </div>
      </div>
<div className="submitWOContainer">
  <Button
        variant="contained"
        color="primary"
        onClick={handleDataSubmissionAndSave}
        className="submitWO"
      >
        Submit
      </Button>
</div>
      
    </div>
  );
}

export default StepSummary;
