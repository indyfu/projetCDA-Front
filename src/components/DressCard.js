import React from "react";
import { Card, Button, Image, Row, Col } from "react-bootstrap";

export default function DressCard({ dress, askForRdv }) {
    return (
        <Card className="m-2 p-2 shadow-sm">
            <Row>
                <Col md={6} className="position-relative">
                    <div
                        style={{
                            transform: "rotate(-5deg)",
                            boxShadow: "5px 5px 10px rgba(0, 0, 0, 0.3)",
                        }}
                    >
                        <Image src={dress.image}
                         alt={dress.name} 
                         fluid 
                         style={{ width: "700px", height: "auto" }}/>
                    </div>
                </Col>
                <Col md={6}>
                    <Card.Body>
                        <Card.Title>{dress.name}</Card.Title>
                        <Card.Text>Description: {dress.description}</Card.Text>
                        <Card.Text>Style: {dress.style.styleDress}</Card.Text>
                        <Card.Text>Prix: {dress.prix} €</Card.Text>
                        <Button variant="primary" onClick={() => askForRdv(dress.id)}>
                            Demander un RDV
                        </Button>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}