import Dashboard from "../Pages/Dashboard/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import WorkOrder from "../Components/WorkOrder/workOrder";
import Nav from "../Components/dashboard/Nav/nav";
import WorkOrderForm from "../Components/Forms/WorkOrder/workOrderForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="work-order" element={<WorkOrder/>} />
          <Route path="work-order-form" element={<WorkOrderForm/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
