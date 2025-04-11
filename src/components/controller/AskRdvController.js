import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom"; 
import { myContext } from "../../index";
import { getBackUrl } from "./backUrl";
import AskRdvView from "../view/AskRdvView";

export default function AskForRdvController() {
    const { dressId } = useParams();
    const [user] = useContext(myContext);
    const [date, setDate] = useState("");
    const [commentaire, setCommentaire] = useState("");
    const backUrl = `${getBackUrl()}/rdv`;
    const navigate = useNavigate(); 

    
    if (!user) {
        navigate("/connection"); 
        return null; 
    }

 
    const askForRdv = (date_du_rendez_vous, commentaire, dressId) => {
        const demande = {
            date_du_rendez_vous: date_du_rendez_vous,
            commentaire: commentaire,
            dressId: dressId,
            userId: user.id
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(demande)
        };

        fetch(`${backUrl}/add`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la demande de rendez-vous");
                }
                return response.json();
            })
            .then(() => {
                alert("Rendez-vous demandé avec succès!");
            })
            .catch(error => {
                alert("Une erreur est survenue : " + error.message);
            });
    };

    return (
        <AskRdvView
            askRdv={askForRdv}
            dressId={dressId}
            userId={user.id}
        />
    );
}
