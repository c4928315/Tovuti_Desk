import React from "react";
import "./workOrder.css";
import customIcons from "../../Icons/icons";
import { Link } from "react-router-dom";
import DataTable from "../Tables/Table3/workOrderTable";

function WorkOrder() {

  return (
    <div className="commonPage container">
      <div>
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
                <Link className="dropdown-item action-dropdown-item" to="/work-order-form">
                  <customIcons.add style={{color: "green"}}/>
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
           <DataTable/>
        </div>
      </div>
    </div>
  );
}

export default WorkOrder;
