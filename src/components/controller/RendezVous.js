import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Container } from 'react-bootstrap';

const Rendezvous = () => {
  // Utilisation de l'état pour stocker les données
  const [rendezvousData, setRendezvousData] = useState({
    nomPrenom: '',
    dateRendezvous: '',
    robeSelectionnee: ''
  });

  // Simulation d'une récupération de données depuis la base de données
  useEffect(() => {
    const dataFromDB = {
      nomPrenom: 'Marie Dupont',
      dateRendezvous: '2025-05-15',
      robeSelectionnee: 'Robe en satin blanc'
    };
    setRendezvousData(dataFromDB);
  }, []);

  return (
    <Container fluid className="mt-5">
      <Row className="justify-content-center">
        {/* Partie gauche (lien) */}
        <Col xs={12} md={4} className="text-center">
          <a href="https://www.example.com" className="btn btn-link">
            Voir l'image
          </a>
        </Col>

        {/* Partie droite (informations) */}
        <Col xs={12} md={8}>
          <div className="p-3 bg-light rounded">
            <h4>Détails du Rendez-vous</h4>
            <div className="mb-3">
              <strong>Nom & Prénom : </strong>
              <span>{rendezvousData.nomPrenom}</span>
            </div>
            <div className="mb-3">
              <strong>Date du rendez-vous : </strong>
              <span>{rendezvousData.dateRendezvous}</span>
            </div>
            <div className="mb-3">
              <strong>Robe sélectionnée : </strong>
              <span>{rendezvousData.robeSelectionnee}</span>
            </div>
            <Button variant="primary" href="https://www.example.com">Confirmer le rendez-vous</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Rendezvous;
