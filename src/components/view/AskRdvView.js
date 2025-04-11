import React, { useState, useEffect, useContext } from "react";
import { Button, Image, Col, Row, Form, InputGroup, Alert } from "react-bootstrap";
import { getBackUrl } from "../controller/backUrl";
import { myContext } from "../../index";


export default function AskRdvView({ askRdv, dressId, userId }) {
    const backUrl = `${getBackUrl()}/dress`;
    const backUrl2 = `${getBackUrl()}/rdv`;
    const [fields, setFields] = useState({ dateDuRdv: "", commentaires: "" });
    const [dress, setDress] = useState(null); 
    const [occupiedHours, setOccupiedHours] = useState([]);
    const [user] = useContext(myContext);

  
    useEffect(() => {
        fetch(`${backUrl}/find/${dressId}/dress`)
            .then((response) => response.json())
            .then((data) => setDress(data));
    }, [dressId]);

    useEffect(() => {
        if (fields.dateDuRdv) {
            const date = new Date(fields.dateDuRdv);
            const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    
            fetch(`${backUrl2}/occupied?date=${formattedDate}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${user.token}`, // Ajouter le token ici
                }
            })
            .then(response => response.json())
            .then(data => {
                // Ajouter un décalage manuel de +2 heures aux heures récupérées
                const adjustedOccupiedHours = data.map(item => {
                    const utcHour = new Date(item);
                    // Ajouter 2 heures manuellement
                    utcHour.setHours(utcHour.getHours() + 4);
                    return utcHour.toISOString().split('T')[1].slice(0, 5); // Extraire l'heure sous format HH:mm
                });
                setOccupiedHours(adjustedOccupiedHours);
            })
            .catch(error => console.error("Error fetching occupied hours:", error));
        }
    }, [fields.dateDuRdv]);

    const generateHourOptions = () => {
        let options = [];
        for (let hour = 9; hour <= 17; hour += 2) {
           
            let formattedHour = `${hour.toString().padStart(2, '0')}:00`;

            
            if (!occupiedHours.includes(formattedHour)) {
                options.push(formattedHour);
            }
        }
        return options;
    };

     const handleSubmit = (e) => {
        e.preventDefault();
        if (fields.dateDuRdv && fields.heureRdv && fields.commentaires) {
            // Combine la date et l'heure sélectionnée pour former un datetime complet
            // Ici, on va s'assurer de la conversion en UTC avec toISOString()
            const dateTime = new Date(`${fields.dateDuRdv}T${fields.heureRdv}:00`).toISOString();
            askRdv(dateTime, fields.commentaires, dressId);
        } else {
            alert("Veuillez remplir tous les champs.");
        }
    };

    if (!userId) {
        return (
            <Alert variant="danger">
                Vous devez être connecté pour demander un rendez-vous.
            </Alert>
        );
    }

    return (
        <div>
            <hr />
            <h2 className="fs-4 fst-italic">Votre futur Rendez-vous</h2>
            <hr />
            <Row className="align-items-end">
                <Col xs={12} md={6} xl={4}>
                    <label htmlFor="dressName">Votre Robe</label>
                    {dress && (
                        <div>
                            <Image src={`/${dress.imageAlt2}`} alt={dress.name} fluid />
                            <p>{dress.name}</p>
                            <p>{dress.prix} €</p>
                        </div>
                    )}
                </Col>
                <Col xs={12} md={6} xl={8}>
                <div>
                        <label htmlFor="dateRdv">Date de votre Rendez-vous</label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fa-solid fa-calendar-days"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="date"
                                value={fields.dateDuRdv}
                                onChange={(e) =>
                                    setFields({ ...fields, dateDuRdv: e.target.value })
                                }
                            />
                        </InputGroup>
                    </div>
                    <div>
                        <label htmlFor="heureRdv">Heure de votre Rendez-vous</label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fa-solid fa-clock"></i>
                            </InputGroup.Text>
                            <Form.Control
                                as="select"
                                value={fields.heureRdv}
                                onChange={(e) =>
                                    setFields({ ...fields, heureRdv: e.target.value })
                                }
                            >
                                <option value="">Sélectionnez une heure</option>
                                {generateHourOptions().map((hour, index) => (
                                    <option key={index} value={hour}>
                                        {hour}
                                    </option>
                                ))}
                            </Form.Control>
                        </InputGroup>
                    </div>
                    <div>
                        <label htmlFor="commentaires">Commentaire</label>
                        <InputGroup>
                            <InputGroup.Text>
                                <i className="fa-solid fa-pencil"></i>
                            </InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Veuillez nous faire part de vos attentes et de vos besoins pour l'élaboration de votre robe"
                                value={fields.commentaires}
                                onChange={(e) =>
                                    setFields({ ...fields, commentaires: e.target.value })
                                }
                            />
                        </InputGroup>
                    </div>
                    <Row className="align-items-end">
                        <Col xs={4} xl={2}>
                            <Button variant="danger" onClick={() => window.history.back()}>
                                Annuler
                            </Button>
                        </Col>
                        <Col xs={4} xl={2}>
                            <Button variant="primary" onClick={handleSubmit}>
                                Demander le RDV
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
}
