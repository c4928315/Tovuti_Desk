import React from "react";
import { Link } from "react-router-dom";
import "./nav.css"
import customIcons from "../../../Icons/icons";

function Nav() {
  return (
    <div className="navigation">
      <nav className="navbar navbar-expand-lg bg-body-tertiary container mainNav">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Desk Overview
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav navLinksContainer mainNavigationBar">
              <Link className="nav-link navLinks active" aria-current="page" href="#">
                Home
              </Link>
              <Link className="nav-link navLinks" href="#">
                Assets
              </Link>
              <Link className="nav-link navLinks" href="#">
                Incidents
              </Link>
              <Link className="nav-link navLinks">
                Contractors
              </Link>
            </div>
          </div>

          <div className="mainNavRight">
            <span className="searchNAlert">
              <customIcons.search size={20} className="iconFallenAngels"/>
              <customIcons.notification size={20} className="iconFallenAngels"/>
            </span>
            <div className="divider"></div>
            <div className="userNameNPic">
              <h5 className="userName angels">peter ndegwa</h5>
              <div className="imgContainer">
              <img src="https://images.pexels.com/photos/1678821/pexels-photo-1678821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user_pic" className="userPic" />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
