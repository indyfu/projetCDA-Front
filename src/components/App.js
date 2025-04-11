import React, { useState } from "react";
import { Container, Nav, Navbar, Modal, Button} from "react-bootstrap";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { myContext } from "../index";
import { FaBell, FaCalendarAlt } from "react-icons/fa";

import NeedleCursor from "./NeedleCursor"; // Importez NeedleCursor
import Connection from "./controller/ConnectionController";

import AskForRdv from "./controller/AskRdvController";
import Accueil from "./Accueil";
import Rendezvous from "./controller/RendezVous";
import Creatrice from "./view/CreatriceView";
import Catalog from "./controller/CatalogController";
import NotificationBadge from "./NotificationBadge";
import CalendarComponent from "./CalendarComponent";
import Inscription from "./controller/InscriptionController";
import Space from "./controller/SpaceController";
import ImageScroller from "./ImageScroller";

export default function App() {
  const [user, setUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false)

  function userName() {
    console.log(user)
    return user !== null ? `${user.name} ${user.surname}` : "";
  }

  return (
    <myContext.Provider value={[user, setUser]}>
      <BrowserRouter>
        <NeedleCursor /> {/* Intégrez NeedleCursor ici */}
        
        <Navbar bg="dark" variant="dark" sticky="top">
        
            <Nav>
              <Nav.Link as={Link} eventKey="1" to="/accueil">
                <i className="d-lg-none fa fa-home me-2"></i>
                <span className="d-none d-lg-block">
                  <i className="fa fa-home me-2"></i>
                  Accueil
                </span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey ='8'
                to='catalog'>
                  <i className="d-lg-none fa fa-book me-2"></i>
                  <span className="d-non d-lg-block">
                    <i className="fa fa-book me-2"></i>
                    Catalog
                  </span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                eventKey="5"
                to="/connection"
                hidden={user !== null}
              >
                <i className="d-lg-none fa fa-key me-2"></i>
                <span className="d-none d-lg-block">
                  <i className="fa fa-key me-2"></i>
                  Connexion
                </span>
              </Nav.Link>
             
              <Nav.Link 
                as={Link} eventKey='6' to="/accueil" hidden={user === null} 
                onClick={() => setUser(null)}
              >
                <i className='d-lg-none fa fa-unlock me-2'></i>
                <span className="d-none d-lg-block">
                  <i className='fa fa-unlock me-2'></i>
                  Déconnexion
                </span>
              </Nav.Link>
              {user && (
                <Nav.Link as={Link} eventKey="7" to="/space">
                  <i className="d-lg-none fa fa-user me-2"></i>
                  <span className="d-none d-lg-block">
                    <i className="fa fa-user me-2"></i>
                    Espace utilisateur
                  </span>
                </Nav.Link>
              )}
              {user && (<NotificationBadge />)}
               {/*<NotificationBadge hidden ={user ===null}/>*/}
            </Nav>
            <Button variant="light" className="ms-3" onClick={() => setShowCalendar(true)}>
            <FaCalendarAlt size={20} /> Voir le calendrier
          </Button>
          <Navbar.Brand className='fst-italic'>{userName()}</Navbar.Brand>
        </Navbar>
            {/* Modal qui affiche le calendrier */}
            <Modal show={showCalendar} onHide={() => setShowCalendar(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Calendrier des Rendez-vous</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CalendarComponent /> {/* Affichage du calendrier */}
          </Modal.Body>
        </Modal>

        <article className='mb-5'>
        <ImageScroller />
          <Container>
          
            <Routes>
              <Route exact path="/" element={<Accueil />} />
              <Route exact path="/accueil" element={<Accueil />} />
              <Route exact path="/connection" element={<Connection />} />
              <Route exact path="/catalog" element={<Catalog/>} />
              <Route exact path="/rdv" element={<Rendezvous/>} />
              <Route exact path="/creatrice" element={<Creatrice/>} />
              <Route exact path="/catalog" element={<Catalog/>} />
              <Route exact path="/inscription" element={<Inscription/>} />
              <Route exact path="/space" element={<Space />} />
              <Route exact path="/askRDV/:dressId" element = {<AskForRdv/>} />
            </Routes>
            </Container>
          
        </article>
      </BrowserRouter>
    </myContext.Provider>
  );
}