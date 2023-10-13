import Dashboard from "../Pages/Dashboard/dashboard";
import {
  BrowserRouter as Router,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import WorkOrder from "../Components/WorkOrder/workOrder";
import Nav from "../Components/dashboard/Nav/nav";
import WorkOrderForm from "../Components/Forms/WorkOrder/workOrderForm";
import Login from "../Pages/Login/login";

// Create a parent component that includes the Nav component

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            element={
              <>
                <Nav />
                <Outlet />
              </>
            }
          >
            <Route path="/home" element={<Dashboard />} />
            <Route path="/home/work-order" element={<WorkOrder />} />
            <Route path="/work-order-form" element={<WorkOrderForm />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
