import React from "react";
import PropTypes from "prop-types";
import "./card.css";
import customIcons from "../../../Icons/icons";
import { Link } from "react-router-dom";


function Card({ data, text, dropdownComp, link, itemProperty }) {

  // weeds out duplicate elements ************(NOT DONE WITH THIS)************
  const filteredData = data.filter(
    (item, index, self) =>
      self.findIndex((i) => i.status === item.status) === index
  );



  return (
    <Link to={link} className="cardContainer">
      <span className="itemTop">
        <span className="gridTitle">{text}</span>
        <customIcons.kebab />
      </span>
      <div className="itemBottom">
        <p className="gridData">{data.length}</p>
        {dropdownComp}
      </div>
      <div className="cardItemsContainer">
        {filteredData.map((item, i) => {

            const classNameID = () => {
                if(item[itemProperty] === "Closed"){
                    return (
                        <div className="Complete">
                          {item[itemProperty]}
                          <li className="completeList"></li>
                        </div>
                    )
                } else if(item[itemProperty] === "Open"){
                    return (
                        <div className="New">
                          {item[itemProperty]}
                          <li className="newList"></li>
                        </div>
                    )
                }
            }

          return (
            <div className="cardItems" key={i}>
              <>{classNameID()}</>
            </div>
          );
        })}
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
};

export default Card;
