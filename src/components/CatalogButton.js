import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons"
import "../css/styles.css"

const CatalogButton = ({ onClick }) => {
    return (
        <button className="btn-light creatrice-button" onClick={onClick}>
            <FontAwesomeIcon icon={faBookOpen} />
            <div className="creatrice-label">Voir Catalogue</div>
            </button>
            );


}
export default CatalogButton;