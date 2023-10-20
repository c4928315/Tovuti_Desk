import React, { useContext } from "react";
import Box from "@mui/material/Box";
import { Button, Checkbox, TextField } from "@material-ui/core";
import { MultiStepContext } from "../Context";
import "./steps.css";

const assetCategory = [
  {
    value: "Asset category 1",
    label: "Asset category 1",
  },
  {
    value: "Asset category 2",
    label: "Asset category 2",
  },
  {
    value: "Asset category 3",
    label: "Asset category 3",
  },
  {
    value: "foAsset category 4",
    label: "Asset category 4",
  },
];

const locations = [
  {
    value: "Kenya",
    label: "Kenya",
  },
  {
    value: "Uganda",
    label: "Uganda",
  },
  {
    value: "Tanzania",
    label: "Tanzania",
  },
  {
    value: "Rwanda",
    label: "Rwanda",
  },

  //value gets shown
];

const assets = ["Asset 1", "Asset 2", "Asset 3", "Asset 4"];

function StepAsset() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);

  console.log(userData);

  const handleAssetCheckboxChange = (assets) => {
    const { asset } = userData;

    const updatedasset = asset.includes(assets)
      ? asset.filter((selectedAsset) => selectedAsset !== assets)
      : [...asset, assets];

    setUserData({ ...userData, asset: updatedasset });
  };

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
          <div>
            <TextField
              id="outlined-select-currency-native"
              select
              className="stepInput"
              InputProps={{ disableUnderline: true }}
              label="location"
              value={userData["location"] ? userData["location"].value : ""}
              onChange={(e) => {
                const selectedValue = e.target.value;
                const selectedLabel =
                  e.nativeEvent.target[e.nativeEvent.target.selectedIndex].text;
                setUserData({
                  ...userData,
                  location: {
                    selectedLocation: selectedValue,
                    selectedLocationLabel: selectedLabel
                  },
                });
              }}
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
            >
              {locations.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>

            <br />
            <TextField
              id="outline-select-currency-native"
              select
              label="assetCategory"
              InputProps={{ disableUnderline: true }}
              className="stepInput"
              value={userData["assetCategory"]}
              onChange={(e) =>
                setUserData({ ...userData, assetCategory: e.target.value })
              }
              defaultValue="EUR"
              SelectProps={{
                native: true,
              }}
              variant="standard"
            >
              {assetCategory.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </div>
          <div>
            <h4>Asset(s)</h4>
            <h4 className="notHeader">select</h4>
            {assets.map((asset) => (
              <div key={asset} className="checkBox">
                <Checkbox
                  checked={userData.asset.includes(asset)}
                  onChange={() => handleAssetCheckboxChange(asset)}
                />
                <label>{asset}</label>
              </div>
            ))}
          </div>
        </div>

        <Button
          variant="contained"
          className="nextBtn"
          color="primary"
          onClick={() => setStep(2)}
        >
          Next
        </Button>
      </Box>
    </div>
  );
}

export default StepAsset;
