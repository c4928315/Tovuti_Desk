import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import customIcons from "../../Icons/icons";
import { MultiStepContext } from "../Context";

function StepOtherInfo() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);

  console.log(userData)

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newFileArray = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      if (file.size > 2 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds the 2MB size limit and will not be uploaded.`);
      } else {
        const reader = new FileReader();
        reader.onload = (event) => {
          const base64Data = event.target.result.split(',')[1]; // Extract base64 data
          newFileArray.push({ name: file.name, base64: base64Data });
          setUserData({ ...userData, files: newFileArray });
        };
        reader.readAsDataURL(file);
      }
    }
  };


  return (
    <div className="otherInfoWo">
    <h3>Other Infomation</h3>
    <div className="formRowRight">
      <h3 className="requestHeader">Upload Files</h3>
      <div className="input-group mb-3 faultFile">
        <div className="input-group-text attachFileLabel" htmlFor="inputGroupFile02">
          <customIcons.attach />
        </div>
        <input
          type="file"
          multiple
          className="form-control attachFile"
          id="inputGroupFile02"
          onChange={handleFileChange}
        />
      </div>
    </div>
    <div className="newWoBtn">
      <Button
        variant="contained"
        color="primary"
        onClick={() => setStep(2)}
        className="nextBtn assetPrevBtn"
      >
        Back
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setStep(4)}
        className="nextBtn assetNextBtn"
      >
        Next
      </Button>
    </div>
  </div>
  );
}

export default StepOtherInfo;
