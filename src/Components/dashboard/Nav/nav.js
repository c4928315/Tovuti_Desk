import React from "react";
import { Link } from "react-router-dom";
import "./nav.css";
import customIcons from "../../../Icons/icons";

function Nav() {
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
              <Link
                className="nav-link navLinks active navHover"
                aria-current="page"
                to="/Requsts"
              >
                Home
              </Link>
              <Link
                className="nav-link navLinks navHover"
                to="/requests"
              >
                Requests
              </Link>
              <Link className="nav-link navLinks navHover" href="#">
                Incidents
              </Link>
              <Link className="nav-link navLinks navHover">Contractors</Link>
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
              <h5 className="userName angels">peter ndegwa</h5>
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


