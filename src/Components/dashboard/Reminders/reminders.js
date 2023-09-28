import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import Button from "../../Button/button";
import "./reminders.css";

function Reminders() {
  const { data } = useFetch("https://intra-deco.onrender.com/incidents");

  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="holders">
      <div className="reminderTop">
        <span className="itemTop">
          <span className="gridTitleBlack">Reminders</span>
          <Link className="viewAll">view all</Link>
        </span>
        <div className="reminderBottom">
          <p className="paragraph1 reminderToday">Today</p>

          <div>
            {data.map((item, i) => {
              const getStatusClassName = (status) => {
                switch (status) {
                  case "New":
                    return "New";
                  case "Complete":
                    return "Complete";
                  case "Ongoing":
                    return "Ongoing";
                  default:
                    return "default-class";
                }
              };
              const statusClassName = getStatusClassName(item.status);

              const describe = () => {
                if (item.status === "Complete") {
                  return (
                    <p className="describeComplete paragraph1">
                      job marked as <b className={statusClassName}>completed</b>
                    </p>
                  );
                } else {
                  return (
                    <p className="describeComplete paragraph1">
                      {item.description}
                    </p>
                  );
                }
              };

              return (
                <div key={i} className="singleReminder">
                  <div>
                    <div className="reminderHeaderNStatus">
                      <li className={statusClassName}>{item.reference}</li>
                      <div className="checkStatus">
                        <p className={statusClassName}>{item.status}</p>
                      </div>
                    </div>
                    <div className="reminderLocationNDescribe">
                      <p className="paragraph2">{item.location}</p>
                      <h6>{describe()}</h6>
                    </div>
                  </div>
                  <div className="reminderButtons">
                  <Button onClick={handleClick} text="Review" className="btnOutline btnSmall" />
                  <Button onClick={handleClick} text="Close" className="btnOrangeFull btnSmall" />
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reminders;
