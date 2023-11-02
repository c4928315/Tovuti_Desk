import React from "react";
import Grid from "../../Components/dashboard/Grid/grid";
import "./dashboard.css";

function Dashboard({onLogout}) {
  return (
    <div className="mainDash">
      <div className="topMainDash">
        <hr className="dashboardHr" />
      </div>
      <div className="bottomMainDash">
        <div className="gridPosition">
          <Grid onLogout={onLogout}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
