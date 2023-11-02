import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import customIcons from "../../Icons/icons";
import "./steps.css";


function StepAsset() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);
  const [selectedAssetCategory, setSelectedAssetCategory] = useState("");
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [location, setLocation] = useState([]);
  const [assetCategories, setAssetCategories] = useState([]);

  const handleAssetCheckboxChange = (asset) => {
    const { TicketAssets } = userData;
    console.log("Before Asset Change:", TicketAssets); // Log the array before the update
  
    const assetIndex = TicketAssets.findIndex(
      (selectedAsset) => selectedAsset.AssetId === asset.AssetId
    );
  
    if (assetIndex !== -1) {
      // Asset exists, remove it
      console.log("Removing asset:", asset);
      const updatedTicketAssets = [...TicketAssets];
      updatedTicketAssets.splice(assetIndex, 1);
      console.log("Updated TicketAssets after removal:", updatedTicketAssets); // Log the updated array
      setUserData({ ...userData, TicketAssets: updatedTicketAssets });
    } else {
      // Asset doesn't exist, add it
      console.log("Adding asset:", asset);
      setUserData({
        ...userData,
        TicketAssets: [...TicketAssets, asset],
      });
      console.log("Updated TicketAssets after addition:", [...TicketAssets, asset]); // Log the updated array
    }
  };
  
  

  useEffect(() => {
    fetch("https://saharadeskrestapi.azurewebsites.net/api/Assets/Categories")
      .then((response) => response.json())
      .then((data) => setAssetCategories(data))
      .catch((error) =>
        console.error("Error fetching asset categories: " + error)
      );
  }, []);

  useEffect(() => {
    fetch("https://saharadeskrestapi.azurewebsites.net/api/Locations")
      .then((response) => response.json())
      .then((data) => console.log("assetCategory", setLocation(data)))
      .catch((error) =>
        console.error("Error fetching asset categories: " + error)
      );
  }, []);

  const handleAssetCategoryChange = (categoryId) => {
    setSelectedAssetCategory(categoryId);

    if (categoryId) {
      fetch(
        `https://saharadeskrestapi.azurewebsites.net/api/Assets/GetAssetsByCategory/${categoryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAssets(data)
          console.log(data)
        })
        
        .catch((error) => console.error("Error fetching assets: " + error));
    } else {
      setAssets([]);
    }
  };

  console.log(userData);

  return (
    <div className="allStepAsset">
      <h3 className="stepTopHeader">Asset(s)</h3>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div className="innerAsset">
          <div className="allEncompassing">
            <div className="categoryAssetscontainer">
              <div>
                <h3>Location</h3>
                <div className="selectNewContainer selectNewContainerWO">
                  <select
                    className="requestSelect"
                    value={userData.TicketLocation.LocationId}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const selectedLabel =
                        e.nativeEvent.target[e.nativeEvent.target.selectedIndex]
                          .text;
                      setUserData({
                        ...userData,
                        TicketLocation: {
                          LocationId: parseInt(selectedValue),
                          LocationName: selectedLabel,
                        },
                        TicketCategoryOfWork: {
                          CategoryOfWorkId: null,
                          CategoryOfWorkName: "",
                        },
                        TicketAssets: [], // Reset assets
                      });
                    }}
                  >
                    <option value="" className="WoFade">
                      Select
                    </option>
                    {location.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.locationName}
                      </option>
                    ))}
                  </select>
                  <customIcons.down className="selectNewIcon" size={13} />
                </div>
              </div>

              <div className="categoryAssetsFlex">
                <div className="categoryAssets">
                  <span>
                    <h3>Asset Category</h3>
                    <div className="selectNewContainer selectNewContainerWO selectNewContainerWOHalf">
                      <select
                        className="requestSelect"
                        value={selectedAssetCategory}
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          handleAssetCategoryChange(selectedValue); // Call the function with the selected value
                        }}
                      >
                        <option value="" className="WoFade">
                          Select
                        </option>
                        {assetCategories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.assetCategoryName}
                          </option>
                        ))}
                      </select>

                      <customIcons.down className="selectNewIcon" size={13} />
                    </div>
                  </span>
                </div>
                <span className="assetsSpan">
                  <h4>Asset(s)</h4>
                  <h4 className="notHeader WoFade">Select</h4>
                  {assets
                    .filter(
                      (asset) =>
                        asset.assetCategoryId ===
                        parseInt(selectedAssetCategory)
                    )
                    .map((asset) => (
                      <div key={asset.id} className="checkBox">
                        <Checkbox
                          style={{ color: "orange" }}
                          checked={selectedAssets.some(
                            (selectedAsset) => selectedAsset.id === asset.id
                          )}
                          onChange={() => handleAssetCheckboxChange(asset)}
                        />
                        <span>{asset.assetName}</span>
                      </div>
                    ))}
                </span>
              </div>
            </div>
            <Button
              variant="contained"
              className="nextBtn assetNextBtn"
              color="primary"
              onClick={() => setStep(2)}
            >
              Next
            </Button>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default StepAsset;
