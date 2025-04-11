import React, { useState, useRef, useEffect } from 'react';
import './view/creatriceView.css';
import qualite from '../assets/images/robe4.jpg'

const Qualite = () => {
    const sectionRef = useRef(null);
    const[isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setIsVisible(true);
              } else {
                // Calcul du pourcentage de la section visible
                const ratio = entry.intersectionRatio;
                if (ratio < 0.1) {
                  setIsVisible(false);
                }
              }
            });
          },
          { threshold: [0, 0.1, 1] }
        );
        observer.observe(sectionRef.current);
    }, []);

    const qualiteData = {
        imageUrl : qualite,
        title : 'Qualité',
        description: 
        "La qualité est l'essence même de la Maison Leloire. L'exigence de Laura Leloire, son sens aigu du détail et sa maîtrise des techniques de haute couture se traduisent par des robes de mariée d'une qualité irréprochable. L'application web projetée s'inscrit dans cette démarche d'excellence, en permettant une gestion précise des mensurations et des personnalisations. L'objectif est de garantir que chaque robe soit une œuvre unique, parfaitement adaptée à la morphologie et aux souhaits de la mariée."
    };
  return (
    <section ref={sectionRef} className={`section qualite ${isVisible ? 'is-visible' : ''}`}>
        <div className='image-container'>
      <img src={qualiteData.imageUrl} alt ={qualiteData.title} />
      </div>
      <div className='text-container'>
        <h2> {qualiteData.title}</h2>
        <p>{qualiteData.description}</p>
      </div>

    </section>
  );
};

export default Qualite;