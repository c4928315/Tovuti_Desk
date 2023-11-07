import React from "react";
import "./workOrder.css";
import customIcons from "../../Icons/icons";
import { Link, Navigate } from "react-router-dom";
import DataTable from "../Tables/Table3/workOrderTable";

function WorkOrder({ requiredClaims, userClaims }) {
  // Check if the user has the required claims for this route
  const hasRequiredClaims = requiredClaims.every((claim) => {
    const userClaim = userClaims.find((userClaim) => userClaim.claimType === claim);
    return userClaim && userClaim.claimValue === "true";
  });

  if (!hasRequiredClaims) {
    // Redirect to an "Access Denied" page if the user doesn't have the required claims
    return <Navigate to="/access-denied" />;
  }

  return (
    <div className="allPagePosition">
      <div className="commonPage">
        <div className="commonPageTop">
          <h3 className="pageTitle">work order</h3>
          <div className="dropdown actionDropdown">
            <button
              className="btn btn-light dropdown-toggle actionBtn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item action-dropdown-item" to="/work-order-form?source=workorder">
                  <customIcons.add style={{ color: "green" }} />
                  <span>Add Work Order</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link>work order</Link>
        </div>
        <div className="testBorder">
          <DataTable />
        </div>
      </div>
    </div>
  );
}

export default WorkOrder;
