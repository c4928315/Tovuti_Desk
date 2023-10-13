import React from "react";
import { Link } from "react-router-dom";
import useFetch from "../../../Hooks/useFetch";
import customIcons from "../../../Icons/icons";
import Button from "../../Button/button";
import "./reminders.css";

function Reminders() {
  const { data, isLoading } = useFetch(
    "https://intra-deco.onrender.com/reminders"
  );

  const handleClick = () => {
    alert("Button clicked!");
  };

  return isLoading ? (
    <div class="lazyLoading">
      <div class="sound-wave">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  ) : (
    <div className="holders">
      <div className="reminderTop">
        <span className="itemTop">
          <span className="gridTitleBlack">Reminders</span>
          <Link className="viewAll">view all</Link>
        </span>
        <div className="reminderBottom">
          <div className="calender">
            <p className="paragraph1 reminderToday">Today</p>
            <customIcons.calender size={18} style={{cursor: "pointer"}}/>
          </div>
          

          <div className="allreminders">
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
                    <p className="describeComplete paragraph1 ">
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
                    <Button
                      onClick={handleClick}
                      text="Review"
                      className="btnOutline btnSmall reviewBtn"
                    />
                    <Button
                      onClick={handleClick}
                      text="Close"
                      className="btnOrangeFull btnSmall closeBtn"
                    />
                  </div>
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
