import React from "react";
import customIcons from "../../Icons/icons";
import { Link } from "react-router-dom";
import RequestTable from "../WorkingCode/WorkingRequests/RequestTable";

function Requests() {
  
 
  return (
    <div className="commonPage container">
      <div className="">
        <div className="commonPageTop">
          <h3 className="pageTitle">Requests</h3>
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
                <Link class="dropdown-item action-dropdown-item" to="/request-form">
                  <customIcons.add style={{color: "green"}}/>
                  <span>New Request</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link>requests</Link>
        </div>
        <div className="testBorder">
           <RequestTable/>
        </div>
      </div>
    </div>
  );
}

export default Requests;
