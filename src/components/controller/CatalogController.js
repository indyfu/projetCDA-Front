import React, { useState, useEffect, useContext } from "react";
import { myContext } from "../../index";
import { getBackUrl } from "./backUrl";
import CatalogView from '../view/CatalogView'
import { useNavigate } from "react-router-dom";

export default function CatalogController(){

    const [dresses, setDresses] = useState([]);
    const [user] = useContext(myContext);
    const navigate = useNavigate();
    const backUrl = `${getBackUrl()}/catalog`;

    useEffect(() => {console.log("useEffect fetchCatalog"); fetchCatalog()}, []);

    function fetchCatalog() {
        const requestOptions = {
            method: "GET",
            headers: { 
                "Content-Type": "application/json", 
            }
        }
        fetch(`${backUrl}/dresses`, requestOptions)
            .then(response => response.json())
            .then(json => setDresses(json));
    }
        // Fonction pour gérer la redirection vers la page de RDV
        function redirectToRdvPage(dressId) {
            if (!user) {
                alert("Vous devez être connecté pour demander un RDV.");
                navigate("/connection");  // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
            } else {
                navigate(`/askRDV/${dressId}`); // Rediriger vers la page de RDV avec l'ID de la robe
            }
        }

   
return(
    <CatalogView 
    askForRdv={redirectToRdvPage}
    dresses={dresses} />

);


}