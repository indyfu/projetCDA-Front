import React, { useState } from "react";
import { Row, Col, Card, InputGroup, Nav, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function InscriptionView({ register, successMessage}) {
    const navigate = useNavigate();
    const [fields, setFields] = useState({
        name: "",
        surname: "",
        login: "",
        password: "",
        address: "",
        phoneNumber: "",
        email: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    
    async function handleRegister() {
        try {
            await register(fields);
            navigate("/"); // 🔹 Redirection après succès
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription. Veuillez réessayer.");
        }
    }

    return (
        <Row className="d-flex justify-content-center">
            <Card className="max-width-50-rem p-0 panel">
                <Card.Header className="text-center">Inscription</Card.Header>
                <Row className="pt-4">
                    {/* Nom */}
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Nom</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" placeholder="Entrez votre nom"
                                value={fields.name}
                                onChange={(e) => setFields({ ...fields, name: e.target.value })}
                            />
                        </InputGroup>
                    </Col>

                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Prénom</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" placeholder="Entrez votre prénom"
                                value={fields.surname}
                                onChange={(e) => setFields({ ...fields, surname: e.target.value })}
                            />
                        </InputGroup>
                    </Col>

                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Email</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-envelope"></i></InputGroup.Text>
                            <Form.Control 
                                type="email" placeholder="Entrez votre email"
                                value={fields.email}
                                onChange={(e) => setFields({ ...fields, email: e.target.value })}
                            />
                        </InputGroup>
                    </Col>

                  
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Identifiant</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-user"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" placeholder="Choisissez un identifiant"
                                value={fields.login}
                                onChange={(e) => setFields({ ...fields, login: e.target.value })}
                            />
                        </InputGroup>
                    </Col>

                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Mot de passe</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-key"></i></InputGroup.Text>
                            <Form.Control 
                                type="password" placeholder="Choisissez un mot de passe"
                                value={fields.password}
                                onChange={(e) => setFields({ ...fields, password: e.target.value })}
                            />
                        </InputGroup>
                    </Col>

             
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Adresse</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-map-marker"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" placeholder="Entrez votre adresse"
                                value={fields.address}
                                onChange={(e) => setFields({ ...fields, address: e.target.value })}
                            />
                        </InputGroup>
                    </Col>

             
                    <Col xs={{ offset: 1, span: 10 }} md={{ offset: 2, span: 8 }}>
                        <output>Téléphone</output>
                        <InputGroup className="mb-3">
                            <InputGroup.Text><i className="fa fa-phone"></i></InputGroup.Text>
                            <Form.Control 
                                type="text" placeholder="Entrez votre numéro de téléphone"
                                value={fields.phoneNumber}
                                onChange={(e) => setFields({ ...fields, phoneNumber: e.target.value })}
                            />
                        </InputGroup>
                    </Col>
                </Row>

            
                {errorMessage && <p className="text-danger text-center">{errorMessage}</p>}
                {successMessage && <p className="text-success text-center">{successMessage}</p>}

        
                <Row className="pb-4">
                    <Col xs={{ offset: 2, span: 8 }} md={{ offset: 3, span: 6 }} xl={{ offset: 2, span: 4 }}>
                        <Nav.Link 
                            className="btn bg-black w-100 text-white p-2"
                            onClick={handleRegister}
                        >
                            S'inscrire
                        </Nav.Link>
                    </Col>
                    <Col xs={{ offset: 2, span: 8 }} md={{ offset: 3, span: 6 }} xl={{ offset: 0, span: 4 }}>
                        <Nav.Link 
                            as={Link} to="/connection" 
                            className="btn bg-black w-100 text-white p-2"
                        >
                            Déjà un compte ? Connectez-vous
                        </Nav.Link>
                    </Col>
                </Row>
            </Card>
        </Row>
    );
}
