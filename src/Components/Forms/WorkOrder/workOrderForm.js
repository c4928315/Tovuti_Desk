import React, { useContext } from "react";
import StepAsset from "../../workOrderSteps/stepAsset";
import StepOtherInfo from "../../workOrderSteps/stepOtherInfo";
import StepWorkOrder from "../../workOrderSteps/stepWorkOrder";
import { Stepper, StepLabel, Step } from "@material-ui/core";
import StepSummary from "../../workOrderSteps/stepsummary";
import { MultiStepContext } from "../../Context";
import "./workOrderForm.css";
import customIcons from "../../../Icons/icons";
import { Link } from "react-router-dom";
import NewWorkOrder from "../../workOrderSteps/newWorkOrder";

function WorkOrderForm() {
  const { currentStep, finalData, setStep } = useContext(MultiStepContext);

  function showStep(step) {
    switch (step) {
      case 1:
        return <StepAsset />;

      case 2:
        return <NewWorkOrder />;

      case 3:
        return <StepOtherInfo />;

      case 4:
        return <StepSummary />;

      default:
        break;
    }
  }

  const styleLabel = {
    display: "flex",
    gap: "10px",
    color: "lightgrey",
    fontSize: "16px",
    with: "fit-content"
  }

  return (
    <div className="allPagePosition">
      <div className="commonPage">
        <div className="commonPageTop">
          <h3 className="pageTitle">Work Order</h3>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/work-order">work order</Link>
          <div className="dividerCommonPage"></div>
          <Link>Add work order</Link>
        </div>
        <div className="commonPageBottom workOrder  workOrderRoot">
          <div className="formsCommonPageBottom">
            <div className="stepFlex">
              <div className="center-stepper">
                <h3 className="stepHeader">ADD WORK ORDER</h3>
                <Stepper activeStep={currentStep - 1} orientation="vertical">
                  <StepLabel className="stepLabel">
                    <span className={`stepLabelPointer ${currentStep - 1 === 0 ? "backgroundOrange" : ""}`}>
                      <customIcons.check className={`stepIconAbsolute ${currentStep - 1 === 0 ? "hiddenPointer" : ""}`} size={16}/>
                    </span>
                    <span>Asset</span>
                  </StepLabel>

                  <StepLabel className="stepLabel">
                  <span className={`stepLabelPointer ${currentStep - 1 === 1 ? "backgroundOrange" : ""}`}>
                    <customIcons.check className={`stepIconAbsolute ${currentStep - 1 === 1 ? "hiddenPointer" : ""}`}/>
                  </span>
                    <span>Work Order</span>
                  </StepLabel>

                  <StepLabel className="stepLabel">
                  <span className={`stepLabelPointer ${currentStep - 1 === 2 ? "backgroundOrange" : ""}`}>
                    <customIcons.check className={`stepIconAbsolute ${currentStep - 1 === 2 ? "hiddenPointer" : ""}`}/>
                  </span>
                    <span>Other Info</span>
                  </StepLabel>

                  <StepLabel className="stepLabel">
                  <span className={`stepLabelPointer ${currentStep - 1 === 3 ? "backgroundOrange" : ""}`}>
                  <customIcons.check className={`stepIconAbsolute ${currentStep - 1 === 3 ? "hiddenPointer" : ""}`}/>
                  </span>
                    <span>Summary</span>
                  </StepLabel>

                </Stepper>
              </div>
              <div className="showSteps">{showStep(currentStep)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrderForm;
