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

function WorkOrderForm() {
  const { currentStep, finalData } = useContext(MultiStepContext);

  function showStep(step) {
    switch (step) {
      case 1:
        return <StepAsset />;

      case 2:
        return <StepWorkOrder />;

      case 3:
        return <StepOtherInfo />;

      case 4:
        return <StepSummary />;

      default:
        break;
    }
  }

  return (
    <div className="commonPage container">
      <div className="">
        <div className="commonPageTop">
          <h3 className="pageTitle">New Request</h3>
          <div class="dropdown actionDropdown">
            <button
              class="btn btn-light dropdown-toggle actionBtn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to="/work-order-form"
                >
                  <customIcons.add style={{ color: "green" }} />
                  <span>New Request</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/work-order">work order</Link>
          <div className="dividerCommonPage"></div>
          <Link>Add work order</Link>
        </div>
        <div className="commonPageBottom container">
          <h3 className="workOrderTitle">New Request</h3>
          <div className="formsCommonPageBottom">
            <div className="stepFlex">
              <div className="center-stepper">
                <h3 className="stepHeader">ADD WORK ORDER</h3>
                <Stepper activeStep={currentStep - 1} orientation="vertical">
                  <Step>
                    <StepLabel>Asset</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Work Order</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Other Info</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Summary</StepLabel>
                  </Step>
                </Stepper>
              </div>
              <div>{showStep(currentStep)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrderForm;
