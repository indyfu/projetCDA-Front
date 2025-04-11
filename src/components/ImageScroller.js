import React, { useEffect, useState } from "react";
import { getBackUrl } from "./controller/backUrl";

export default function ImageScroller() {
  const [dresses, setDresses] = useState([]);
  const backUrl = `${getBackUrl()}/dress`;

  useEffect(() => {
    fetch(`${backUrl}/all`)
      .then((res) => res.json())
      .then((data) => setDresses(data));
  }, []);

  return (
    <div className="scroller-container">
      <div className="scroller-track">
        {/* Afficher les robes */}
        {dresses.map((dress) => (
          <div className="scroller-item" key={dress.id}>
            <div className="image-wrapper">
              <img
                src={`${dress.image}`}
                alt={dress.name}
                className="default-image"
              />
              <img
                src={`${dress.imageAlt1}`}
                alt={`${dress.name} alt`}
                className="hover-image"
              />
            </div>
            <div className="image-info">
              <h5>{dress.name}</h5>
              <strong>{dress.prix} €</strong>
            </div>
          </div>
        ))}

        {/* Dupliquer les éléments pour créer une boucle infinie */}
        {dresses.map((dress) => (
          <div className="scroller-item" key={`dup-${dress.id}`}>
            <div className="image-wrapper">
              <img
                src={`${dress.image}`}
                alt={dress.name}
                className="default-image"
              />
              <img
                src={`${dress.imageAlt1}`}
                alt={`${dress.name} alt`}
                className="hover-image"
              />
            </div>
            <div className="image-info">
              <h5>{dress.name}</h5>
              <strong>{dress.prix} €</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
