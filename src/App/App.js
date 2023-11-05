import Dashboard from "../Pages/Dashboard/dashboard";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import "../tailwind.css";
import WorkOrder from "../Components/WorkOrder/workOrder";
import Nav from "../Components/dashboard/Nav/nav";
import WorkOrderForm from "../Components/Forms/WorkOrder/workOrderForm";
import ProductDetail from "../Components/Detail/productDetail";
import Request from "../Components/Forms/Request/requestForm";
import Requests from "../Components/Requests/requests";
import WorkOrder2 from "../Components/WorkOrder/WorkOrder2";
import RequestTable from "../Components/WorkingCode/WorkingRequests/RequestTable";
import RequestDetailsPage from "../Components/SingleData/RequestDetail/RequestDetails";
import UnApprovedRequestDetailsPage from "../Components/SingleData/UnApprovedRequest/UnApproved";
import WorkOrderDetail from "../Components/Forms/WorkOrderDetailForm/WorkOrderDetail";
import WorkOrderDetailsPage from "../Components/Detail/workOrderDetail";
import { useState } from "react";
import ProtectedRoute from "../Components/ProtectedComp";
import Login from "../Components/Forms/Login/login";
import Unauthorized from "../Components/AccessDenied/unauthorized";
import CloseWorkOrder from "../Components/Forms/CloseWorkOrder/closeWorkOrder";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );
  const claims = JSON.parse(localStorage.getItem("claims"));

  const handleLogin = () => {
    setIsAuthenticated(true);
    console.log("Logged");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Router>
        {isAuthenticated && <Nav />}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/work-order2" element={<WorkOrder2 />} />

          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard onLogout={handleLogout} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/work-order"
            element={
              <WorkOrder
                requiredClaims={["Can_Raise_A_Request"]}
                userClaims={claims}
              />
            }
          />
          <Route
            path="/requests"
            element={<Requests 
              requiredClaims={["Can_Raise_A_Ticket"]}
              userClaims={claims}
            />
          }
          />
          <Route
            path="/work-order-form"
            element={<WorkOrderForm 
              requiredClaims={["Can_Confirm_Work_Done"]}
              userClaims={claims}
            />
          }
          />
          <Route path="/request-form" element={<Request />} />
          <Route path="/access-denied" element={<Unauthorized />} />
          <Route path="/work-order-detail-form" element={<WorkOrderDetail />} />
          <Route path="/details/:itemId" element={<RequestDetailsPage />} />
          <Route path="/WOdetails/:itemId" element={<WorkOrderDetailsPage />} />
          <Route path="/close-work-order" element={<CloseWorkOrder />} />
          <Route
            path="/detailsUnAp/:id"
            element={<UnApprovedRequestDetailsPage />}
          />

          {/* <Route path="/requests" element={<RequestTable/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
