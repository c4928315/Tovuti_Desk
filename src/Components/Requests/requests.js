import React from "react";
import customIcons from "../../Icons/icons";
import useFetch from "../../Hooks/useFetch";
import { Link } from "react-router-dom";
import DataTable, { Table2 } from "../Tables/Table2/table2";
import { createColumnHelper } from "@tanstack/table-core";
import RequestTable from "../WorkingCode/WorkingRequests/RequestTable";

function Requests() {
  
  const { data } = useFetch("https://intra-deco.onrender.com/workOrder");

  const columnHelper = createColumnHelper();

  const visibleColumnKeys = ["due", "ref", "description", "priority", "asset", "status", "assigned", "location", "updated", "created"];

  const dynamicColumns = visibleColumnKeys.map((columnKey) => {
    return columnHelper.accessor(columnKey, {
      header: () => <span>{columnKey}</span>,
      cell: (info) => info.renderValue(),
    });

  

  });
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
