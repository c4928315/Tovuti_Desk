import React from "react";
import "./workOrder.css";
import customIcons from "../../Icons/icons";
import useFetch from "../../Hooks/useFetch";
import Dropdown from "../Dropdown/dropdown";
import Table1 from "../Tables/Table1/table1";
import { Link } from "react-router-dom";

function WorkOrder() {
  const { data } = useFetch("http://localhost:3001/incidents");
  const columns = ["Reference", "Location", "Vendor", "Date Created", "Status"];
  const dropdownComponents = {
    dropdownComp1: (
      <Dropdown text="Category" gridStatusSelect="gridStatusSelect" />
    ),
    dropdownComp2: (
      <Dropdown text="Status" gridStatusSelect="gridStatusSelect" />
    ),
    dropdownComp3: (
      <Dropdown text="Location" gridStatusSelect="gridStatusSelect" />
    ),
  };
  const recordsPerPage = 7;
  const keys = ["status"];

  return (
    <div className="commonPage container">
      <div className="">
        <div className="commonPageTop">
          <h3 className="pageTitle">work order</h3>
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
                <Link class="dropdown-item action-dropdown-item" to="/work-order-form">
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
        <div className="commonPageBottom">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item commonPageTab" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home-tab-pane"
                type="button"
                role="tab"
                aria-controls="home-tab-pane"
                aria-selected="true"
              >
                Work Orders
              </button>
            </li>
            <li className="nav-item commonPageTab" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="false"
              >
                New
              </button>
            </li>
            <li className="nav-item commonPageTab" role="presentation">
              <button
                className="nav-link"
                id="contact-tab"
                data-bs-toggle="tab"
                data-bs-target="#contact-tab-pane"
                type="button"
                role="tab"
                aria-controls="contact-tab-pane"
                aria-selected="false"
              >
                Ongoing
              </button>
            </li>
            <li className="nav-item commonPageTab" role="presentation">
              <button
                className="nav-link"
                id="disabled-tab"
                data-bs-toggle="tab"
                data-bs-target="#disabled-tab-pane"
                type="button"
                role="tab"
                aria-controls="disabled-tab-pane"
                aria-selected="true"
              >
                Closed
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="home-tab-pane"
              role="tabpanel"
              aria-labelledby="home-tab"
              tabIndex="0"
            >
              <Table1
                data={data}
                columns={columns}
                dropdownComponents={dropdownComponents}
                recordsPerPage={recordsPerPage}
                keys={keys}
              />
            </div>
            <div
              className="tab-pane fade"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabIndex="0"
            >
              New Work Orders Here
            </div>
            <div
              className="tab-pane fade"
              id="contact-tab-pane"
              role="tabpanel"
              aria-labelledby="contact-tab"
              tabIndex="0"
            >
              Ongoing Work Orders Here
            </div>
            <div
              className="tab-pane fade"
              id="disabled-tab-pane"
              role="tabpanel"
              aria-labelledby="disabled-tab"
              tabIndex="0"
            >
              Closed Work Orders Here
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrder;
