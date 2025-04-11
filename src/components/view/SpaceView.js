import React, {useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap";


export default function SpaceView({
  infoUser,
  infoRdv,
  modifyInfoUser,
  modifyInfoRdv,
  errorMessage,
  successMessage,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState(infoUser);

  useEffect(() => {
    console.log("infoUser:", infoUser);
    setTempUser({
        name: infoUser.name || "",       // Si infoUser.name est null ou undefined, on utilise une chaîne vide
        surname: infoUser.surname || "",     // Même logique pour surname
        address: infoUser.address || "",      // Assurez-vous que address est une chaîne vide si null
        phoneNumber: infoUser.phoneNumber || "", // Pareil pour phoneNumber
        email: infoUser.email || ""           // Et pour email
      });
    }, [infoUser]);

  function handleChange(e) {
    const { name, value } = e.target;
    setTempUser((prev) => ({ ...prev, [name]: value }));
  }

  function handleAccept() {
    console.log("Données avant envoi : ", tempUser);

    modifyInfoUser(tempUser);
    setIsEditing(false);
  }

  function handleCancel() {
    setTempUser(infoUser);
    setIsEditing(false);
  }

  return (
    <Container className="mt-5">
        <Row className="g-4">
        <Col>
      <Card className="shadow-lg rounded-4 border-0 p-4" style={{ backgroundColor: "#fff8f5" }}>
        <Card.Body>
          <Card.Title className="text-center mb-4" style={{ color: "#b5838d" }}>
            👰 Espace Mariée
          </Card.Title>

          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={tempUser.name || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    name="surname"
                    value={tempUser.surname || ""}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={tempUser.address || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Téléphone</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                value={tempUser.phoneNumber || ""}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={tempUser.email || ""}
                disabled
              />
            </Form.Group>

            <div className="d-flex justify-content-start">
              {!isEditing ? (
                <Button variant="outline-primary" onClick={() => setIsEditing(true)}>
                  Modifier
                </Button>
              ) : (
                <>
                  <Button variant="outline-secondary" className="me-2" onClick={handleCancel}>
                    Annuler
                  </Button>
                  <Button variant="success" onClick={handleAccept}>
                    Accepter
                  </Button>
                </>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
      </Col>
 {/* Section pour afficher les rendez-vous */}
 <Col md={6} className="mb-4"> {/* Ajout de marge ici aussi */}
          <Card className="shadow-lg rounded-4 border-0 p-4" style={{ backgroundColor: "#fff8f5" }}>
            <Card.Body>
              <Card.Title className="text-center mb-4" style={{ color: "#b5838d" }}>
                🗓️ Vos Rendez-vous
              </Card.Title>

              {infoRdv.length === 0 ? (
                <Alert variant="info">Vous n'avez aucun rendez-vous programmé.</Alert>
              ) : (
                infoRdv.map((rdv) => (
                  <Card key={rdv.id} className="mb-3">
                    <Card.Body>
                      <Card.Title>{rdv.robe}</Card.Title>
                      <Card.Text>Date: {new Date(rdv.dateDuRendezVous).toLocaleString()}</Card.Text>
                      {/* Affichage de l'image de la robe */}
                      <Card.Img
                        variant="top"
                        src={rdv.image} // Affiche l'image de la robe
                        alt="Robe du rendez-vous"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                    </Card.Body>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        </Row>
    </Container>
  );
}