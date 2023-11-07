import React, { useContext, useEffect, useRef, useState } from "react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [assetCategorySearchQuery, setAssetCategorySearchQuery] = useState("");
  const [isLocationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [isAssetDropdownOpen, setAssetDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select");
const [selectedCategory, setSelectedCategory] = useState("Select");
const [selectedAssetText, setSelectedAssetText] = useState("Select");
  const dropdownRef = useRef(null);


 // Inside the handleAssetCheckboxChange function, set the selected asset text and selectedLocation
const handleAssetCheckboxChange = (asset) => {
  const { TicketAssets } = userData;

  if (TicketAssets) {
    const assetIndex = TicketAssets.findIndex(
      (selectedAsset) => selectedAsset.AssetId === asset.AssetId
    );

    if (assetIndex !== -1) {
      const updatedTicketAssets = [...TicketAssets];
      updatedTicketAssets.splice(assetIndex, 1);
      setUserData({ ...userData, TicketAssets: updatedTicketAssets });
    } else {
      setUserData({
        ...userData,
        TicketAssets: [...TicketAssets, asset],
      });
    }
    setSelectedAssetText(asset.assetName);
    const selectedLocation = !userData.TicketLocation
    ? userData.TicketLocation.LocationName
    : "Select";
  setSelectedLocation(selectedLocation);

  setAssetDropdownOpen(false); // Reset selectedLocation
    setAssetDropdownOpen(false);
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
  setSelectedCategory(assetCategories.find(category => category.id === categoryId)?.assetCategoryName || "Select");
  const selectedLocation = !userData.TicketLocation
    ? userData.TicketLocation.LocationName
    : "Select";
  setSelectedLocation(selectedLocation);
  
    if (categoryId) {
      fetch(
        `https://saharadeskrestapi.azurewebsites.net/api/Assets/GetAssetsByCategory/${categoryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          setAssets(data);
          // Create the TicketAssetCategory object and update the userData
          const selectedCategory = assetCategories.find((category) => category.id === categoryId);
          const ticketAssetCategory = {
            id: selectedCategory.id,
            name: selectedCategory.assetCategoryName,
          };
          setUserData({
            ...userData,
            TicketAssets: [],
            TicketAssetCategory: ticketAssetCategory, // Store the selected category in userData
          });
        })
        .catch((error) => console.error("Error fetching assets: " + error));
    } else {
      setAssets([]);
      // If no category is selected, you may want to clear the TicketAssetCategory in userData
      setUserData({
        ...userData,
        TicketAssets: [],
        TicketAssetCategory: null,
      });
    }
  
    setCategoryDropdownOpen(false);
  };
  

  console.log(userData);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setLocationDropdownOpen(false);
      setCategoryDropdownOpen(false);
      setAssetDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredLocations = location.filter((option) =>
    option.locationName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAssetCategories = assetCategories.filter((category) =>
    category.assetCategoryName
      .toLowerCase()
      .includes(assetCategorySearchQuery.toLowerCase())
  );

  console.log("Selected Location: ", selectedLocation);

  return (
    <div className="allStepAsset"  ref={dropdownRef}>
      <h3 className="stepTopHeader">Asset(s)</h3>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 3, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
        ref={dropdownRef}
      >
        <div className="innerAsset"  ref={dropdownRef}>
          <div className="allEncompassing"
           ref={dropdownRef}
          >
            <div className="categoryAssetscontainer"  ref={dropdownRef}>
              <div>
                <h3>Location</h3>
                <div className="selectNewContainer selectNewContainerWO">
                  <div
                    className="custom-select"
                    onClick={() =>{
                      setLocationDropdownOpen(!isLocationDropdownOpen);
                      setCategoryDropdownOpen(false);
                      setAssetDropdownOpen(false);
                    }
                    }
                  >
                    <p className="customSelectOption">{userData.TicketLocation?.LocationName || "select"}</p>
                    <div
                      className={`custom-select-dropdown ${
                        isLocationDropdownOpen ? "showMenu" : "hideMenu"
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="danContainer">
                      <div className="search-container" >
                        <input
                          type="text"
                          className="form-control search-input custom-search-input"
                          placeholder="Search Locations..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          
                        />
                      </div>
                      <ul
                        className={`location-dropdown ${
                          isLocationDropdownOpen ? "open" : ""
                        }`}
                      >
                        {filteredLocations.map((option) => (
                          <li
                            key={option.id}
                            onClick={() => {
                              const selectedValue = option.id;
                              const selectedLabel = option.locationName;
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
                              setLocationDropdownOpen(false);
                            }}
                          >
                            {option.locationName}
                          </li>
                        ))}
                      </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="categoryAssetsFlex">
                <div className="categoryAssets">
                  <span>
                    <h3>Asset Category</h3>
                    <div className="selectNewContainer selectNewContainerWO">
                      <div
                        className="custom-select"
                        onClick={() =>{
                          setCategoryDropdownOpen(!isCategoryDropdownOpen);
                          setLocationDropdownOpen(false);
                          setAssetDropdownOpen(false);
                        }
                        }
                      >
                        <p className="customSelectOption">{selectedCategory}</p>
                        <div
                          className={`custom-select-dropdown ${
                            isCategoryDropdownOpen ? "showMenu" : "hideMenu"
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="danContainer">
<div className="search-container">
                            <input
                              type="text"
                              className="form-control search-input"
                              placeholder="Search Asset Categories..."
                              value={assetCategorySearchQuery}
                              onChange={(e) =>
                                setAssetCategorySearchQuery(e.target.value)
                              }
                            />
                            </div>
                            <ul className="asset-category-dropdown">
                              {filteredAssetCategories.map((category) => (
                                <li
                                  key={category.id}
                                  onClick={() => {
                                    const selectedValue = category.id;
                                    handleAssetCategoryChange(selectedValue);
                                    setAssetCategorySearchQuery(""); // Clear the search query
                                  }}
                                >
                                  {category.assetCategoryName}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
                <span className="assetsSpan">
                  <h4>Asset(s)</h4>
                  <h4 className="notHeader WoFade">{selectedAssetText}</h4>
                  {assets.length > 0 ? (
                    <div className="assetsINAsstsWrapper">
                      <div className="danContainer">
                      <div class="search-container">
                        <input
                          type="text"
                          class="form-control search-input"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                        />
                      </div>

                      {assets
                        .filter(
                          (asset) =>
                            asset.assetCategoryId ===
                            parseInt(selectedAssetCategory)
                        )
                        .filter((asset) =>
                          asset.assetName
                            .toLowerCase()
                            .includes(searchQuery.toLowerCase())
                        )
                        .map((asset) => (
                          <div key={asset.id} className="checkBox">
                            <Checkbox
                              style={{ color: "white" }}
                              defaultChecked={selectedAssets.some(
                                (selectedAsset) => selectedAsset.id === asset.id
                              )}
                              onChange={() => handleAssetCheckboxChange(asset)}
                            />
                            <span>{asset.assetName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
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

