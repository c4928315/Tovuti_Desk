import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import customIcons from "../../../Icons/icons";
import Button from "../../Button/button";
import "./tasks.css";

function Tasks() {
  const [action, setAction] = useState(false);

  const handleClick = () => {
    alert("Button clicked!");
  };

  const handleAction = () => {
    return !action ? setAction(true) : setAction(false);
  };

  return (
    <div className="tasksContainer">
      <div className="tasks">
        <div className="taskTop">
          <div className="taskTopLeft">
            <h1>my task</h1>
            <p>Planning leads to productivity.</p>
          </div>
          <div className="taskTopRight">
            <customIcons.task size={20} style={{ color: "#488A99" }} />
          </div>
        </div>
        <div className="taskMiddle">
          <h1>categories</h1>
          <div className="taskCategory">
            <div className="taskCategoryCell">
              <div className="taskCategoryCompleted">
                <div className="clipPathContainer">
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                </div>
                <div className="taskIconContainer">
                  <div className="taskIconInner">
                    <customIcons.check size={19} style={{ color: "#83e79e ", backgroundColor: "white", padding: "2px", borderRadius: "5px" }} />
                    <p className="taskIconP1">completed...</p>
                    <p className="taskIconP2">15 Tasks</p>
                  </div>
                  <customIcons.arrow style={{color: "white"}}/>
                </div>
              </div>
              <div className="taskCategoryCanceled">
                <div className="clipPathContainer">
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                </div>
                <div className="taskIconContainer">
                  <div className="taskIconInner">
                    <customIcons.cross size={19} style={{ color: "#e87e80", backgroundColor: "white", padding: "2px", borderRadius: "5px" }} />
                    <p className="taskIconP1">canceled...</p>
                    <p className="taskIconP2">15 Tasks</p>
                  </div>
                  <customIcons.arrow style={{color: "white"}}/>
                </div>
              </div>
            </div>
            <div className="taskCategoryCell">
              <div className="taskCategoryPending">
                <div className="clipPathContainer">
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                </div>
                <div className="taskIconContainer">
                  <div className="taskIconInner">
                    <customIcons.timer size={19} style={{ color: "#8891ea", backgroundColor: "white", padding: "2px", borderRadius: "5px" }} />
                    <p className="taskIconP1">pending...</p>
                    <p className="taskIconP2">15 Tasks</p>
                  </div>
                  <customIcons.arrow style={{color: "white"}}/>
                </div>
              </div>
              <div className="taskCategoryOngoing">
                <div className="clipPathContainer">
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                  <div className="clipPath"></div>
                </div>
                <div className="taskIconContainer">
                  <div className="taskIconInner">
                    <customIcons.spinner size={19} style={{ color: "#7cc7e8", backgroundColor: "white", padding: "2px", borderRadius: "5px" }} />
                    <p className="taskIconP1">ongoing...</p>
                    <p className="taskIconP2">15 Tasks</p>
                  </div>
                  <customIcons.arrow style={{color: "white"}}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="taskCategoryBottom">
          <div className="todayTaskTop">
            <h1>today task</h1>
            <Link>
              <p>view all</p>
            </Link>
          </div>

          <div className="taskCategoryBottomContent">
            <div className="taskCategoryBottomContentLeft"></div>
            <div className="taskCategoryBottomContentRightContainer">
              <div className="taskCategoryBottomContentRight">
                <p className="taskTitle">create new task</p>
                <span className="taskTime">
                  <p>07:00</p>
                  <p>-</p>
                  <p>07:15</p>
                </span>

                <div className="taskCategoryBottomButtons">
                  <Button
                    text="urgent"
                    onClick={handleClick}
                    className="btnTask"
                  />
                  <Button
                    text="close"
                    onClick={handleClick}
                    className="btnTask"
                  />
                </div>
              </div>
              <div className="taskAction">
                <customIcons.kebab />
              </div>
            </div>
          </div>
        </div>
        <div className="taskFooterContainer">
          <div className={`taskFooter ${!action ? "" : "seeAction"}`}>
            <span>
              <customIcons.formAdd size={20} className="taskFooterIcons" />
            </span>
            <span className="radiowavetask">
              <div className="notifyTask"></div>
              <customIcons.notification size={20} className="taskFooterIcons" />
            </span>
            <span>
              <customIcons.googleCalenda
                size={20}
                className="taskFooterIcons"
              />
            </span>
          </div>
          <div>
            <customIcons.action
              className="actionIcon"
              size={20}
              style={{ color: "rgb(77, 77, 77, 0.6)" }}
              onClick={handleAction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
