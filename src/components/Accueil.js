import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import CreatriceView from "./view/CreatriceView";




const Accueil = () => {

  const [showCreatrice, setShowCreatrice] = useState(false);



  const toggleShowCreatrice = () => {
    setShowCreatrice(!showCreatrice); // Afficher ou masquer CreatriceView
  };


    return (
        
        <div className="text-center mt-5 px-0">
        

        <div>
          <section className="creatrice-intro">
          <h2>Découvrez la créatrice</h2>
          <p>
            {showCreatrice
              ? "Notre créatrice est passionnée par l'artisanat et la mode. Chaque pièce qu'elle conçoit est une fusion de créativité et de savoir-faire. Elle crée des vêtements qui incarnent l'élégance intemporelle, tout en apportant une touche moderne et personnelle."
              : "Notre créatrice est une artiste dont les créations sont faites avec amour et minutie. Découvrez son univers unique."}
          </p>
          <button onClick={toggleShowCreatrice} className="btn btn-link">
            {showCreatrice ? "Lire moins" : "Lire plus"}
          </button>
        </section>

        {/* Afficher CreatriceView si showCreatrice est true */}
        {showCreatrice && <CreatriceView />}
      </div>
    </div>
  );
};


export default Accueil;