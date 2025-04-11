import React, { useState, useEffect, useContext } from "react";

import { myContext } from "../../index";
import { getBackUrl } from "./backUrl";
import GestionRdvView from '../view/GestionRdvView'

export default function GestionRdvController(){

    const backUrl = `${getBackUrl}/rdv`;
    const [rdvList, setRdvList] = useState([]);

    function fetchRDV(){
        const requestOptions = {
            method: "GET",
            headers: {
                "Contente-Type": "application/json"
            }
        }
        fetch(`${backUrl}/en/attente`, requestOptions)
            .then(response => response.json())
            .then(json => setRdvList(json));
    }

    function confirmRdv(rdvId){
        const accept = {
            id: id,
            status_id : statusId
        };
        fetch(`${backUrl}/${rdvId.id}/confirm`, {
            method: "UPDATE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`,
            
            },
            body: JSON.stringify(accept)
        })
        .then(response => {
            if(!response.ok){
                throw new Error("Erreur lors du changement de status du rdv")
            }
            return response.json();
        })
        .then(() => {
            alert("Le Rendez-vous à été accepté !!!")
        })
        .catch(error => LuAlignEndHorizontal("Une erreur est survenue : " + error.message));
    }

    return(
        <GestionRdvView 
        fetchRDV = {() => fetchRDV()}
        confirmRdv = {() => confirmRdv()}
        rdvList = {rdvList}/>
    )

}