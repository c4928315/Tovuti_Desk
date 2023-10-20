import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { MultiStepContext } from "../Context";

function StepSummary() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);

  console.log(userData);

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
    // Replace 'your-api-endpoint' with your actual API endpoint
    const apiUrl = "https://intra-deco.onrender.com/workOrder";

    // Make a POST request to the API
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
      <div >
        <h3 className="summaryHeader">Assets</h3>

        <div>
          <div>
          <h6>Location</h6>
          {/* <p>{userData.location}</p> */}

          <h6>asset category</h6>
          {/* <p>{userData.assetCategory}</p> */}
          </div>

          <div>
            <h6>Assets</h6>
            {/* {userData.asset.map((item) => item)} */}
          </div>
        </div>
      </div>

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
