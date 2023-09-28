import React, { useState } from "react";
import { Link } from "react-router-dom";
import customIcons from "../../../Icons/icons";
import Button from "../../Button/button";
import { BiCheck } from "react-icons/bi"
import "./workOrderForm.css";

function WorkOrderForm() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  const [activeBtn, setActiveBtn] = useState(null);

  const handleButtonClick = (buttonName) => {
    // Toggle the activeButton state between buttons
    setActiveBtn(buttonName);
  };


  return (
    <div className="commonPage container">
      <div className="">
        <div className="commonPageTop">
          <h3 className="pageTitle">work order</h3>
          <div class="dropdown actionDropdown">
            <button
              class="btn btn-light dropdown-toggle actionBtn"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Actions
            </button>
            <ul class="dropdown-menu">
              <li>
                <Link
                  class="dropdown-item action-dropdown-item"
                  to="/work-order-form"
                >
                  <customIcons.add style={{ color: "green" }} />
                  <span>Add Work Order</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="commonPageMiddle">
          <Link to="/">home</Link>
          <div className="dividerCommonPage"></div>
          <Link to="/work-order">work order</Link>
          <div className="dividerCommonPage"></div>
          <Link>Add work order</Link>
        </div>
        <div className="commonPageBottom container">
          <h3 className="workOrderTitle">Add Work Order</h3>
          <div className="formsCommonPageBottom">
            <ul className="nav nav-tabs formsUlTab" id="myTab" role="tablist">
              <li className="nav-item formsListTab" role="presentation">
                <div className="bulletPoint" id={activeBtn === 'button1' ? 'onclick' : ''}>
                  <BiCheck className="checkOnclick" id={activeBtn === 'button1' ? 'checkOnclickOpacity' : 'checkOnclick'}size={13}/> 
                </div>
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                  onClick={() => handleButtonClick('button1')}
                >
                  Work Order Info
                </button>
              </li>
              <li className="nav-item formsListTab" role="presentation">
                <div className="bulletPoint" id={activeBtn === 'button2' ? 'onclick' : ''}>
                <BiCheck className="checkOnclick" id={activeBtn === 'button2' ? 'checkOnclickOpacity' : 'checkOnclick'}size={13}/> 
                </div>
                <button
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                  onClick={() => handleButtonClick('button2')}
                >
                  Team
                </button>
              </li>
              <li className="nav-item formsListTab" role="presentation">
                <div className="bulletPoint" id={activeBtn === 'button3' ? 'onclick' : ''}>
                <BiCheck className="checkOnclick" id={activeBtn === 'button3' ? 'checkOnclickOpacity' : 'checkOnclick'}size={13}/> 
                </div>
                <button
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected="false"
                  onClick={() => handleButtonClick('button3')}
                >
                  Other Infomation
                </button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home-tab-pane"
                role="tabpanel"
                aria-labelledby="home-tab"
                tabIndex="0"
              >
                <h4 className="workOrderEntry">work order entries</h4>
                <form>
                  <div className="formFlex">
                    <div className="formLeft">
                      <div class="form-group">
                        <label>work order name</label>
                        <input
                          type="text"
                          required
                          placeholder="work order name"
                        />
                      </div>

                      <div className="selectContainer">
                        <label>Select category</label>
                        <div className="form-group">
                          <select>
                            <option selected>select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>

                      <div className="selectContainer">
                        <div className="lableContainer">
                          <label>Recurring Schedule</label>
                          <Link className="lableLink">Create PM Trigger</Link>
                        </div>
                        <div className="form-group">
                          <select>
                            <option selected>select</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                          </select>
                        </div>
                      </div>

                      <div class="form-group">
                        <label>
                          Estimated Duration<i>(hours)</i>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Estimated Duration"
                        />
                      </div>
                    </div>
                    <div className="formRight">
                      <div class="form-group-textarea formRightPosition description">
                        <label>description</label>
                        <textarea
                          type="text"
                          required
                          rows="5"
                          placeholder="description"
                        />
                      </div>

                      <div class="form-group formRightPosition dueDate">
                        <label>due date</label>
                        <input type="text" required placeholder="due date" />
                      </div>

                      <div className="radioInput">
                        <input type="radio" id="low" name="age" value="30" />
                        <label for="low" className="priorityLow">
                          Low
                        </label>
                        <br />
                        <input type="radio" id="medium" name="age" value="60" />
                        <label for="medium" className="priorityMedium">
                          Medium
                        </label>
                        <br />
                        <input type="radio" id="high" name="age" value="100" />
                        <label for="high" className="priorityHigh">
                          High
                        </label>
                        <br />
                        <input type="radio" id="critical" name="age" value="100" />
                        <label for="critical" className="priorityCritical">
                          Critical
                        </label>
                        <br />
                      </div>
                    </div>
                  </div>
                  <div className="workOrderBtnCintainer">
                    <Button
                      onClick={handleClick}
                      text="Next"
                      className="btnOrangeFull btnBig"
                    />
                  </div>
                </form>
              </div>
              <div
                className="tab-pane fade"
                id="profile-tab-pane"
                role="tabpanel"
                aria-labelledby="profile-tab"
                tabIndex="0"
              >
                <div
                  className="tab-pane fade show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex="0"
                >
                  <h4 className="workOrderEntry">work order entries</h4>
                  <form>
                    <div className="formFlex">
                      <div className="formLeft">
                        <div className="selectContainer">
                          <label>Select category</label>
                          <div className="form-group">
                            <select>
                              <option selected>select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>

                        <div className="selectContainer">
                          <label>Select category</label>
                          <div className="form-group">
                            <select>
                              <option selected>select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>

                        <div className="selectContainer">
                          <div className="lableContainer">
                            <label>Recurring Schedule</label>
                            <Link className="lableLink">Create PM Trigger</Link>
                          </div>
                          <div className="form-group">
                            <select>
                              <option selected>select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="formRight">
                        <div className="selectContainer">
                          <label>Select category</label>
                          <div className="form-group">
                            <select>
                              <option selected>select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>

                        <div className="selectContainer">
                          <label>Select category</label>
                          <div className="form-group">
                            <select>
                              <option selected>select</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="workOrderBtnCintainer">
                      <Button text="Next" className="btnOrangeFull btnBig" />
                    </div>
                  </form>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="contact-tab-pane"
                role="tabpanel"
                aria-labelledby="contact-tab"
                tabIndex="0"
              >
                <h4 className="workOrderEntry">Other info</h4>
                <h3 className="uploadH3">upload documents</h3>
                <form>
                  <div class="input-group mb-3">
                    <label class="input-group-text attachFileLabel" for="inputGroupFile02">
                      <customIcons.attach />
                    </label>
                    <input
                      type="file"
                      class="form-control attachFile"
                      id="inputGroupFile02"
                    />
                  </div>
                  <div className="workOrderBtnCintainer">
                    <Button
                      onClick={handleClick}
                      text="Submit"
                      className="btnOrangeFull btnBig"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkOrderForm;
