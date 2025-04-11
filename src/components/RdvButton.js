import React from "react";
import scrollButton from "../assets/images/scroll.png"
import "../css/styles.css"

const RdvButton = ({ onClick }) => {
  return (
    <button className="btn-light rdv-button" onClick={onClick}>
      <img 
         src={scrollButton} alt="Parchemin" className="rdv-icon " 
      />
      <div className="rdv-label">Rdv à venir</div>
    </button>
  );
};
export default RdvButton;