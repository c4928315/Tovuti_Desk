import React, { useEffect, useState } from "react";
import "./RequestDetails.css";
import customIcons from "../../../Icons/icons";
import { Link, useParams } from "react-router-dom";

function RequestDetailsPage() {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const apiUrl = `https://saharadeskrestapi.azurewebsites.net/api/Requests/GetAllRequests/${itemId}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok (HTTP status: ${response.status})`
          );
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setItemDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching item details:", error);
      });
  }, [itemId]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }


  return (
    <div className="commonPage">
      <div className="commonPageCenter">
        <div className="commonPageTop">
          <h3 className="pageTitle requestDetailTitle">
            <p>Requests</p>
            <p>-</p>
            <p>{itemDetails.requestDetails}</p>
            <p>-</p>
            <p> {itemDetails.requestRef}</p>
          </h3>

          <span className="requestNotice">
            <span>
              <customIcons.circleCheck size={20} />
            </span>
            <span className="statement">
              This request has been Approved and turn to Work Order Tile
            </span>
          </span>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/requests">Requests</Link>
          <div className="dividerCommonPage"></div>
          <Link className="flex" style={{ gap: "4px" }}>
            <p>{itemDetails.requestDetails}</p>
            <p>-</p>
            <p> {itemDetails.requestRef}</p>
          </Link>
        </div>
        {/*  */}

        <div className="request-details-page onlyRequests">
          <div className="left">
            <h3 className="request-details-page-main">Request Details</h3>

            <div className="requestKeyValueContainer">
              <div className="requestKeyValue requestKeyValue2">
                <div>
                  <h5>faulty asset:</h5>
                  {itemDetails.requestAsset.map((item) => {
                    return <p>{item.assetName}</p>;
                  })}
                </div>

                <div className="requestKeyValue2StatusContainer">
                  <h6 className="requestKeyValue2StatusH6">Status:</h6>
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle requestKeyValue2Status"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select
                    </button>
                    <ul class="dropdown-menu dropdown-menu-lg-end detailsDropdownStatus">
                      <li>
                        <button class="dropdown-item" type="button">
                          In Progress
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          On Hold
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          Closed
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="requestKeyValue">
                <h5>location:</h5>
                <p>{itemDetails.locaction.locationName}</p>
              </div>
              <div className="requestKeyValue">
                <h5>fault:</h5>
                {itemDetails.Fault.map((item) => {
                  return <p>{item.Name}</p>;
                })}
              </div>
              <div className="requestKeyValue">
                <h5>fault description:</h5>
                <p>{itemDetails.Description}</p>
              </div>
              <div className="requestKeyValue">
                <h5>recurrence:</h5>
                <p>{itemDetails.Recurrence}</p>
              </div>
              <div className="requestKeyValue">
                <h5>submitted by:</h5>
                <p>{itemDetails.CreatedBy}</p>
              </div>
            </div>
            <div className="declineApproveContainner">
              <button className="declineApprove declineRequest">
                Decline Request
              </button>
              <button className="declineApprove approveRequest">
                Approve Request
              </button>
            </div>
          </div>
          <div className="right">
            <div className="workOrderDetail">
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main">work order detail</h3>
                <customIcons.down size={14} />
              </div>
              <div className="workOrderDetailContainer">
                <div className="minLeft">
                  <h5 className="workOrderDetailContainerH5">
                    work order title:
                  </h5>
                  <p className="workOrderDetailContainerP">
                    {itemDetails.WorkOrder.Title}
                  </p>
                </div>
                <div className="minRight">
                  <h5 className="workOrderDetailContainerH5">description:</h5>
                  <p className="workOrderDetailContainerP workOrderDetailContainerH5Description">
                    {itemDetails.WorkOrder.Description}
                  </p>
                </div>
              </div>

              <div className="workOrderDetailContainer">
                <div className="minLeft">
                  <h5 className="workOrderDetailContainerH5">
                    {itemDetails.WorkOrder.CategoryOfWork.Name}
                  </h5>
                  <p className="workOrderDetailContainerP">Engineering</p>
                </div>
                <div className="minRight">
                  <h5 className="workOrderDetailContainerH5">Priority:</h5>
                  <button
                    className={`workOrderDetailContainerButton ${
                      itemDetails.WorkOrder.Priority === "High"
                        ? "greenPriority"
                        : itemDetails.WorkOrder.Priority === "Low"
                        ? "redPriority"
                        : ""
                    }`}
                  >
                    {itemDetails.WorkOrder.Priority}
                  </button>
                </div>
              </div>

              <div className="workOrderDetailContainer">
                <div className="minLeft">
                  <h5 className="workOrderDetailContainerH5">team:</h5>
                  <p className="workOrderDetailContainerP">
                    {itemDetails.WorkOrder.AssignTeam.Name}
                  </p>
                </div>
                <div className="minRight">
                  <h5 className="workOrderDetailContainerH5">
                    Additional Team:
                  </h5>
                  <p className="workOrderDetailContainerP">
                    {itemDetails.WorkOrder.AssignAdditionalTeam.Name}
                  </p>
                </div>
              </div>

              <div className="workOrderDetailContainer">
                <div className="minLeft">
                  <h5 className="workOrderDetailContainerH5">
                    Technician Signature Required?
                  </h5>
                  <p className="workOrderDetailContainerP">
                    {itemDetails === "True" ? <p>Yes</p> : <p>No</p>}
                  </p>
                </div>
                <div className="minRight">
                  <h5 className="workOrderDetailContainerH5">
                    Estimated Hours
                  </h5>
                  <p className="workOrderDetailContainerP">20</p>
                </div>
              </div>
            </div>
            <div className="taskChecklist">
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main">
                  tasks and checklists
                </h3>
                <customIcons.down size={14} />
              </div>
              <div className="innerTaskChecklist">
                {itemDetails.WorkOrder.Checklist.map((i) => {
                  return (
                    <div className="displayBlock">
                      <customIcons.check className="innerTaskChecklistCheck" />
                      <p>{i.Name}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="otherInfo">
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main">OTHER INFORMATION</h3>
                <customIcons.down size={14} />
              </div>

              <div className="innerOtherInfo">
                <div className="requestKeyValue">
                  <h5>files:</h5>
                 <p>{itemDetails.WorkOrder.AttachedFiles.Name}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}

export default RequestDetailsPage;
