import React, { useState, useRef, useEffect } from 'react';
import './view/creatriceView.css'; // Assurez-vous que le chemin est correct
import personnalisation from '../assets/images/atelier3.jpg'
const Personnalisation = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting){
                    setIsVisible(true);
                } else {
                    const ratio = entry.intersectionRatio;
                    if (ratio < 0.1){
                        setIsVisible(false);
                    }
                }
            });
        },
        {threshold : [0,0.1,1]});
        observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const personnalisationData = {
    imageUrl: personnalisation,
    title: 'Personnalisation',
    description:
    "   La personnalisation est au cœur de l'approche de la Maison Leloire. Consciente que chaque mariée est unique, Laura Leloire met son talent au service de leurs rêves, en créant des robes sur mesure qui reflètent leur personnalité. L'application web envisagée facilite ce processus de personnalisation, en permettant aux clientes de choisir leurs tissus, d'ajouter des dentelles et de sélectionner des accessoires. Cette approche individualisée, combinée à l'expertise de la créatrice, garantit une robe de mariée à la fois unique et exceptionnelle."
  };
  return(
    <section
    ref={sectionRef}
    className={`section personnalisation ${isVisible ? 'is-visible' : ''}`}>
        <div
        className='image-container'>
            <img src={personnalisationData.imageUrl} alt={personnalisationData.title}/>
        </div>
        <div className='text-container'>
            <h2>{personnalisationData.title}</h2>
            <p>{personnalisationData.description}</p>
        </div>
    </section>
    );
  };
  
  export default Personnalisation;