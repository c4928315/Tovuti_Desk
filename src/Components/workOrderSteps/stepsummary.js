import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";
import customIcons from "../../Icons/icons";

function StepSummary() {
  const { setStep, userData } = useContext(MultiStepContext);

 

  const navigate = useNavigate();

  console.log(userData)

  const handleDataSubmissionAndSave = () => {

    let arrayAsset = []
    userData.TicketAssets.map((asset) => arrayAsset.push(asset.id))

    let arrayChecklist = []
    userData.TicketChecklistForms.map((i) => arrayChecklist.push(i.FormsAndSectionsId))

    let arrayAddTeam = []
    userData.TicketAdditionalTeams.map((i) => arrayAddTeam.push(i.TeamId))

    let arrayProjectedParts = []
    userData.TicketProjectedParts.map((i) => arrayProjectedParts.push({
      spareId: parseInt(i.spareId),
      quantity: parseInt(i.quantity)
    }))

    // let imagesArray = []
    // userData.files?.map((file) => imagesArray.push(file.base64))

    let imagesArray = userData.files ? userData.files.map(file => file.base64) : [];



   const currentUser = localStorage.getItem("userInfo")

   const ApiData = 
    {
      locactionId: parseInt(userData.TicketLocation.LocationId, 10),
      categoryOfWorkId: parseInt(userData.categoryOfWork.id, 10),
      ticketTitle: userData.TicketTitle,
      ticketDescription: userData.TicketDescription,
      assetId: arrayAsset,
      checklists: arrayChecklist,
      situation: 0,
      ticketPriorityId: userData.TicketPriority.TicketPriorityId,
      primaryTeam: parseInt(userData.TicketCurrentTeam.CurrentAssignedTeamId, 10),
      secondaryTeam: 1,
      signatureRequiredToCompleteWork: userData.TechnitianSignature,
      estimatedHours: parseInt(userData.EstimatedHours, 10),
      projectedParts: arrayProjectedParts,
      images: imagesArray,
      createdBy: parseInt(JSON.parse(currentUser)?.id, 10)
    }
   
   submitDataToAPI(ApiData);


    saveDataToLocalStorage(ApiData);


    setStep(4);
  };

  const submitDataToAPI = (ApiData) => {
    const apiUrl = "https://saharadeskrestapi.azurewebsites.net/api/Tickets/RaiseTicket";
  
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ApiData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Data submission failed.");
        }
      })
      .then((workOrderResponse) => {
        // Handle the API response data, if needed
        console.log("API response:", workOrderResponse);
  
        // Save the response data to local storage
        saveWOResponseLocalStorage(workOrderResponse);
  
        navigate('/work-order')
      })
      .catch((error) => {
        console.error("API Error:", error);
      });
  };

  
  const saveWOResponseLocalStorage = (workOrderResponse) => {
    try {
      const dataToStore = JSON.stringify(workOrderResponse);
      localStorage.setItem("workOrderResponse", dataToStore);
      console.log("Response data saved to local storage.");
    } catch (error) {
      console.error("Error saving response data to local storage:", error);
    }
  };
  

  const saveDataToLocalStorage = (userData) => {
    try {
      const dataToStore = JSON.stringify(userData);
      localStorage.setItem("userData", dataToStore);
      console.log("Data saved to local storage." );
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
                {userData.TicketAssetCategory.name}
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
            {userData.TicketAssets[0]?.assetName}
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
              {userData.categoryOfWork.categoryOfWorkName}
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
                return <div>{item.teamName}</div>;
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
              {userData.TicketProjectedParts?.map((item) => {
                return (
                 <div>
                  {item.partName}
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
            {
              userData.files?.map((i) => {
                return (
                  <p className="mainInfoSummary">{i.name}</p>  
                )
              })
            }
            
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
