import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShirt } from "@fortawesome/free-solid-svg-icons"; 
import "../css/styles.css"

const CreatriceButton = ({ onClick }) => {
  return (
    <button className="btn-light creatrice-button" onClick={onClick}>
    <FontAwesomeIcon icon={faShirt} />
      <div className="creatrice-label">La créatrice</div>
    </button>
  );
};
export default CreatriceButton;