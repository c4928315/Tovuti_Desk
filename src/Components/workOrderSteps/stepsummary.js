import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import useFetch from "../../Hooks/useFetch";
import { useNavigate } from "react-router-dom";

function StepSummary() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);
  const { dataParts } = useFetch("https://intra-deco.onrender.com/Parts")

  console.log(userData);

  const navigate = useNavigate()

  const handleDataSubmissionAndSave = () => {
    // Submit data to the API
    submitDataToAPI(userData);

    // Save data to local storage
    saveDataToLocalStorage(userData);

    // You can also reset the userData state if needed
    setUserData({
      location: "",
      selectedAssets: [],
      asset: "",
      description: "",
    });

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
          
          return response.json();
        } else {
          throw new Error("Data submission failed.");
        }
      })
      .then((responseData) => {
        
        console.log("API response:", responseData);
        
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
      <h3>Other Infomation</h3>
      {/* <div >
        <h3 className="summaryHeader">Assets</h3>

        <div>
          <div>
          <h6>Location</h6>
          <p>{userData.TicketLocation.LocationName}</p>

          <h6>asset category</h6>
          <p>{userData.TicketCategoryOfWork.CategoryOfWorkName}</p>
          </div>

          <div>
            <h6>Assets</h6>
            {userData.TicketAssets.map((item) => item.AssetName)}
          </div>
        </div>
      </div>

      <div>
      <h3 className="summaryHeader">Work Order(s)</h3>

      <p>Work Order 1 :</p> {userData.TicketAssets.map((item) => item[0] && item[0].AssetName)}

      <div className="workOrderSummary">
        <div>
          <p className="summaryPTop">Work Order Title:</p>
          <p className="summaryPBottom">{userData.TicketTitle}</p>
        </div>
        <div>
          <p className="summaryPTop">Description:</p>
          <p className="summaryPBottom">{userData.TicketDescription}</p>
        </div>
      </div>

      <div className="workOrderSummary">
        <div>
          <p className="summaryPTop">Category Of Work:</p>
          <p className="summaryPBottom">{userData.TicketCategoryOfWork.CategoryOfWorkName}</p>
        </div>
        <div>
          <p className="summaryPTop">Priority:</p>
          <p className="summaryPBottom">{userData.TicketPriority.TicketPriorityName}</p>
        </div>
      </div>

      <div className="workOrderSummary">
        <div>
          <p className="summaryPTop">Team:</p>
          <p className="summaryPBottom">{userData.TicketCurrentTeam.CurrentAssignedTeamName}</p>
        </div>

        <div>
          <p className="summaryPTop">Additional Team:</p>
          <p className="summaryPBottom">{userData.TicketAdditionalTeams.map((item) => {
            return (
              <div>{item.TeamName}</div>
            )
            })}</p>
        </div>
      </div>

      <div className="workOrderSummary">
        <div>
          <p className="summaryPTop">Technitian Signature Required?</p>
          <p className="summaryPBottom">{userData.TechnitianSignature}</p>
        </div>
        <div>
          <p className="summaryPTop">Estimated Hours:</p>
          <p className="summaryPBottom">{userData.TechnitianSignature ? "Yes" : "No"}</p>
        </div>
      </div>

      <div className="workOrderSummaryBlock">
      <div>
          <p className="summaryPTop">CheckLists:</p>
          <div className="summaryPBottom">
            {userData.TicketChecklistForms.FormsAndSectionsName}
          </div>
        </div>
      </div>

      <div className="workOrderSummaryBlock">
      <div>
          <p className="summaryPTop">Projected Parts:</p>
          
        </div>
      </div>

      <div className="workOrderSummaryBlock">
      <div>
          <p className="summaryHeader">Other Informayion:</p>
          <p className="summaryPTop">Files</p>
          <p className="summaryPBottom">pump1.png</p>
        </div>
      </div>

      

      
      

      </div> */}

      <Button
        variant="contained"
        color="primary"
        onClick={handleDataSubmissionAndSave}
      >
        Submit
      </Button>
    </div>
  );
}

export default StepSummary;
