import React from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import Experience from '../Experience';
import Qualite from '../Qualite';
import Personnalisation from '../Personnalisation';
import './creatriceView.css';

function CreatriceView() {
  return (
    <div className="creatrice-view" id="creatrice-view-container">
      <nav>
        <Link
          activeClass="active"
          to="experience"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          containerId='creatrice-view-container'
        >
          Expérience
        </Link>
        <Link
          activeClass="active"
          to="qualite"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          containerId='creatrice-view-container'
        >
          Qualité
        </Link>
        <Link
          activeClass="active"
          to="personnalisation"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          containerId='creatrice-view-container'
        >
          Personnalisation
        </Link>
      </nav>
      <main>
        <Experience />
        <Qualite />
        <Personnalisation />
      </main>
    </div>
  );
}

export default CreatriceView;