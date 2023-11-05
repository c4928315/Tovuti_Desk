import React, { useEffect, useState } from "react";
import customIcons from "../../../Icons/icons";
import { Link, useParams } from "react-router-dom";

function UnApprovedRequestDetailsPage() {
  const { id } = useParams();
  const [itemDetails, setItemDetails] = useState(null);

  useEffect(() => {
    const apiUrl = `https://saharadeskrestapi.azurewebsites.net/api/Requests/RequestDetails/${id}`;

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
  }, [id]);

  if (!itemDetails) {
    return <div>Loading...</div>;
  }

  // console.log(itemDetails.Status.Name);

  // let nameAtIndex0 = "";

  // if (itemDetails.Asset.length > 0) {
  //   nameAtIndex0 = itemDetails.Asset[0].Name;
  //   console.log(nameAtIndex0); // This will log "Elevator" to the console
  // } else {
  //   console.log("The array is empty");
  // }

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

        <div className="request-details-page">
          <div className="left">
            <h3 className="request-details-page-main">Request Details</h3>

            <div className="requestKeyValueContainer">
              <div className="requestKeyValue requestKeyValue2">
                <div>
                  <h5>faulty asset:</h5>
                  {/* {itemDetails.requestAssets.map((item) => {
                    return <p>{item.asset.assetName}</p>;
                  })} */}
                  add
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
                    <ul class="dropdown-menu dropdown-menu-lg-end">
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
                {/* {itemDetails.requestFaults} */}
              </div>
              <div className="requestKeyValue">
                <h5>fault description:</h5>
                <p>{itemDetails.requestDetails}</p>
              </div>
              <div className="requestKeyValue">
                <h5>recurrence:</h5>
                {/* <p>{itemDetails.Recurrence}</p> */}
              </div>
              <div className="requestKeyValue">
                <h5>submitted by:</h5>
                <p>{itemDetails.createdByNavigation.userFirstName} {itemDetails.createdByNavigation.userLastName}</p>
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
            <div className="workOrderDetail unApWorkOrderDetail">
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main">work order detail</h3>
                <customIcons.down size={14} />
              </div>
              <Link to="/work-order-detail-form" className="addWorkOrderDetail">add work order</Link>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
    </div>
  );
}

export default UnApprovedRequestDetailsPage;
