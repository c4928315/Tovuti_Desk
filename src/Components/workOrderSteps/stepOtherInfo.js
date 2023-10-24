import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import customIcons from "../../Icons/icons";
import { MultiStepContext } from "../Context";

function StepOtherInfo() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);

  return (
    <div className="otherInfoWo">
      <h3>Other Infomation</h3>
      <div className="formRowRight">
        <h3 className="requestHeader">upload file</h3>
        <div class="input-group mb-3 faultFile">
          <div
            class="input-group-text attachFileLabel"
            for="inputGroupFile02"
          >
            <customIcons.attach />
          </div>
          <input
            type="file"
            class="form-control attachFile"
            id="inputGroupFile02"
            label="files"
            value={userData["files"]}
            onChange={(e) =>
              setUserData({ ...userData, files: e.target.value })
            }
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
