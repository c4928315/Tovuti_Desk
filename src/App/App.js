import Dashboard from "../Pages/Dashboard/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "../tailwind.css"
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

function App() {

  
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/work-order2" element={<WorkOrder2/>} />

          <Route path="/work-order" element={<WorkOrder/>} />
          <Route path="/requests" element={<Requests/>} />
         
          <Route path="/work-order-form" element={<WorkOrderForm/>} />
          <Route path="/request-form" element={<Request/>} />
          <Route path="/work-order-detail-form" element={<WorkOrderDetail/>} />
          <Route path="/details/:itemId" element={<RequestDetailsPage />} />
          <Route path="/WOdetails/:itemId" element={<WorkOrderDetailsPage />} />
          <Route path="/detailsUnAp/:Id" element={<UnApprovedRequestDetailsPage />} />

          {/* <Route path="/requests" element={<RequestTable/>} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
