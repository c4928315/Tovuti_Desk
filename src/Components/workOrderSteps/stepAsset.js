import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import customIcons from "../../Icons/icons";
import "./steps.css";

const locations = [
  {
    value: 1,
    label: "Kenya",
    assetCategory: [
      {
        CategoryId: 1,
        CategoryName: "Movers",
        Assets: [
          {
            AssetId: 1,
            AssetName: "Pump",
          },
          {
            AssetId: 2,
            AssetName: "Cooler",
          },
        ],
      },
      {
        CategoryId: 2,
        CategoryName: "Shaker",
        Assets: [
          {
            AssetId: 3,
            AssetName: "Generator",
          },
          {
            AssetId: 4,
            AssetName: "Drill",
          },
        ],
      },
    ],
  },
  {
    value: 2,
    label: "Uganda",
    assetCategory: [
      {
        CategoryId: 14,
        CategoryName: "Movers2",
        Assets: [
          {
            AssetId: 10,
            AssetName: "Pump2",
          },
          {
            AssetId: 5,
            AssetName: "Cooler2",
          },
        ],
      },
      {
        CategoryId: 20,
        CategoryName: "Shaker2",
        Assets: [
          {
            AssetId: 30,
            AssetName: "Generator2",
          },
          {
            AssetId: 40,
            AssetName: "Drill2",
          },
        ],
      },
    ],
  },
  {
    value: 3,
    label: "Tanzania",
    assetCategory: [
      {
        CategoryId: 100,
        CategoryName: "Movers3",
        Assets: [
          {
            AssetId: 12,
            AssetName: "Pump3",
          },
          {
            AssetId: 24,
            AssetName: "Cooler3",
          },
        ],
      },
      {
        CategoryId: 200,
        CategoryName: "Shaker3",
        Assets: [
          {
            AssetId: 30,
            AssetName: "Generator3",
          },
          {
            AssetId: 40,
            AssetName: "Drill3",
          },
        ],
      },
    ],
  },
  {
    value: 4,
    label: "Rwanda",
    assetCategory: [
      {
        CategoryId: 130,
        CategoryName: "Movers4",
        Assets: [
          {
            AssetId: 120,
            AssetName: "Pump4",
          },
          {
            AssetId: 204,
            AssetName: "Cooler4",
          },
        ],
      },
      {
        CategoryId: 210,
        CategoryName: "Shaker4",
        Assets: [
          {
            AssetId: 301,
            AssetName: "Generator4",
          },
          {
            AssetId: 410,
            AssetName: "Drill4",
          },
        ],
      },
    ],
  },
];

function StepAsset() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);
  const [selectedAssetCategory, setSelectedAssetCategory] = useState("");
  const [selectedAssets, setSelectedAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [location, setLocation] = useState([]);
  const [assetCategories, setAssetCategories] = useState([]);

  const handleAssetCheckboxChange = (asset) => {
    const { TicketAssets } = userData;
    const assetIndex = TicketAssets.findIndex(
      (selectedAsset) => selectedAsset.AssetId === asset.AssetId
    );

    if (assetIndex !== -1) {
      // Asset exists, remove it
      const updatedTicketAssets = [...TicketAssets];
      updatedTicketAssets.splice(assetIndex, 1);
      setUserData({ ...userData, TicketAssets: updatedTicketAssets });
    } else {
      // Asset doesn't exist, add it
      setUserData({
        ...userData,
        TicketAssets: [...TicketAssets, asset],
      });
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
        .then((data) => console.log("asset", setAssets(data)))
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
                        <label>{asset.assetName}</label>
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
