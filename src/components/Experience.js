import React, { useState, useRef, useEffect } from 'react';
import './view/creatriceView.css'; // Assurez-vous que le chemin est correct
import experience from '../assets/images/atelier2.jpg'
const Experience = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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
      { threshold: [0, 0.1, 1] });

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Données de l'expérience
  const experienceData = {
    imageUrl: experience,
    title: 'Expérience',
    description:
      "L'expérience de la Maison Leloire repose sur les épaules de Laura Leloire, une créatrice ayant affûté son talent pendant plus de 15 ans au sein de maisons de haute couture prestigieuses. Cette expertise, acquise auprès de noms tels que Louis Vuitton et Céline, garantit aux futures mariées un accompagnement d'exception, où chaque détail est maîtrisé avec une précision inégalée. L'application web envisagée vise à prolonger cette expérience unique, en offrant une interface intuitive et moderne qui simplifie la prise de rendez-vous et le suivi des commandes.",
  };

  return (
    <section
      ref={sectionRef}
      className={`section experience ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="image-container">
        <img src={experienceData.imageUrl} alt={experienceData.title} />
      </div>
      <div className="text-container">
        <h2>{experienceData.title}</h2>
        <p>{experienceData.description}</p>
      </div>
    </section>
  );
};

export default Experience;