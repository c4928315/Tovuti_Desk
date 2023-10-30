import React from "react";
import PropTypes from "prop-types";
import "./card.css";
import customIcons from "../../../Icons/icons";
import { Link } from "react-router-dom";


function Card({ data, text, dropdownComp, link, itemProperty, number }) {

  // weeds out duplicate elements ************(NOT DONE WITH THIS)************
  const filteredData = data.filter(
    (item, index, self) =>
      self.findIndex((i) => i.status === item.status) === index
  );



  return (
    <Link to={link} className="cardContainer">
      <span className="itemTop">
        <span className="gridTitle">{text}</span>
       
      </span>
      <div className="itemBottom">
        <p className="gridData">{number}</p>
        {dropdownComp}
      </div>
      <div className="cardItemsContainer">
        <div className="colorsHolder">
          <div className="colorsHolderRed">
            <div className="colors red">

            </div>
            <p>New</p>
          </div>
          <p className="textAll">12</p>
        </div>
        <div className="colorsHolder">
          <div className="colorsHolderRed">
            <div className="colors orange">

            </div>
            <p>in Progress</p>
          </div>
          <p className="textAll">29</p>
        </div>
        <div className="colorsHolder">
          <div className="colorsHolderRed">
            <div className="colors green">

            </div>
            <p>Closed</p>
          </div>
          <p className="textAll">40</p>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  data: PropTypes.array.isRequired,
  text: PropTypes.string.isRequired,
  dropdownText: PropTypes.string.isRequired,
  dropdownClassName: PropTypes.string,
  itemProperty: PropTypes.string,
  number: PropTypes.string,
};

export default Card;
