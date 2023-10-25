import React, { useEffect, useState } from "react";
import customIcons from "../../Icons/icons";
import "./productDetail.css"
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function WorkOrderDetailsPage() {
  const { itemId } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [partData, setPartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const [showParts, setShowParts] = useState(false);

  useEffect(() => {
    const apiUrl = `https://intra-deco.onrender.com/workOrders/${itemId}`;

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

//   if (!itemDetails) {
//     return <div>Loading...</div>;
//   }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://intra-deco.onrender.com/Parts"
        );

        setPartData(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [partData]);

  const handleShowParts = () => {
    setShowParts(!showParts)
  }

  
  return (
    <div className="commonPage">
      <div className="commonPageCenter">
        <div className="commonPageTop">
          <h3 className="pageTitle requestDetailTitle">
            <p>Work Order</p>
            <p>-</p>
            { itemDetails && (<p>{itemDetails.TicketRef}</p>)}
          </h3>

          <span className="requestNotice requestNoticeWO">
            <span>
              <button className="topWObtn">Start Work</button>
            </span>
            <span>
              <button className="topWObtn">Request Closure</button>
            </span>
            <span>
              <button className="topWObtn">Request Work Done</button>
            </span>
          </span>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/work-order">Work Order</Link>
          <div className="dividerCommonPage"></div>
          <Link className="flex" style={{ gap: "4px" }}>
            <p>Work Order</p>
            { itemDetails && (<p>{itemDetails.TicketRef}</p>)}
            
          </Link>
        </div>
        {/*  */}

        <div className="request-details-page">
          <div className="left">

            <div className="requestKeyValueContainer">
            <h3 className="request-details-page-main">GENERAL INFOMATION</h3>
              <div className="WOdetailsPosition">
              <div className="requestKeyValue requestKeyValue2">
                <div>
                  <h5>Reported On:</h5>
                  {itemDetails && (<p>{itemDetails.DueDate}</p>)}
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
                { itemDetails && (<p>{itemDetails.TicketLocation.LocationName}</p>)}
              </div>
              <div className="requestKeyValue">
                <h5>Asset:</h5>
               { itemDetails && ( <p>{itemDetails.TicketAssets.map((item) => item.AssetName)}</p>)}
              </div>
              <div className="requestKeyValue">
                <h5>incident description:</h5>
                { itemDetails && (<p>{itemDetails.TicketDescription}</p>)}
              </div>
              <div className="requestKeyValue">
                <h5>incident comment:</h5>
                <p>Leaking Pipes on Pump A. Urgent fix</p>
              </div>
              </div>

              <h3 className="request-details-page-main">TECHNITIAN/VENDOR INFORMATION</h3>

              <div className="WOdetailsPosition">
              <div className="requestKeyValue">
                <h5>assigned to:</h5>
                <p>Nexgen</p>
              </div>
              <div className="requestKeyValue">
                <h5>technitian assigned:</h5>
                <p>0742592594</p>
              </div>
              <div className="requestKeyValue">
                <h5>technitian assigned:</h5>
                <p>John Doe</p>
              </div>
              </div>

              <div className="declineApproveContainner">
              <button className="declineApprove WOAssignbtn">
                Decline Request
              </button>
              <button className="declineApprove WOClosebtn">
                Approve Request
              </button>
            </div>
            </div>
          </div>
          <div className="right">
            <div className="workOrderDetail">
              <div className="requestDetailExpand">
                <h3 className="request-details-page-main">CHECKLIST INFORMATION</h3>
                <customIcons.down size={14} />
              </div>
              <div className="workOrderDetailContainer">
                <div className="left">
                  <h5 className="workOrderDetailContainerH5">
                    Checklist:
                  </h5>
                  <p className="workOrderDetailContainerP">
                    <div className="WOcheckListDets">
                      <span className="WOcheckListDetsCheck"> <customIcons.check/> </span>
                      {( itemDetails && <span>{itemDetails.TicketChecklistForms.FormsAndSectionsName}</span> )} 
                    </div>
                  </p>
                </div>
                <Link to="" className="allLinks">Add Checklist</Link>
              </div>
            </div>
            <div className="partTableConatainer partTableConatainerWO">
               <table className="partsTable partsTableWO">
                  <thead>
                    <tr>
                      <th>Parts</th>
                      <th>Quantity</th>
                      <th>Amount(ks)</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {partData.map((item, i) => (
                      <tr key={i}>
                        <td className="tBodyTd">{item.part}</td>
                        <td className="tBodyTd">{item.quantity}</td>
                        <td className="tBodyTd">{item.amount}</td>
                        <td className="tBodyTd">
                            <span>
                            <customIcons.edit size={17} style={{color: "#584539", cursor: "pointer"}}/>
                            <customIcons.delete size={17} style={{color: "#584539", cursor: "pointer"}}/>
                            </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Link  onClick={handleShowParts}>Add Part</Link>
               </div>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
}

export default WorkOrderDetailsPage;
