import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import customIcons from "../../../Icons/icons";

function Nav() {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg bg-body-tertiary  mainNav">
        <div className="innerMainNav">
          <Link className="navbar-brand logo" to="/">
            Sahara Desk
            {/* <div className="navLogoContainer">
              <img
                src="https://149862670.v2.pressablecdn.com/wp-content/uploads/2022/11/SaharaDesk-Logo.png"
                alt="company logo"
                className="companyLogoImgNav"
              />
            </div> */}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navLinksContainer">
              <div class="dropdown actionDropdown navDropdownContainer">
                <p
                  class="btn dropdown-toggle navDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>Work Orders</span>
                  <span>
                    <customIcons.down size={12} />
                  </span>
                </p>
                <ul class="dropdown-menu">
                  <Link
                    class="dropdown-item action-dropdown-item"
                    to="/requests"
                  >
                    <span>Requests</span>
                  </Link>
                  <Link
                    class="dropdown-item action-dropdown-item"
                    to="/work-order"
                  >
                    <span>Work Order</span>
                  </Link>
                  <Link
                    class="dropdown-item action-dropdown-item navLast"
                    to="/request-form"
                  >
                    <span>Schedules</span>
                  </Link>
                </ul>
              </div>
              <Link className="nav-link navLinks navHover" to="/requests">
                Assets
              </Link>
              <Link className="nav-link navLinks navHover" href="#">
                parts
              </Link>
              <Link className="nav-link navLinks navHover">Schedules</Link>

              <div class="dropdown actionDropdown navDropdownContainer">
                <p
                  class="btn dropdown-toggle navDropdown"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span>More</span>
                  <span>
                    <customIcons.down size={12} />
                  </span>
                </p>
                <ul class="dropdown-menu">
                  <Link
                    class="dropdown-item action-dropdown-item"
                    to=""
                  >
                    <span>Checklist</span>
                  </Link>
                  <Link
                    class="dropdown-item action-dropdown-item"
                    to=""
                  >
                    <span>Locations</span>
                  </Link>
                  <Link
                    class="dropdown-item action-dropdown-item"
                    to=""
                  >
                    <span>People</span>
                  </Link>
                  <Link
                    class="dropdown-item action-dropdown-item navLast"
                    to=""
                  >
                    <span>Vendors</span>
                  </Link>
                </ul>
              </div>
            </div>
          </div>

          <div className="mainNavRight">
            <span className="searchNAlert">
              <span>
                <customIcons.search size={20} className="iconFallenAngels" />
              </span>
              <span className="radiowave">
                <div className="btn-data">
                  <div className="notify"></div>
                  <customIcons.notification
                    size={25}
                    className="iconFallenAngels"
                  />
                </div>
              </span>
            </span>
            <div className="divider"></div>
            <div className="userNameNPic">
              <h5 className="userName angels">{user.firstName} {user.lastName}</h5>
              <div className="imgContainer">
                <img
                  src="https://images.pexels.com/photos/1678821/pexels-photo-1678821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="user_pic"
                  className="userPic"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
