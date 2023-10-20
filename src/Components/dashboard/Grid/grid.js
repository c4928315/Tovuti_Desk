import React from "react";
import useFetch from "../../../Hooks/useFetch";
import Card from "../../Cards/Plain/card";
import Reminders from "../Reminders/reminders";
import Dropdown from "../../Dropdown/dropdown";
import "./grid.css";
import Chart from "../../Cards/Chart/chart";
import Table1 from "../../Tables/Table1/table1";

function Grid() {
  const { data } = useFetch("https://intra-deco.onrender.com/incidents");
  const columns = ["Reference", "Location", "Vendor", "Date Created", "Status"];
  const dropdownComponents = {
    dropdownComp1: <Dropdown text="Category" gridStatusSelect="gridStatusSelect" />,
    dropdownComp2: <Dropdown text="Status" gridStatusSelect="gridStatusSelect" />,
    dropdownComp3: <Dropdown text="Location" gridStatusSelect="gridStatusSelect" />,
  };
  const recordsPerPage = 5
  const keys = ["status"]

  return (
    <div className="containers">
      <div className="greetings angels container">
        <h3>Welcome back, <b>Peter</b> </h3>
      </div>
      <div className="grid-container container">
        <div className="item1 items123">
        <Card
            data={data}
            text="Assets"
            link="work-order"
            dropdownText="Period"
            dropdownClassName="gridStatusSelect"
            itemProperty="status"
            dropdownComp={<Dropdown text="Period" gridStatusSelect="gridStatusSelect" />}
          />
        </div>
        <div className="item2 items123">
          <Card
            data={data}
            link="/requests"
            text="Incidents"
            dropdownText="Period"
            dropdownClassName="gridStatusSelect"
            itemProperty="status"
            dropdownComp={<Dropdown text="Period" gridStatusSelect="gridStatusSelect" />}
          />
        </div>
        <div className="item3 items123">
        <Chart
            data={data}
            text="Cost Stats"
            dropdownText="Period"
            dropdownClassName="gridStatusSelect"
            itemProperty="status"
            dropdownComp={<Dropdown gridStatusSelect="gridStatusSelectChart" />}
          />
        </div>
        <div className="item4">
        {/* <span className="gridTitleBlack containers">Incidents</span> */}
          <Table1 
          data= {data}
          columns={columns}
          dropdownComponents={dropdownComponents}
          recordsPerPage={recordsPerPage}
          keys={keys}
          />
        </div>
        <div className="item5">
          <Reminders />
        </div>
      </div>
    </div>
  );
}

export default Grid;


/*

<div class="container-fluid">
          <div class="row">
            <div
              class="col-sm-12 col-md-4 col-lg-4"
              style={{ backgroundColor: "yellow" }}
            >
              <p>top.</p>
            </div>
            <div
              class="col-sm-12 col-md-4 col-lg-4"
              style={{ backgroundColor: "pink" }}
            >
              <p>top</p>
            </div>
            <div
              class="col-sm-12 col-md-4 col-lg-4"
              style={{ backgroundColor: "brown" }}
            >
              <p>top</p>
            </div>
          </div>
          <div class="row">
            <div
              class="col-sm-12 col-md-12 col-lg-8"
              style={{ backgroundColor: "orange" }}
            >
              <p>bottom big</p>
            </div>
            <div
              class="col-sm-12 col-md-12 col-lg-4"
              style={{ backgroundColor: "wheat" }}
            >
              <p>bottom small.</p>
            </div>
          </div>
        </div>

*/