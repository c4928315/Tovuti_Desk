import { Button } from "@material-ui/core";
import React, { useContext } from "react";
import customIcons from "../../Icons/icons";
import { MultiStepContext } from "../Context";

function StepOtherInfo() {
  const { setStep, userData, setUserData } = useContext(MultiStepContext);

  return (
    <div>
      <h3>Other Info</h3>
      <div className="formRowRight">
        <h3 className="requestHeader">upload file</h3>
        <div class="input-group mb-3 faultFile">
          <label
            class="input-group-text attachFileLabel"
            for="inputGroupFile02"
          >
            <customIcons.attach />
          </label>
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
      <div stepBtnContainer>
      <Button variant="contained" className="nextBtn" color="primary" onClick={() => setStep(2)}>back</Button>
      <Button variant="contained" className="nextBtn" color="primary" onClick={() => setStep(4)}>next</Button>
      </div>
    </div>
  );
}

export default StepOtherInfo;
